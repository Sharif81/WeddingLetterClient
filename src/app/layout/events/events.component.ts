import { CommonModule, CurrencyPipe, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../services/packages.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Swal from 'sweetalert2';
import { error } from 'console';
import { response } from 'express';
import { forkJoin } from 'rxjs';
import { Program } from '../../program';
import { VenueService } from '../../services/venue.service';



@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgForOf],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  public event: any = {};
  public program: any = {};
  public eventsProgramForms: FormGroup;
  public packages: any[]; // Assuming your package structure contains name, price, and description
  public selectedPackage: any; // Initialize with default values
  public venues: any[];

  constructor(
    private packageService: PackagesService,
    private eventsService: EventsService,
    private venueService: VenueService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit() {
    this.eventsProgramForms = this.formBuilder.group({
      date: ['', Validators.required],
      clientName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      eventName: ['', Validators.required],
      price: ['', Validators.required],
      totalEvent: ['', Validators.required],
      amount: ['', Validators.required],
      discount: ['', Validators.required],
      payableAmount: ['', Validators.required],
      eventDescription: ['', Validators.required],
      programs: this.formBuilder.array([])
    });

    console.log(this.eventsProgramForms);

    this.eventsProgramForms.get('price')?.valueChanges.subscribe(() => this.calculateAmount());
    this.eventsProgramForms.get('totalEvent')?.valueChanges.subscribe(() => this.calculateAmount());
    this.eventsProgramForms.get('amount')?.valueChanges.subscribe(() => this.calculatePayableAmount());
    this.eventsProgramForms.get('discount')?.valueChanges.subscribe(() => this.calculatePayableAmount());

    this.getEventsNameByPackages();
    this.getHallNameByVenue();

  }

  get programsArray(): FormArray {
    return this.eventsProgramForms.get('programs') as FormArray;
  }


  areProgramsValid(): boolean {
    return this.programsArray.controls.every(program => {
      const { date, programName, venue } = program.value;
      return date === '' || programName === '' || venue === 'na';
    })
  }

  addProgram() {
    // const programsArray = this.eventsProgramForms.get('programs') as FormArray;
    this.programsArray.push(this.createProgramFormGroup());
  }

  createProgramFormGroup() {
    return this.formBuilder.group({
      date: ['', Validators.required],
      programName: ['', Validators.required],
      vanue: ['', Validators.required]
    });
  }

  removeProgram(index: number) {
    //const programsArray = this.eventsProgramForms.get('programs') as FormArray;
    this.programsArray.removeAt(index);
  }


  onSubmit() {
    if (this.eventsProgramForms.valid) {
      const formData = this.eventsProgramForms.getRawValue();
      console.log('Form Data:', formData);
  
      // Submit the form data to the API
      this.eventsService.addEventAsync(formData).subscribe(eventResponse => {
        console.log('Event added successfully:', eventResponse);
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Event and programs added successfully'
        });
        const programs: Program[] = formData.programs;
        const programObservables = programs.map(program => {
          return this.eventsService.addEventAsync({
            eventId: eventResponse.id,
            date: program.date,
            program: program.programName,
            venue: program.venue
          });
        });
  
        // Wait for all program creation requests to complete
        forkJoin(programObservables).subscribe(programResponses => {
          console.log('Programs added successfully:', programResponses);
          // Optionally reset the form after successful submission
          this.eventsProgramForms.reset();              
          
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Event and programs added successfully'
          });
        }, error => {
          console.error('Error adding programs:', error);
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Error adding programs'
          // });
        });
  
      }, error => {
        console.error('Error adding event:', error);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Error adding event'
        // });
      });
  
    } else {
      // Mark all fields as touched to display validation errors
      this.eventsProgramForms.markAllAsTouched();
    }
  }
  

  calculateAmount() {
    const price = this.eventsProgramForms.get('price')?.value;
    const totalEvent = this.eventsProgramForms.get('totalEvent')?.value;
    if (price && totalEvent) {
      const amount = price * totalEvent;
      this.eventsProgramForms.get('amount')?.setValue(amount);
    } else {
      this.eventsProgramForms.get('amount')?.setValue(null);
    }
  }


  calculatePayableAmount() {
    const amount = this.eventsProgramForms.get('amount')?.value;
    const discount = this.eventsProgramForms.get('discount')?.value;

    if (amount && discount) {
      const payableAmount = amount - (amount * (discount / 100));
      this.eventsProgramForms.get('payableAmount')?.setValue(payableAmount);
    } else {
      this.eventsProgramForms.get('payableAmount')?.setValue(null);
    }
  }


  onPackageSelect(event: Event): void {
    const selectedPackageName = (event.target as HTMLSelectElement).value;
    const selectedPackage = this.packages.find(pkg => pkg.name === selectedPackageName);
    if (selectedPackage) {
      this.eventsProgramForms.patchValue({
        price: selectedPackage.price,
        eventDescription: selectedPackage.description
      });

    } else {
      this.eventsProgramForms.patchValue({
        price: null,
        eventDescription: null
      })
    }
  }


  getEventsNameByPackages(): void {
    this.packageService.getPackages().subscribe(result => {
      this.packages = result;
      console.log(this.packages);
    });
  }


  getHallNameByVenue(): void{
    this.venueService.getVeuesAsync().subscribe(result => {
      this.venues = result;
      console.log(this.venues);
    });
  }




}


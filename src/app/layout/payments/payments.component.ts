import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentsService } from '../../services/payments.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, NgFor, NgForOf, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit{

  public events: any[];
  public paymentsForms: FormGroup;
  public payments: any [];

  constructor(private eventsServices: EventsService, private paymentsServices: PaymentsService, private formBuilder: FormBuilder) {


  }

  ngOnInit(): void {
    this.paymentsForms = this.formBuilder.group({
      date: ['', Validators.required],
      invoiceId: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paidAmount: ['', Validators.required],
      paidBy:['', Validators.required],
      due: ['', Validators.required],
      eventId: ['', Validators.required]
    });
    console.log(this.paymentsForms);

    this.paymentsForms.get('totalAmount')?.valueChanges.subscribe(()=> this.calculateDueAmount());
    this.paymentsForms.get('paidAmount')?.valueChanges.subscribe(()=> this.calculateDueAmount());

    this.getClientNameByEvents();
    this.getPayments();
    
  }


  calculateDueAmount(){
    const totalAmount = this.paymentsForms.get('totalAmount')?.value;
    const paidAmount = this.paymentsForms.get('paidAmount')?.value;
    if(totalAmount && paidAmount){
      const dueAmount = totalAmount - paidAmount;
      this.paymentsForms.get('due')?.setValue(dueAmount);
    }else {
      this.paymentsForms.get('due')?.setValue(null);
    }
  }

  onClientSelect(event: any): void {
    const selectClientName = (event.target as HTMLSelectElement).value;
    const selectedEvents = this.events.find(evts => evts.clientName === selectClientName)

    if (selectedEvents) {
      this.paymentsForms.get('eventId')?.setValue(selectedEvents.eventId);
      this.paymentsForms.patchValue({
        totalAmount: selectedEvents.payableAmount
      });
    }
    else {
      this.paymentsForms.get('eventId')?.setValue(null);
      this.paymentsForms.patchValue({
        totalAmount: null,
      });
    }

  }



  getClientNameByEvents(): void{
    this.eventsServices.getAllEventsWithProgramsAsync().subscribe(result => {
      this.events = result;
      console.log(this.events);
    })
  }



  public addPayments() {
    this.paymentsServices.addPaymentAsync(this.paymentsForms.value).subscribe(
      (result: any) => {
        console.log('Payment Added Successfully:', result);
        if (!result.Id) {
          // Success scenario
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Payment Added Successfully!'
          }).then(() => {
            // Reset the form after successful addition
            this.paymentsForms.reset();
            this.getPayments();
          });
        } else {
          // If success is false or undefined in the response
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding the payment!'
          });
        }
      },
      error => {
        console.error('Error occurred while adding payment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the payment!'
        });
      }
    );
  }


  getPayments(): void {
    this.paymentsServices.getPaymentsAsync().subscribe(result => {
      this.payments = result;
      console.log(this.payments);
    });
  }


}

import { CommonModule, NgForOf  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Venue } from '../../venue';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgForOf],
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.scss'
})
export class VenueComponent implements OnInit {

  public venueForm: FormGroup;
  public updatedVenueForm: FormGroup;
  venues: Venue[] = [];
  public selectedVenueId: number;

  constructor(
    private vanueService: VenueService, 
    private formBuilder: FormBuilder, ) {
    this.venueForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.updatedVenueForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getVenues();
  }


  public AddVenue() {
    this.vanueService.addVenueAsync(this.venueForm.value).subscribe(
      (result: any) => {
        console.log('New Venue Added Successfully:', result);
        if (!result.Id) {
          // Success scenario
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'New Venue Added Successfully!'
          }).then(() => {
            // Reset the form after successful addition
            this.venueForm.reset();
            this.getVenues();
          });
        } else {
          // If success is false or undefined in the response
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding the venue!'
          });
        }
      },
      error => {
        console.error('Error occurred while adding venue:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the venue!'
        });
      }
    );
  }



 

  public onVenueDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vanueService.deleteVenueAsync(id).subscribe({
          next: () => {
            this.getVenues();
            Swal.fire('Opps!', 'Data deleted successfully!', 'success');
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled',
          'Your record is safe',
          'info');
      }
    });
  }



  getVenues(): void {
    this.vanueService.getVeuesAsync().subscribe(result => {
      this.venues = result;
      console.log(this.venues);
    });
  }
}

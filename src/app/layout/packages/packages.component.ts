import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import Swal from 'sweetalert2';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf, CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit {

  public packagesForm: FormGroup;
  public packages: any;
  public packagesId: number;

  constructor(private packageService: PackagesService, private formBuilder: FormBuilder) {
    this.packagesForm = this.formBuilder.group({
      // Define your form controls here
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
    console.log(this.packagesForm);

  }

  ngOnInit(): void {
    this.getPackages();
    //  this.init();
  }

  public savePackages() {
    this.packageService.addPackages(this.packagesForm.value).subscribe(
      (result: any) => {
        console.log('New Package Added Successfully:', result);
        if (!result.Id) {
          // Success scenario
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'New Package Added Successfully!'
          }).then(() => {
            // Reset the form after successful addition
            this.packagesForm.reset();
            this.getPackages();
          });
        } else {
          // If success is false or undefined in the response
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding the package!'
          });
        }
      },
      error => {
        console.error('Error occurred while adding package:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the package!'
        });
      }
    );
  }


  private getPackages(): void {
    this.packageService.getPackages().subscribe(result => {
      this.packages = result;
      console.log(this.packages);
    });
  }



  public onPackageDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageService.deletePackage(id).subscribe({
          next: () => {
            this.getPackages();
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




}


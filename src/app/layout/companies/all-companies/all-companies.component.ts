import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-all-companies',
  standalone: true,
  imports: [NgForOf, ReactiveFormsModule],
  templateUrl: './all-companies.component.html',
  styleUrl: './all-companies.component.scss'
})
export class AllCompaniesComponent implements OnInit {

  public bookForm: FormGroup;
  public companies: any;
  public companyId: number;
  public items: any[] = [];

  constructor(private service: CompanyService, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      // Define your form controls here
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      // Add more form controls as needed
    });
    console.log(this.bookForm);

  }

  ngOnInit(): void {
    this.getCompanies();
    this.init();
  }

  public saveCompany() {
    this.service.addCompany(this.bookForm.value).subscribe(
      (result: any) => {
        console.log('New Company Added Successfully:', result);
        if (!result.Id) {
          // Success scenario
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'New Company Added Successfully!'
          }).then(() => {
            // Reset the form after successful addition
            this.bookForm.reset();
            this.getCompanies();
          });
        } else {
          // If success is false or undefined in the response
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while adding the company!'
          });
        }
      },
      error => {
        console.error('Error occurred while adding company:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding the company!'
        });
      }
    );
  }


  private getCompanies(): void {
    this.service.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies);
    });
  }



  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteItem(id).subscribe({
          next: () => {
            this.getCompanies();
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



  private init(): void {
    this.bookForm = this.formBuilder.group({
      name: [],
      email: [],
      mobile: [],
      address: []

    });
    // console.log(this.bookForm);
  }




}

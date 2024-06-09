import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth-service.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        // Navigate to the dashboard upon successful login
        this.router.navigate(['/companies']);
      },
      (error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Invalid username or password"
        });
      }
    );
  }
}



// export class LoginComponent implements OnInit {

//   public loginForm: FormGroup;
//   constructor(private service: LoginService, private formBuilder: FormBuilder, private router: Router) {
//     this.loginForm = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//     console.log(this.loginForm);
//   }

//   ngOnInit(): void {
//     this.init();
//   }


//   public userLogin() {
//     this.service.login(this.loginForm.value).subscribe((result: any) => {
//       if (!result.Id) {
//         this.router.navigate(['/companies']);
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 2500,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           }
//         });
//         Toast.fire({
//           icon: "success",
//           title: "Login successful"
//         });
//       } else {
//         const Toast = Swal.mixin({
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 2500,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           }
//         });
//         Toast.fire({
//           icon: "error",
//           title: "Login failed"
//         });
//       }
//     },
//       (error) => {
//         if (this.loginForm.value.email === null && this.loginForm.value.password === null) {
//           const Toast = Swal.mixin({
//             toast: true,
//             position: "top-end",
//             showConfirmButton: false,
//             timer: 2500,
//             timerProgressBar: true,
//             didOpen: (toast) => {
//               toast.onmouseenter = Swal.stopTimer;
//               toast.onmouseleave = Swal.resumeTimer;
//             }
//           });
//           Toast.fire({
//             icon: "error",
//             title: "Username and password cannot be empty"
//           });
//         } else {
//           const Toast = Swal.mixin({
//             toast: true,
//             position: "top-end",
//             showConfirmButton: false,
//             timer: 2500,
//             timerProgressBar: true,
//             didOpen: (toast) => {
//               toast.onmouseenter = Swal.stopTimer;
//               toast.onmouseleave = Swal.resumeTimer;
//             }
//           });
//           Toast.fire({
//             icon: "error",
//             title: "Server error"
//           });
//         }

//       });
//   }


//   private init(): void {
//     this.loginForm = this.formBuilder.group({
//       email: [],
//       password: []
//     });
//   }

// }


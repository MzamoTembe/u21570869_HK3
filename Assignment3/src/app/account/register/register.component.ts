import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    emailaddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService, private router: Router, private toaster: ToastrService) { }

  onSubmit(){
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/products/products');
        this.toaster.success('Registered succesfully');
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

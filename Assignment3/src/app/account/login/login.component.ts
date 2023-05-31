import { Component, Self } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    emailaddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute, private toaster: ToastrService) {}

  onSubmit(){
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/products/products');
        this.toaster.success('Welcome back!');
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
}

import { Component } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assignment3';
  constructor(private accountService: AccountService){}

  ngOnInit(): void {
    // this.loadUser();
  }

  // loadUser(){
  //   const token = localStorage.getItem('token');
  //   this.accountService.loadCurrentUser(token).subscribe();
  //   console.log(this.accountService.currentUser$);
  // }
}

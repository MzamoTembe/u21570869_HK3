import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public accountService: AccountService) { }

  logout(){
    this.accountService.logout();
  }
}

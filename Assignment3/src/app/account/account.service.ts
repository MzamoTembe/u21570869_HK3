import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map, of } from 'rxjs';
import { User } from '../shared/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5240/'
  private currentUserSource = new ReplaySubject<User | null>(1); 
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(values: any){
    return this.http.post<User>(this.baseUrl + 'login?emailaddress=' + values.emailaddress + '&password=' + values.password, values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register(values: any){
    return this.http.post<User>(this.baseUrl + 'register?emailaddress=' + values.emailaddress + '&password=' + values.password, values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaers(){
      this.loadToken();
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type' : 'application/json',
          'authorization' : this.authToken
        })
    })
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
    console.log(this.authToken);
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + '/authentication/checkUsername' + username).map(res => res.json());
  }

  CheckEmail(email) {
    return this.http.get(this.domain + '/authentication/checkEmail' + email).map(res => res.json());
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user).map(res =>res.json());
  }
  
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  bookHotel(book){ 
    this.createAuthenticationHeaers();
    return this.http.post(this.domain + '/booking/book',book, this.options).map(res => res.json());
  }

  getProfile(){
    this.createAuthenticationHeaers();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

};

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  newUser: User = {
    name:'',
    email:'',
    mobileno:'',
    password:'',
    dob:'',
    gender:''
  }
  
  constructor(private http : HttpClient) { }
  postUser(user: User){
    return this.http.post('http://localhost:3000/api/register',user);
  }
  login(authCredentials){
    return this.http.post('http://localhost:3000/api/authenticate',authCredentials);
  }
  public getBus(data:any){
    return this.http.post('http://localhost:3000/api/getBuses',data);
  }
  updateDetails(data:any){
    return this.http.patch('http://localhost:3000/api/updateDetails',data);
  }
  setToken(token: string){
    localStorage.setItem('token',token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token=localStorage.getItem('token');
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}


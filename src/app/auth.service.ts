import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  islogged(){
    // to get boolean value we use !!
    return !!localStorage.getItem("name")
  }
}

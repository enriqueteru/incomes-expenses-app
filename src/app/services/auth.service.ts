import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  newUser(name: string, email: string, password: string){
    console.log(name, email, password);

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }
  readonly rootUrl = 'http://localhost:61085';
  registerUser(user: User, roles) {
    const body = {
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      Roles: roles
    };
       const reqHeader = new HttpHeaders({'No-auth': 'True'});
      return this.http.post(this.rootUrl + '/api/User/Register/', body, {headers: reqHeader});
  }
  userAuthentication(username: string, password: string) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });

}
Logout() {

   localStorage.clear();
   localStorage.setItem('cart', null);
   localStorage.removeItem('cart');
   localStorage.removeItem('userName');
  this.router.navigate(['/login']);
}
TakeUsernameIfExist(username): Promise<boolean> {
  return this.http.get<boolean>(this.rootUrl + '/api/TakeUserName/' + username ).toPromise();
}

getAllRoles() {
  const reqHeader = new HttpHeaders({'No-Auth': 'True'});
  return this.http.get(this.rootUrl + '/api/GetAllRoles', {headers: reqHeader});
}

roleMatch(allowedRoles): boolean {
  let isMatch = false;
  let userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
  allowedRoles.forEach(element => {
    if (userRoles != null && userRoles.indexOf(element) > -1) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;

}
  getUserProfile() {
    return this.http.get(this.rootUrl + '/api/GetUserProfile',
    {headers: new HttpHeaders({'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))})});
  }
  updateProfile(userData, image) {
    const profile = {
      Username: userData.username,
      Email: userData.email,
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Address: userData.address,
      Telephone: userData.telephone,
      Image: image
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/ChangeProfile', profile, {headers: reqHeader});
  }

}

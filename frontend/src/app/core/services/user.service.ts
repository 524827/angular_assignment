import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/user/list`);
  }

  createNewUser(user: UserModel): Observable<any> {
    return this.http.post(`${environment.baseUrl}/user/create`, user);
  }

  editUserDetails(user: UserModel, id: string | undefined): Observable<any> {
    const payload = { ...user, id };
    return this.http.put(`${environment.baseUrl}/user`, payload);
  }

  deleteUser(id: string | undefined): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/user/${id}`);
  }
}

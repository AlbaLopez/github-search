import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

class User {
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public searchUsers(query): Observable<User> {
    return this.http.get(`${environment.searchApi}users?q=${query}`)
  }
}

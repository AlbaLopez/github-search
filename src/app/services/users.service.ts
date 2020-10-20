import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

class UserResponse {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}

class User {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: 1
  site_admin: false
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[];
  
  constructor(private http: HttpClient) { }

  public searchUsers(query): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.searchApi}users?q=${query}`)
  }
}

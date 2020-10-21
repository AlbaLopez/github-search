import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {from, Observable} from "rxjs";
import {map, mergeMap, toArray} from "rxjs/operators";

export class UserResponse {
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
  profile?: Profile;
  received_events_url: string;
  repos_url: string;
  score: 1
  site_admin: false
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export class Profile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: User[] = [];
  public totalResults: number;

  constructor(private http: HttpClient) {
  }

  public searchUsers(query, page = 0): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.searchApi}users?q=${query}&page=${page + 1}&per_page=10`).pipe(
      mergeMap((result: any) =>
        // from emits each user separately
        from(result.items).pipe(
          // load each user
          mergeMap(
            (user: User) =>
              this.getProfile(user.url).pipe(
                map(profile => {
                    return Object.assign({}, user, {profile})
                  }
                )),
          ),
          toArray(),
          // add the newly fetched data to original items
          map(items => ({...result, items})),
        ),
      ),
    )
  }

  public getBiography(url): Observable<string> {
    return this.http.get<Profile>(url).pipe(map((response: Profile) => response.bio));
  }

  public getProfile(url): Observable<Profile> {
    return this.http.get<Profile>(url);
  }
}

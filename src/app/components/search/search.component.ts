import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {UIComponent} from "../../classes/uiComponent";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UIComponent {

  public query;
  public errorMessage;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    super();
  }

  public search(): void {
    this.setUILoading();
    this.usersService.searchUsers(this.query).subscribe((results: any) => {
      if (results.items.length === 0) {
        this.setUIBlank();
      } else {
        this.usersService.totalResults = results.total_count;
        this.usersService.users = results.items;
        this.router.navigate(['/results'], {queryParams: {query: this.query}});
      }
    }, ((error) => {
      this.errorMessage = error.statusText;
      this.setUIError();
    }))
  }

}

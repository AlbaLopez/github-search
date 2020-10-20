import {Component} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {UIComponent} from "../../classes/uiComponent";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UIComponent {

  public query;
  constructor(
    private usersService: UsersService
  ) {
    super();
  }

  public search(): void {
    this.setUILoading();
    this.usersService.searchUsers(this.query).subscribe((results: any) => {
      if (results.items.length === 0) {
        this.setUIBlank();
      } else {
        // navigate to search results.
      }
    }, (() => {
      this.setUIError();
    }))
  }

}

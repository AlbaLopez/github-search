import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, map, switchMap} from "rxjs/operators";
import {UIComponent} from "../../classes/uiComponent";
import {MatPaginator} from "@angular/material/paginator";
import {of} from "rxjs";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent extends UIComponent implements AfterViewInit {

  public displayedColumns: string[] =
    ['avatar_url', 'login', 'name', 'location', 'company', 'biography', 'followers', 'score'];
  public rateLimitReached = false;
  public rating = Array(5);

  private query;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query && this.usersService.users.length === 0) {
        this.usersService.searchUsers(this.query).subscribe((results) => {
          this.usersService.totalResults = results.total_count;
          this.usersService.users = results.items;
        }, (error) => {
          this.rateLimitReached = true;
        });
      }
    })
  }

  ngAfterViewInit(): void {
    this.paginator?.page.pipe(
      switchMap(() => {
        this.setUILoading();
        return this.usersService.searchUsers(
          this.query, this.paginator.pageIndex);
      }),
      map(results => {
        this.setUILoading();
        this.rateLimitReached = false;
        return results.items;
      }),
      catchError(() => {
        this.setUIError();
        this.rateLimitReached = true;
        return of([]);
      })).subscribe((users) => {
      this.setUIIdeal();
      this.usersService.users = users;
    });
  }

  openGitHubPage(url) {
    window.open(url, "_blank");
  }
}

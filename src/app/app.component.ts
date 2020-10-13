import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private titleHandler: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((routeEvent) => routeEvent instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((routeItem) => {
        while (routeItem.firstChild) {
          routeItem = routeItem.firstChild;
          return routeItem;
        }
      }))
      .pipe(switchMap((currentRoute) => currentRoute.data))
      .subscribe((dataPropertiesFromRoute) => {
        this.titleHandler.setTitle(dataPropertiesFromRoute.title)
        window.scrollTo(0, 0);
      });
  }  

}

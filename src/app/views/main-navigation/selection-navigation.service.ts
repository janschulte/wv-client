import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SelectionNavigationService {

  private lastSelection = '/selection-category';

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url.startsWith('/selection')) {
          this.lastSelection = e.url;
          console.log(this.lastSelection);
        }
      }
    });
  }

  openSelection() {
    if (this.selectionMode()) {
      // this.router.navigate(['/start']);
      this.router.navigate(['/diagram']);
    } else {
      this.router.navigate([this.lastSelection]);
    }
  }

  selectionMode(): boolean {
    return this.router.routerState.snapshot.url.startsWith('/selection');
  }

}

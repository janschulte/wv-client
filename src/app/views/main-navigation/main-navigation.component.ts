import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  openSelection() {
    this.router.navigate(['/selection-map']);
  }

  selectionMode(): boolean {
    return this.router.routerState.snapshot.url.startsWith('/selection');
  }

}

import { FavoriteService } from '@helgoland/favorite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  public count: number;

  constructor(
    private favoriteSrvc: FavoriteService
  ) { }

  ngOnInit() {
    this.favoriteSrvc.getFavoriteCountChanged().subscribe(c => this.count = c);
  }

}

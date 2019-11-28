import { JsonFavoriteExporterService } from '@helgoland/favorite';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-import-button',
  templateUrl: './favorite-import-button.component.html',
  styleUrls: ['./favorite-import-button.component.scss']
})
export class FavoriteImportButtonComponent {

  constructor(
    private importer: JsonFavoriteExporterService
  ) { }

  public importFavorites(event: Event) {
    this.importer.importFavorites(event).subscribe(() => {});
  }

}

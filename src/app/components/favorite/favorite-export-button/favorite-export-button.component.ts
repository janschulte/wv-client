import { Component } from '@angular/core';
import { JsonFavoriteExporterService } from '@helgoland/favorite';

@Component({
  selector: 'app-favorite-export-button',
  templateUrl: './favorite-export-button.component.html',
  styleUrls: ['./favorite-export-button.component.scss']
})
export class FavoriteExportButtonComponent {

  constructor(
    private exporter: JsonFavoriteExporterService
  ) { }

  public exportFavorites() {
    this.exporter.exportFavorites();
  }

}

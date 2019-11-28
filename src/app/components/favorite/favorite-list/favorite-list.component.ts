import { Component, OnInit } from '@angular/core';
import { Favorite, FavoriteService, GroupFavorite, SingleFavorite } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeseriesService } from '../../../services/timeseries/timeseries.service';
import { ModalEditFavoriteComponent } from './../modal-edit-favorite/modal-edit-favorite.component';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  public singles: SingleFavorite[];
  public groups: GroupFavorite[];

  constructor(
    private favoriteSrvc: FavoriteService,
    public timeseriesSrvc: TimeseriesService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.favoriteSrvc.getFavoriteCountChanged().subscribe(c => {
      this.singles = this.favoriteSrvc.getFavorites();
      this.groups = this.favoriteSrvc.getFavoriteGroups();
    });
  }

  public addSingleToChart(single: SingleFavorite) {
    this.timeseriesSrvc.addDataset(single.id);
  }

  public addGroupToChart(group: GroupFavorite) {
    group.favorites.forEach(e => this.timeseriesSrvc.addDataset(e.internalId));
  }

  public edit(favorite: Favorite) {
    const modalRef = this.modalService.open(ModalEditFavoriteComponent);
    (modalRef.componentInstance as ModalEditFavoriteComponent).label = favorite.label;
    modalRef.result.then((res: string) => this.favoriteSrvc.changeLabel(favorite, res));
  }

  public delete(favorite: Favorite) {
    this.favoriteSrvc.removeFavorite(favorite.id);
  }

}

import { Component, OnInit } from '@angular/core';
import { Time, Timespan } from '@helgoland/core';
import { Favorite, FavoriteService, GroupFavorite, SingleFavorite } from '@helgoland/favorite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

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
    private timeSrvc: Time,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.favoriteSrvc.getFavoriteCountChanged().subscribe(c => {
      this.singles = this.favoriteSrvc.getFavorites();
      this.groups = this.favoriteSrvc.getFavoriteGroups();
    });
  }

  public addSingleToChart(single: SingleFavorite) {
    if (!this.timeseriesSrvc.hasDatasets()) {
      const end = single.favorite.lastValue.timestamp;
      const diff = moment.duration(3, 'months').asMilliseconds();
      this.timeseriesSrvc.timespan = new Timespan(end - diff, end);
    }
    this.timeseriesSrvc.addDataset(single.id, single.options);
  }

  public addGroupToChart(group: GroupFavorite) {
    if (!this.timeseriesSrvc.hasDatasets()) {
      const end = Math.max(...group.favorites.map(e => e.dataset.lastValue.timestamp));
      const diff = moment.duration(3, 'months').asMilliseconds();
      this.timeseriesSrvc.timespan = new Timespan(end - diff, end);
    }
    group.favorites.forEach(e => this.timeseriesSrvc.addDataset(e.dataset.internalId, e.options));
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

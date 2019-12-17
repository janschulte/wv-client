import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { ToastService, ToastType } from './../toast/toast-container/toast-container.service';

@Component({
  selector: 'app-modal-share-permalink',
  templateUrl: './modal-share-permalink.component.html',
  styleUrls: ['./modal-share-permalink.component.scss']
})
export class ModalSharePermalinkComponent implements OnInit {

  @Input() link: string;

  @Input() multi = false;

  public header: string;

  public showQrCode: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private translate: TranslateService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.header = this.multi ? this.translate.instant('legend.share.headerAll') : this.translate.instant('legend.share.headerSingle');
  }

  public openInNewWindow() {
    window.open(this.link, '_blank');
    this.activeModal.close();
  }

  public openInMail() {
    window.location.href = 'mailto:?body=' + encodeURIComponent(this.link);
  }

  public copyToClipboard() {
    this.toast.show(this.translate.instant('legend.share.copyToClipboard'), { type: ToastType.Info });
    this.activeModal.close();
  }

}

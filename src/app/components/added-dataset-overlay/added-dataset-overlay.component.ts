import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class AddedDatasetPresentation {
  constructor(
    public added: boolean,
    public duration: number = 1000
  ) { }
}

@Component({
  selector: 'app-added-dataset-overlay',
  templateUrl: './added-dataset-overlay.component.html',
  styleUrls: ['./added-dataset-overlay.component.scss']
})
export class AddedDatasetOverlayComponent implements OnChanges {

  @Input() public presentation: AddedDatasetPresentation;

  public visible: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.presentation && this.presentation) {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;        
      }, this.presentation.duration);
    }
  }

}

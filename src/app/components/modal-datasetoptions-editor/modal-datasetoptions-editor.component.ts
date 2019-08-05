import { Component, Input } from '@angular/core';
import { DatasetOptions } from '@helgoland/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-datasetoptions-editor',
  templateUrl: './modal-datasetoptions-editor.component.html',
  styleUrls: ['./modal-datasetoptions-editor.component.scss']
})
export class ModalDatasetoptionsEditorComponent {

  @Input() public options: DatasetOptions;

  public colorList = [
    '#FF783D',
    '#AD3500',
    '#FFCB00',
    '#927711',
    '#53EA42',
    '#078D53',
    '#00F3FF',
    '#0043FF',
    '#E22985',
    '#8D00A9'
  ];

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  setSeperateAxis() {
    this.options.separateYAxis = !this.options.separateYAxis;
    this.activeModal.close();
  }

  setZeroScaled() {
    this.options.zeroBasedYAxis = !this.options.zeroBasedYAxis;
    this.activeModal.close();
  }

  setColor(color: string) {
    this.options.color = color;
    this.activeModal.close();
  }

}

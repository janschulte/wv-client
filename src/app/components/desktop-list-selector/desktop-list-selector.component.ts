import { Component, EventEmitter, Output } from '@angular/core';
import { ListSelectorComponent } from '@helgoland/selector';

@Component({
  selector: 'app-desktop-list-selector',
  templateUrl: './desktop-list-selector.component.html',
  styleUrls: ['./desktop-list-selector.component.scss']
})
export class DesktopListSelectorComponent extends ListSelectorComponent {

  @Output() toDiagram: EventEmitter<void> = new EventEmitter();

}

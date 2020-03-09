import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ListSelectorComponent, FilteredParameter, ListSelectorParameter } from '@helgoland/selector';

@Component({
  selector: 'app-mobile-list-selector',
  templateUrl: './mobile-list-selector.component.html',
  styleUrls: ['./mobile-list-selector.component.scss']
})
export class MobileListSelectorComponent extends ListSelectorComponent {

  @Output() toDiagram: EventEmitter<void> = new EventEmitter();

  @ViewChild('wrapperRef', { static: true }) wrapperRef;

  public toList(index: number) {
    this.activePanel = this.selectorId + '-' + index;
    this.wrapperRef.nativeElement.style.left = '-100%';
  }

  public toParameter() {
    this.wrapperRef.nativeElement.style.left = '0';
  }

  public itemSelected(item: FilteredParameter, index: number) {
    super.itemSelected(item, index);
    this.toParameter();
  }
}

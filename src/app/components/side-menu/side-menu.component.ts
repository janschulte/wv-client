import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Input() content: TemplateRef<any>;

  @Input() side: 'left' | 'right' = 'right';

  @Input() width = 500;

  @Input() isActive = false;

  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('buttonRef', { static: true }) buttonRef;

  @ViewChild('contentRef', { static: true }) contentRef;

  public classes: string[];
  public arrowClass: string;

  constructor() { }

  ngOnInit() {
    this.calculateCSS();
  }

  toggle() {
    this.isActive = !this.isActive;
    this.toggled.emit(this.isActive);
    this.calculateCSS();
  }

  private calculateCSS() {
    this.classes = [];
    this.classes.push(this.side);
    if (this.isActive) { this.classes.push('active'); }
    this.contentRef.nativeElement.style.width = `${this.width}px`;
    if (this.side === 'left') {
      this.arrowClass = this.isActive ? 'icon-arrow-left' : 'icon-arrow-right';
      this.buttonRef.nativeElement.style.left = `${this.isActive ? this.width : 0}px`;
    } else {
      this.arrowClass = this.isActive ? 'icon-arrow-right' : 'icon-arrow-left';
      this.buttonRef.nativeElement.style.right = `${this.isActive ? this.width : 0}px`;
    }
  }

}

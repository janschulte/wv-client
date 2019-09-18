import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToElement(elem): void {
    console.log(elem);
    elem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}

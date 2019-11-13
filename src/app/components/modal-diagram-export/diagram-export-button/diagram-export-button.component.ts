import { Component } from '@angular/core';
import { ExportImageButtonComponent } from '@helgoland/d3';

@Component({
  selector: 'app-diagram-export-button',
  templateUrl: './diagram-export-button.component.html',
  styleUrls: ['./diagram-export-button.component.scss']
})
export class DiagramExportButtonComponent extends ExportImageButtonComponent { }

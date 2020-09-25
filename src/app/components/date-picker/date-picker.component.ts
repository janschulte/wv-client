import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Timespan } from '@helgoland/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input()
  public timestamp: Timespan;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onDateSelected: EventEmitter<Timespan> = new EventEmitter();


  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor() { }

  ngOnInit() {
    if (this.timestamp) {
      const tsFrom: Date = new Date(this.timestamp.from);
      const tsTo: Date = new Date(this.timestamp.to);
      this.fromDate = new NgbDate(tsFrom.getFullYear(), tsFrom.getMonth() + 1, tsFrom.getDate());
      this.toDate = new NgbDate(tsTo.getFullYear(), tsTo.getMonth() + 1, tsTo.getDate());

      // this.dateTime = ts ? new NgbTime(ts.getHours(), ts.getMinutes(), ts.getSeconds()) : new NgbTime(0, 0, 0);
      // this.updateMinMaxDate();
    }
  }

  onDateSelection(value: NgbDate) {
    const date = new NgbDate(value.year, value.month, value.day);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && (date.after(this.fromDate) || date.equals(this.fromDate))) {
      this.toDate = date;
      this.timestamp = new Timespan(
        new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0 , 0, 0),
        new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59, 999)
        );
      this.onDateSelected.emit(this.timestamp);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}

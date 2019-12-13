import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from './ngb-custom-timepicker/ngb-custom-time';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {

  @Input()
  public timestamp: number;

  @Input()
  public seconds: boolean;

  @Input()
  public minDate: Date;

  @Input()
  public maxDate: Date;

  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onDateSelected: EventEmitter<Date> = new EventEmitter();

  public model1: NgbDate;
  public dateTime: NgbTime;
  public minDatePrep: NgbDate;
  public maxDatePrep: NgbDate;
  public minTimeSpinner: NgbTime;

  constructor() { }

  ngOnInit() {
    if (this.timestamp) {
      const ts: Date = new Date(this.timestamp);
      this.model1 = new NgbDate(ts.getFullYear(), ts.getMonth() + 1, ts.getDate());
      this.dateTime = ts ? new NgbTime(ts.getHours(), ts.getMinutes(), ts.getSeconds()) : new NgbTime(0, 0, 0);
      this.updateMinMaxDate();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.minDate) {
      this.updateMinMaxDate();
    }
    if (changes.maxDate) {
      this.updateMinMaxDate();
    }
  }

  public ngModelChangeDate(value: NgbDate) {
    this.updateDate();
    this.dateTime = new NgbTime(0, 0, 0);
    // check same day
    if (this.minDate && this.minDatePrep) {
      if (this.minDatePrep.equals(this.model1)) {
        const minDt = new Date(this.minDate);
        this.dateTime = new NgbTime(minDt.getHours(), minDt.getMinutes(), minDt.getSeconds());
      }
    }
    const ts = new Date(this.model1.year, this.model1.month - 1, this.model1.day,
      this.dateTime.hour, this.dateTime.minute, this.dateTime.second);
    this.updateMinMaxDate();
    this.onDateSelected.emit(ts);
  }

  public changeTime(value: NgbTime) {
    if (value === null) {
      this.dateTime = new NgbTime(0, 0, 0);
    }
    const ts = new Date(this.model1.year, this.model1.month - 1, this.model1.day,
      this.dateTime.hour, this.dateTime.minute, this.dateTime.second);
    this.onDateSelected.emit(ts);
  }

  public changeDay($event: number) {
    const newDay = new Date(this.model1.year, this.model1.month - 1, this.model1.day);
    newDay.setDate(newDay.getDate() + $event);
    this.model1 = new NgbDate(newDay.getFullYear() , newDay.getMonth() + 1, newDay.getDate());
  }

  private isBefore(dt1: NgbDateStruct, dt2: NgbDateStruct): boolean {
    if (dt1.year >= dt2.year && dt1.month >= dt2.month && dt1.day >= dt2.day) {
      return false;
    }
    return true;
  }

  private updateDate() {
    if (this.model1) {
      if (this.maxDate && !this.isBefore(this.model1, this.maxDatePrep)) {
        this.model1 = this.maxDatePrep;
      }
      if (this.minDate && this.isBefore(this.model1, this.minDatePrep)) {
        this.model1 = this.minDatePrep;
      }
    }
  }

  private updateMinMaxDate() {
    if (this.minDate) {
      const minDt = new Date(this.minDate);
      this.minDatePrep = new NgbDate(minDt.getFullYear(), minDt.getMonth() + 1, minDt.getDate());
    }
    if (this.maxDate) {
      this.maxDatePrep = new NgbDate(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1, this.maxDate.getDate());
    }
    this.updateDate();
  }
}

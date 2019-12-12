import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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

  public model1;
  public dateTime;
  public minDatePrep: NgbDateStruct;
  public maxDatePrep: NgbDateStruct;
  public minTimeSpinner: NgbTime;

  constructor() { }

  ngOnInit() {
    if (this.timestamp) {
      const ts: Date = new Date(this.timestamp);
      this.model1 = { year: ts.getFullYear(), month: ts.getMonth() + 1, day: ts.getDate() };
      this.dateTime = ts ? {
        hour: ts.getHours(),
        minute: ts.getMinutes(),
        second: ts.getSeconds()
      } : { hour: 0, minute: 0, second: 0 };
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

  public changeDate(value: NgbDateStruct) {
    this.updateDate();
    this.dateTime = { hour: 0, minute: 0, second: 0 };
    const ts = new Date(this.model1.year, this.model1.month - 1, this.model1.day,
      this.dateTime.hour, this.dateTime.minute, this.dateTime.second);
    // if (this.minDate) {
    //   console.log('minDate');
    //   const tsDate = { year: ts.getFullYear(), month: ts.getMonth() + 1, day: ts.getDate() };
    //   if (this.isEqual(tsDate, this.minDatePrep)) {
    //     const minDt = new Date(this.minDate);
    //     const minTime = new NgbTime(minDt.getHours(), minDt.getMinutes(), minDt.getSeconds());
    //     this.minTimeSpinner = minTime;
    //   } else {
    //     this.minTimeSpinner = null;
    //   }
    // }
    this.onDateSelected.emit(ts);
  }

  public changeTime(value: NgbTime) {
    if (value === null) {
      this.dateTime = { hour: 0, minute: 0, second: 0 };
    }
    const ts = new Date(this.model1.year, this.model1.month - 1, this.model1.day,
      this.dateTime.hour, this.dateTime.minute, this.dateTime.second);
    this.onDateSelected.emit(ts);
  }

  private isBefore(dt1: NgbDateStruct, dt2: NgbDateStruct): boolean {
    if (dt1.year >= dt2.year && dt1.month >= dt2.month && dt1.day >= dt2.day) {
      return false;
    }
    return true;
  }

  private isEqual(dt1: NgbDateStruct, dt2: NgbDateStruct): boolean {
    if (dt1.year === dt2.year && dt1.month === dt2.month && dt1.day === dt2.day) {
      return true;
    }
    return false;
  }

  // // ts2 should be of type NgbTime, but Class NgbTime does not have a constructor at the moment
  // private isEqualTime(ts1: NgbTime, ts2: any): boolean {
  //   if (ts1.hour !== ts2.hour || ts1.minute !== ts2.minute || ts1.second !== ts2.second) {
  //     return false;
  //   }
  //   return true;
  // }

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
      this.minDatePrep = { year: minDt.getFullYear(), month: minDt.getMonth() + 1, day: minDt.getDate() };
      // const ts: Date = new Date(this.timestamp);
      // const tsDate = { year: ts.getFullYear(), month: ts.getMonth() + 1, day: ts.getDate() };
      // if (this.isEqual(tsDate, this.minDatePrep)) {
      //   const minTime = new NgbTime(minDt.getHours(), minDt.getMinutes(), minDt.getSeconds());
      //   // { hour: minDt.getHours(), minute: minDt.getMinutes(), second: minDt.getSeconds() };
      //   this.minTimeSpinner = minTime;
      //   // if (this.dateTime) {
      //   //   if (!this.isEqualTime(this.dateTime, tsTime)) {
      //   //     this.dateTime = tsTime;
      //   //   }
      //   // }
      // } else {
      //   this.minTimeSpinner = null;
      // }
    }
    if (this.maxDate) {
      this.maxDatePrep = { year: this.maxDate.getFullYear(), month: this.maxDate.getMonth() + 1, day: this.maxDate.getDate() };
    }
    this.updateDate();
  }
}

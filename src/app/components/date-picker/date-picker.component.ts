import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Timespan } from '@helgoland/core';
import { NgbDate, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class DatePickerI18n extends NgbDatepickerI18n {

  constructor(
    private translate: TranslateService
  ) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    switch (weekday) {
      case 1: return this.translate.instant('date.weekday.short.mon');
      case 2: return this.translate.instant('date.weekday.short.tue');
      case 3: return this.translate.instant('date.weekday.short.wed');
      case 4: return this.translate.instant('date.weekday.short.thu');
      case 5: return this.translate.instant('date.weekday.short.fri');
      case 6: return this.translate.instant('date.weekday.short.sat');
      case 7: return this.translate.instant('date.weekday.short.sun');
    }
  }
  getMonthShortName(month: number, year?: number): string {
    switch (month) {
      case 1: return this.translate.instant('date.month.short.jan');
      case 2: return this.translate.instant('date.month.short.feb');
      case 3: return this.translate.instant('date.month.short.mar');
      case 4: return this.translate.instant('date.month.short.apr');
      case 5: return this.translate.instant('date.month.short.may');
      case 6: return this.translate.instant('date.month.short.jun');
      case 7: return this.translate.instant('date.month.short.jul');
      case 8: return this.translate.instant('date.month.short.aug');
      case 9: return this.translate.instant('date.month.short.sep');
      case 10: return this.translate.instant('date.month.short.oct');
      case 11: return this.translate.instant('date.month.short.nov');
      case 12: return this.translate.instant('date.month.short.dec');
    }
  }
  getMonthFullName(month: number, year?: number): string {
    switch (month) {
      case 1: return this.translate.instant('date.month.full.jan');
      case 2: return this.translate.instant('date.month.full.feb');
      case 3: return this.translate.instant('date.month.full.mar');
      case 4: return this.translate.instant('date.month.full.apr');
      case 5: return this.translate.instant('date.month.full.may');
      case 6: return this.translate.instant('date.month.full.jun');
      case 7: return this.translate.instant('date.month.full.jul');
      case 8: return this.translate.instant('date.month.full.aug');
      case 9: return this.translate.instant('date.month.full.sep');
      case 10: return this.translate.instant('date.month.full.oct');
      case 11: return this.translate.instant('date.month.full.nov');
      case 12: return this.translate.instant('date.month.full.dec');
    }
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NgbDatepickerI18n, useClass: DatePickerI18n }]
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
    }
  }

  onDateSelection(value: NgbDate) {
    const date = new NgbDate(value.year, value.month, value.day);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && (date.after(this.fromDate) || date.equals(this.fromDate))) {
      this.toDate = date;
      this.timestamp = new Timespan(
        new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 0, 0, 0),
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

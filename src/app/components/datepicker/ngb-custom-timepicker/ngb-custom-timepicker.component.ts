import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTime } from './ngb-custom-time';
import { isInteger, isNumber, toInteger, padNumber } from './ngb-custom-util-util';
import { NgbTimepickerConfig, NgbTimeAdapter, NgbTimepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';

// import { isInteger, isNumber, padNumber, toInteger } from '../util/util';
// import { NgbTime } from './ngb-time';
// import { NgbTimepickerConfig } from './timepicker-config';
// import { NgbTimeAdapter } from './ngb-time-adapter';
// import { NgbTimepickerI18n } from './timepicker-i18n';

const FILTER_REGEX = /[^0-9]/g;

const NGB_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbCustomTimepickerComponent),
  multi: true
};

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
@Component({
  selector: 'app-ngb-custom-timepicker',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./custom-timepicker.scss'],
  template: `
      <fieldset [disabled]="disabled" [class.disabled]="disabled">
        <div class="ngb-tp">
          <div class="ngb-tp-input-container ngb-tp-hour">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeHour(hourStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
              [disabled]="disabled">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize"
              [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
              [value]="formatHour(model?.hour)" (change)="updateHour($event.target.value)"
              [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeHour(-hourStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled || validation[0]"
              [disabled]="disabled || validation[0]">
              <span class="chevron ngb-tp-chevron bottom"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
            </button>
          </div>
          <div class="ngb-tp-spacer">:</div>
          <div class="ngb-tp-input-container ngb-tp-minute">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(minuteStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
              [disabled]="disabled">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
              [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target.value)"
              [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(-minuteStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
              [disabled]="disabled">
              <span class="chevron ngb-tp-chevron bottom"></span>
              <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
            </button>
          </div>
          <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
          <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(secondStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled"
              [disabled]="disabled">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
              [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target.value)"
              [readOnly]="readonlyInputs" [disabled]="disabled" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(-secondStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled"
              [disabled]="disabled">
              <span class="chevron ngb-tp-chevron bottom"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
            </button>
          </div>
          <div *ngIf="meridian" class="ngb-tp-spacer"></div>
          <div *ngIf="meridian" class="ngb-tp-meridian">
            <button type="button" class="btn btn-outline-primary" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"
              [disabled]="disabled" [class.disabled]="disabled"
                    (click)="toggleMeridian()">
              <ng-container *ngIf="model?.hour >= 12; else am" i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
              <ng-template #am i18n="@@ngb.timepicker.AM">{{ i18n.getMorningPeriod() }}</ng-template>
            </button>
          </div>
        </div>
      </fieldset>
    `,
  providers: [NGB_TIMEPICKER_VALUE_ACCESSOR]
})
export class NgbCustomTimepickerComponent implements ControlValueAccessor,
  OnChanges {
  disabled: boolean;
  model: NgbTime;

  private _hourStep: number;
  private _minuteStep: number;
  private _secondStep: number;

  public validation: [boolean, boolean, boolean] = [false, false, false];

  /**
   * Whether to display 12H or 24H mode.
   */
  @Input() meridian: boolean;

  /**
   * If `true`, the spinners above and below inputs are visible.
   */
  @Input() spinners: boolean;

  /**
   * If `true`, it is possible to select seconds.
   */
  @Input() seconds: boolean;

  /**
   * The number of hours to add/subtract when clicking hour spinners.
   */
  @Input()
  set hourStep(step: number) {
    this._hourStep = isInteger(step) ? step : this._config.hourStep;
  }

  get hourStep(): number { return this._hourStep; }

  /**
   * The number of minutes to add/subtract when clicking minute spinners.
   */
  @Input()
  set minuteStep(step: number) {
    this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
  }

  get minuteStep(): number { return this._minuteStep; }

  /**
   * The number of seconds to add/subtract when clicking second spinners.
   */
  @Input()
  set secondStep(step: number) {
    this._secondStep = isInteger(step) ? step : this._config.secondStep;
  }

  get secondStep(): number { return this._secondStep; }

  /**
   * If `true`, the timepicker is readonly and can't be changed.
   */
  @Input() readonlyInputs: boolean;

  /**
   * The size of inputs and buttons.
   */
  @Input() size: 'small' | 'medium' | 'large';

  @Input() minDate: Date;
  @Input() currDate: NgbDate;

  constructor(
    private readonly _config: NgbTimepickerConfig, private _ngbTimeAdapter: NgbTimeAdapter<any>,
    private _cd: ChangeDetectorRef, public i18n: NgbTimepickerI18n) {
    this.meridian = _config.meridian;
    this.spinners = _config.spinners;
    this.seconds = _config.seconds;
    this.hourStep = _config.hourStep;
    this.minuteStep = _config.minuteStep;
    this.secondStep = _config.secondStep;
    this.disabled = _config.disabled;
    this.readonlyInputs = _config.readonlyInputs;
    this.size = _config.size;
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value) {
    const structValue = this._ngbTimeAdapter.fromModel(value);
    this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
    if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
      this.model.second = 0;
    }
    this._cd.markForCheck();
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  changeHour(step: number) {
    this.model.changeHour(step);
    this.validation = this.validateTime();
    this.propagateModelChange();
  }

  changeMinute(step: number) {
    this.model.changeMinute(step);
    this.validation = this.validateTime();
    this.propagateModelChange();
  }

  changeSecond(step: number) {
    this.model.changeSecond(step);
    this.validation = this.validateTime();
    this.propagateModelChange();
  }

  validateTime(): [boolean, boolean, boolean] {
    console.log(this.model);
    console.log(this.minDate);
    if (this.minDate && this.currDate) {
      const minDateTs = new Date(this.minDate);
      const minDate = new NgbDate(minDateTs.getFullYear(), minDateTs.getMonth() + 1, minDateTs.getDate());
      // const currDate = new NgbDate(this.currDate.getFullYear(), this.currDate.getMonth() + 1, this.currDate.getDate());
      if (minDate.equals(this.currDate)) {
        const minTime = new NgbTime(minDateTs.getHours(), minDateTs.getMinutes(), minDateTs.getSeconds());
        return this.isAfterTime(this.model, minTime);
        // if (this.isAfterTime(this.model, this.minDate)) {
        //   return [false]; // disabled = false
        // } else {
        //   return [true];
        // }
      }
    }
    return [false, false, false];
  }

  updateHour(newVal: string) {
    const isPM = this.model.hour >= 12;
    const enteredHour = toInteger(newVal);
    if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
      this.model.updateHour(enteredHour + 12);
    } else {
      this.model.updateHour(enteredHour);
    }
    this.propagateModelChange();
  }

  updateMinute(newVal: string) {
    this.model.updateMinute(toInteger(newVal));
    this.propagateModelChange();
  }

  updateSecond(newVal: string) {
    this.model.updateSecond(toInteger(newVal));
    this.propagateModelChange();
  }

  toggleMeridian() {
    if (this.meridian) {
      this.changeHour(12);
    }
  }

  formatInput(input: HTMLInputElement) { input.value = input.value.replace(FILTER_REGEX, ''); }

  formatHour(value: number) {
    if (isNumber(value)) {
      if (this.meridian) {
        return padNumber(value % 12 === 0 ? 12 : value % 12);
      } else {
        return padNumber(value % 24);
      }
    } else {
      return padNumber(NaN);
    }
  }

  formatMinSec(value: number) { return padNumber(value); }

  get isSmallSize(): boolean { return this.size === 'small'; }

  get isLargeSize(): boolean { return this.size === 'large'; }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.seconds && !this.seconds && this.model && !isNumber(this.model.second)) {
      this.model.second = 0;
      this.propagateModelChange(false);
    }
  }

  private propagateModelChange(touched = true) {
    if (touched) {
      this.onTouched();
    }
    if (this.model.isValid(this.seconds)) {
      this.onChange(
        this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
    } else {
      this.onChange(this._ngbTimeAdapter.toModel(null));
    }
  }

  private isAfterTime(currTime: NgbTime, minTime: NgbTime): [boolean, boolean, boolean] {
    const currModelHour = new NgbTime(this.model.hour, this.model. minute, this.model.second);
    currModelHour.changeHour(-this.hourStep);

    if (currTime.hour > minTime.hour && currModelHour.hour > minTime.hour) {
      // if (time1.minute > time2.minute) {
      //   if (time1.second > time2.second) {
      //     return true;
      //   }
      // }
      return [false, false, false];
    } else {
      return [true, false, false];
    }
  }
}

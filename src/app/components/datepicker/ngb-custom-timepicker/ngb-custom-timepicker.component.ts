import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTime } from './ngb-custom-time';
import { isInteger, isNumber, toInteger, padNumber } from './ngb-custom-util-util';
import { NgbTimepickerConfig, NgbTimeAdapter, NgbTimepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';

interface SpinnerValidation {
  decrease: {
    hour: boolean;
    minute: boolean;
    second: boolean;
  };
  increase: {
    hour: boolean;
    minute: boolean;
    second: boolean;
  };
}

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
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled || validation.increase.hour"
              [disabled]="disabled || validation.increase.hour">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize"
              [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="HH" i18n-placeholder="@@ngb.timepicker.HH"
              [value]="formatHour(model?.hour)" (change)="updateHour($event.target)"
              [readOnly]="readonlyInputs" [disabled]="disabled || validation.increase.hour || validation.decrease.hour" aria-label="Hours" i18n-aria-label="@@ngb.timepicker.hours"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeHour(-hourStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled || validation.decrease.hour"
              [disabled]="disabled || validation.decrease.hour">
              <span class="chevron ngb-tp-chevron bottom"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
            </button>
          </div>
          <div class="ngb-tp-spacer">:</div>
          <div class="ngb-tp-input-container ngb-tp-minute">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(minuteStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled || validation.increase.minute"
              [disabled]="disabled || validation.increase.minute">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="MM" i18n-placeholder="@@ngb.timepicker.MM"
              [value]="formatMinSec(model?.minute)" (change)="updateMinute($event.target)"
              [readOnly]="readonlyInputs" [disabled]="disabled || validation.increase.minute || validation.decrease.minute" aria-label="Minutes" i18n-aria-label="@@ngb.timepicker.minutes"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeMinute(-minuteStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled || validation.decrease.minute"
              [disabled]="disabled || validation.decrease.minute">
              <span class="chevron ngb-tp-chevron bottom"></span>
              <span class="sr-only"  i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
            </button>
          </div>
          <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
          <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(secondStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize" [class.disabled]="disabled || validation.increase.second"
              [disabled]="disabled || validation.increase.second">
              <span class="chevron ngb-tp-chevron"></span>
              <span class="sr-only" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
            </button>
            <input type="text" class="ngb-tp-input form-control" [class.form-control-sm]="isSmallSize" [class.form-control-lg]="isLargeSize"
              maxlength="2" inputmode="numeric" placeholder="SS" i18n-placeholder="@@ngb.timepicker.SS"
              [value]="formatMinSec(model?.second)" (change)="updateSecond($event.target)"
              [readOnly]="readonlyInputs" [disabled]="disabled || validation.increase.second || validation.decrease.second" aria-label="Seconds" i18n-aria-label="@@ngb.timepicker.seconds"
              (input)="formatInput($event.target)"
              (keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
              (keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()">
            <button *ngIf="spinners" tabindex="-1" type="button" (click)="changeSecond(-secondStep)"
              class="btn btn-link" [class.btn-sm]="isSmallSize" [class.btn-lg]="isLargeSize"  [class.disabled]="disabled || validation.decrease.second"
              [disabled]="disabled || validation.decrease.second">
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

  public validation: SpinnerValidation = {
    decrease: {
      hour: false,
      minute: false,
      second: false
    },
    increase: {
      hour: false,
      minute: false,
      second: false
    }
  };

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
  @Input() maxDate: Date;
  @Input() currDate: NgbDate;

  @Output()
  public changeDate: EventEmitter<number> = new EventEmitter();

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
    this.changedToNewDay(this.model, step, 'hour');
    this.propagateModelChange();
  }

  changeMinute(step: number) {
    this.model.changeMinute(step);
    this.changedToNewDay(this.model, step, 'minute');
    this.propagateModelChange();
  }

  changeSecond(step: number) {
    this.model.changeSecond(step);
    this.changedToNewDay(this.model, step, 'second');
    this.propagateModelChange();
  }

  private changedToNewDay(model: NgbTime, step: number, type: string) {
    const typeInt = (type === 'hour' ? 24 : 60);
    if (step > 0) {
      // increase day
      if (model[type] - Math.abs(step) < 0 && model[type] >= 0) {
        if (model.hour - Math.abs(this.hourStep) < 0 && model.hour >= 0) {
          this.changeDate.emit(1);
        }
      }
    } else if (step < 0) {
      // decrease day
      if ((model[type] + Math.abs(step)) >= typeInt && model[type] < typeInt) {
        if (model.hour + Math.abs(this.hourStep) >= 24 && model.hour < 24) {
          this.changeDate.emit(-1);
        }
      }
    }
  }

  validateTime(model: NgbTime, spinnerCheck: boolean): SpinnerValidation {
    const output: SpinnerValidation = {
      decrease: {
        hour: false,
        minute: false,
        second: false
      },
      increase: {
        hour: false,
        minute: false,
        second: false
      }
    };
    if (this.minDate && this.currDate) {
      const minDateTs = new Date(this.minDate);
      const minDate = new NgbDate(minDateTs.getFullYear(), minDateTs.getMonth() + 1, minDateTs.getDate());
      if (minDate.equals(this.currDate)) {
        output.decrease = this.updateSpinnersMin(model, minDateTs, spinnerCheck).decrease;
      }
    }
    if (this.maxDate && this.currDate) {
      const maxDateTs = new Date(this.minDate);
      const maxDate = new NgbDate(maxDateTs.getFullYear(), maxDateTs.getMonth() + 1, maxDateTs.getDate());
      if (maxDate.equals(this.currDate)) {
        output.increase = this.updateSpinnersMax(model, maxDateTs, spinnerCheck).increase;
      }
    }
    return output;
  }

  private updateSpinnersMin(currModel: NgbTime, minDate: Date, spinnerCheck: boolean): SpinnerValidation {
    const curr = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(),
      currModel.hour, currModel.minute, currModel.second);
    const duplHourDecrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const duplMinuteDecrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const duplSecondDecrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const output: SpinnerValidation = {
      decrease: {
        hour: false,
        minute: false,
        second: false
      },
      increase: {
        hour: false,
        minute: false,
        second: false
      }
    };

    duplHourDecrease.changeHour(-this.hourStep);
    const manipHourDecrease = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(),
      duplHourDecrease.hour, duplHourDecrease.minute, duplHourDecrease.second);
    if (curr < minDate || (spinnerCheck && manipHourDecrease < minDate)) {
      output.decrease.hour = true;
    }
    duplMinuteDecrease.changeMinute(-this.minuteStep);
    const manipMinuteDecrease = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(),
      duplMinuteDecrease.hour, duplMinuteDecrease.minute, duplMinuteDecrease.second);
    if (curr < minDate || (spinnerCheck && manipMinuteDecrease < minDate)) {
      output.decrease.minute = true;
    }
    duplSecondDecrease.changeSecond(-this.secondStep);
    const manipSecondDecrease = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate(),
      duplSecondDecrease.hour, duplSecondDecrease.minute, duplSecondDecrease.second);
    if (curr < minDate || (spinnerCheck && manipSecondDecrease < minDate)) {
      output.decrease.second = true;
    }

    return output;
  }

  private updateSpinnersMax(currModel: NgbTime, maxDate: Date, spinnerCheck: boolean): SpinnerValidation {
    const curr = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(),
      currModel.hour, currModel.minute, currModel.second);
    const duplHourIncrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const duplMinuteIncrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const duplSecondIncrease = new NgbTime(currModel.hour, currModel.minute, currModel.second);
    const output: SpinnerValidation = {
      decrease: {
        hour: false,
        minute: false,
        second: false
      },
      increase: {
        hour: false,
        minute: false,
        second: false
      }
    };

    duplHourIncrease.changeHour(-this.hourStep);
    const manipHourIncrease = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(),
      duplHourIncrease.hour, duplHourIncrease.minute, duplHourIncrease.second);
    if (curr > maxDate || (spinnerCheck && manipHourIncrease > maxDate)) {
      output.increase.hour = true;
    }
    duplMinuteIncrease.changeMinute(-this.minuteStep);
    const manipMinuteIncrease = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(),
      duplMinuteIncrease.hour, duplMinuteIncrease.minute, duplMinuteIncrease.second);
    if (curr > maxDate || (spinnerCheck && manipMinuteIncrease > maxDate)) {
      output.increase.minute = true;
    }
    duplSecondIncrease.changeSecond(-this.secondStep);
    const manipSecondIncrease = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(),
      duplSecondIncrease.hour, duplSecondIncrease.minute, duplSecondIncrease.second);
    if (curr > maxDate || (spinnerCheck && manipSecondIncrease > maxDate)) {
      output.increase.second = true;
    }
    return output;
  }

  updateHour(target: any) {
    const isPM = this.model.hour >= 12;
    const enteredHour = toInteger(target.value);
    if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
      // check if updatedHour would be out of range
      const updatedModel = new NgbTime(this.model.hour, this.model.minute, this.model.second);
      updatedModel.updateHour(enteredHour + 12);
      const output = this.validateTime(updatedModel, false);
      if (output.decrease.hour || output.decrease.minute || output.decrease.second
        || output.increase.hour || output.increase.minute || output.increase.second) {
        target.value = this.model.hour;
      } else {
        this.model.updateHour(enteredHour + 12);
      }
    } else {
      // check if updatedHour would be out of range
      const updatedModel = new NgbTime(this.model.hour, this.model.minute, this.model.second);
      updatedModel.updateHour(enteredHour);
      const output = this.validateTime(updatedModel, false);
      if (output.decrease.hour || output.decrease.minute || output.decrease.second
        || output.increase.hour || output.increase.minute || output.increase.second) {
        target.value = this.model.hour;
      } else {
        this.model.updateHour(enteredHour);
      }
    }
    this.propagateModelChange();
  }

  updateMinute(target: any) {
    // check if updated minute would be out of range
    const updatedModel = new NgbTime(this.model.hour, this.model.minute, this.model.second);
    updatedModel.updateMinute(toInteger(target.value));
    const output = this.validateTime(updatedModel, false);
    if (output.decrease.minute || output.decrease.second || output.increase.minute || output.increase.second) {
      target.value = this.model.minute;
    } else {
      this.model.updateMinute(toInteger(target.value));
    }

    this.propagateModelChange();
  }

  updateSecond(target: any) {
    // check if updated second would be out of range
    const updatedModel = new NgbTime(this.model.hour, this.model.minute, this.model.second);
    updatedModel.updateSecond(toInteger(target.value));
    const output = this.validateTime(updatedModel, false);
    if (output.decrease.hour || output.decrease.minute || output.decrease.second
      || output.increase.hour || output.increase.minute || output.increase.second) {
      target.value = this.model.second;
    } else {
      this.model.updateSecond(toInteger(target.value));
    }
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
    if (changes.currDate) {
      console.log(changes.currDate);
      console.log(this.model);
      console.log(this.minDate);
      console.log(this.maxDate);
      // TODO: on initialize this.model === undefined, but values need to be checked
      if (this.model) {
        this.validateTime(this.model, true);
      }
    }
  }

  private propagateModelChange(touched = true) {
    this.validation = this.validateTime(this.model, true);
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
}

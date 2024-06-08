import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NgOmniSearchService } from './ng-omni-search.service';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Subject, takeLast, takeUntil, withLatestFrom } from "rxjs";

@Component({
  selector: 'ng-omni-search',
  templateUrl: './ng-omni-search.component.html',
  styleUrls: ['./ng-omni-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgOmniSearchComponent),
      multi: true
    }
  ]
})
export class NgOmniSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
  selectedLanguage: string = '';
  mic: boolean = false;
  isCompatible: boolean = true;
  message = '';
  form = new FormControl('');
  private destroy$ = new Subject<void>();

  @Input('language') set newLanguage(lang: string) {
    this.selectedLanguage = lang ?? navigator.language;
  }

  private onTouch = () => {
  };
  private onChange = (val: any) => {
  };

  constructor(private srv: NgOmniSearchService) {
    this.srv.getResults()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(v => {
        this.form.setValue(v);
        console.log({ v })
      })
  }

  ngOnInit(): void {
    const webSpeechReady = this.srv.initialize(this.selectedLanguage);
    if (!webSpeechReady) {
      this.message = 'Your Browser is not supported. Please try Google Chrome.';
      this.isCompatible = false;
    } else {
      this.message = 'Record';
      this.isCompatible = true;
    }
  }

  record() {
    if (!this.isCompatible || this.form.disabled) return
    this.mic = !this.mic;
    if (this.mic) {
      this.srv.onStart()
    } else {
      this.srv.onEnd()
    }

  }

  inputChanged(e: any) {
    this.onChange(e);
    this.onTouch();
  }

  writeValue(obj: any): void {
    this.form.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled)
      this.form.disable()
    else
      this.form.enable()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

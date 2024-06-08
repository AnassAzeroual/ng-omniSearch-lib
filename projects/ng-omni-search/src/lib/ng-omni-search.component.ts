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
  isMicrophoneGranted: boolean = false;

  @Input('language') set newLanguage(lang: string) {
    this.selectedLanguage = lang ?? navigator.language;
  }

  private onTouch = () => {
  };
  private onChange = (val: any) => {
  };

  constructor(private srv: NgOmniSearchService) {
    this.getResults();
  }


  async ngOnInit(): Promise<void> {
    this.isMicrophoneGranted = await this.isMicrophoneAllowed();    
    const webSpeechReady = this.srv.initialize(this.selectedLanguage);
    if (!webSpeechReady) {
      this.message = 'Your Browser is not supported. Please try Google Chrome.';
      this.isCompatible = false;
    } else {
      this.message = 'Record';
      this.isCompatible = true;
    }
  }

  getResults() {
    this.srv.getResults()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(v => {
        this.form.setValue(v);
      });
  }

  async record() {
    this.isMicrophoneGranted = await this.isMicrophoneAllowed()
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

  async isMicrophoneAllowed() {
    let data:PermissionDescriptor = { name: 'microphone' } as any;
    try {
      const permissionStatus = await navigator.permissions.query(data);
      return permissionStatus.state === 'granted';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

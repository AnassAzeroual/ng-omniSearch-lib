import { Component, OnInit } from '@angular/core';
import { NgOmniSearchService, SpeechError, SpeechEvent, SpeechNotification } from './ng-omni-search.service';
import { Observable, Subject, of, tap, map, merge } from 'rxjs';

@Component({
  selector: 'lib-ng-omni-search',
  template: `
      <section>
    <div *ngIf="errorMessage$| async as errorMessage" class="notification">{{errorMessage}}</div>
  </section>
  <section>
    <form>
      <label>Select your language</label>
      <select [(value)]="currentLanguage">
        <option *ngFor="let language of languages" [value]="language" (click)="selectLanguage(language)">
          {{language}}
        </option>
      </select>
    </form>
  </section>
  <section>
    <button fab *ngIf="listening$ | async; else mic" (click)="stop()">
    stop mic
    </button>
    <ng-template #mic>
      <button fab (click)="start()">
        start mic
      </button>
    </ng-template>
  </section>
<section *ngIf="transcript$ | async">
  <div class="notification elevation-z4">{{transcript$ | async}}</div>
</section>
<section>
  <form class="speech-result-width">
    <textarea matInput [value]="totalTranscript || ''" placeholder="Speech Input Result" rows="15" disabled="true"></textarea>
  </form>
</section>

    
  `,
  styles: [
  ]
})
export class NgOmniSearchComponent implements OnInit {
  languages: string[] = ['en-US'];
  currentLanguage: any = this.languages[0];
  totalTranscript?: string;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();

  constructor(
    private speechRecognizer: NgOmniSearchService
  ) {}

  ngOnInit(): void {
    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    }else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
  }

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    console.log(language);
    
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        console.log(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }
}

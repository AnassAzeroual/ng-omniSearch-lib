import { Component, OnInit } from '@angular/core';
import { NgOmniSearchService, SpeechError, SpeechEvent, SpeechNotification } from './ng-omni-search.service';
import { Observable, Subject, map, merge, tap } from 'rxjs';

@Component({
  selector: 'lib-ng-omniSearch',
  standalone: true,
  imports: [],
  template: `
    <button (click)="onClickStart()">Start</button>
    <button (click)="onClickStop()">Stop</button>
    <button (click)="onClickClear()">Clear</button>
    {{message}}
  `,
  styles: ``
})
export class NgOmniSearchComponent implements OnInit {
  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  language: string = 'en-US';
  message = ""
  constructor(private srv: NgOmniSearchService) {

  }
  ngOnInit(): void {
    if (this.srv.initialize(this.language)) {
      this.initRecognition()
    }else {
      this.message = "Your Browser is not supported. Please try Google Chrome."
      console.log(this.message);
    }
  }

  onClickStart() {
    if (this.srv.isListening) {
      this.onClickStop();
      return;
    }

    this.defaultError$.next(undefined);
    this.srv.start();
  }
  onClickStop() {
    this.srv.stop();
  }
  onClickClear() { }

  private initRecognition(): void {
    this.transcript$ = this.srv.onResult().pipe(
      tap((notification) => {
        console.log(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.srv.onStart(),
      this.srv.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.srv.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        switch (data.error) {
          case SpeechError.NotAllowed:
            this.message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            this.message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            this.message = `Microphone is not available. Please verify the connection of your microphone and try again.`;
            break;
          default:
            this.message = '';
            break;
        }
        return this.message;
      })
    );
  }
}
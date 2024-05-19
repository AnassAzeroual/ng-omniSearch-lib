import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

export enum SpeechError {
  NoSpeech = 'no-speech',
  AudioCapture = 'audio-capture',
  NotAllowed = 'not-allowed',
  Unknown = 'unknown'
}

export enum SpeechEvent {
  Start,
  End,
  FinalContent,
  InterimContent
}

export interface SpeechNotification<T> {
  event?: SpeechEvent;
  error?: SpeechError;
  content?: T;
}
(<any>window).SpeechRecognition = (<any>window).webkitSpeechRecognition || (<any>window).SpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
  recognition:any;
  language!: string;
  isListening = false;

  constructor(private ngZone: NgZone) { }

  initialize(language: string): boolean {
    // if (typeof (SpeechRecognition) !== 'undefined') {
    //   this.recognition = new SpeechRecognition(); // Use SpeechRecognition for Firefox (if supported)
    // } else {
    //   this.recognition = new webkitSpeechRecognition(); // Fallback for other browsers
    // }
    // this.recognition.continuous = true;
    // this.recognition.interimResults = true;
    // this.setLanguage(language);
    // return true;

    if ('SpeechRecognition' in window) {
      console.log('enter');
      
      this.recognition = new (<any>window).SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.setLanguage(language);
      return true;
    }
    console.log('not enter');

    return false;
  }

  setLanguage(language: string): void {
    this.language = language;
    this.recognition.lang = language;
  }

  start(): void {
    if (!this.recognition) {
      return;
    }

    this.recognition.start();
    this.isListening = true;
  }

  onStart(): Observable<SpeechNotification<never>> {
    if (!this.recognition) {
      let res = this.initialize(this.language);
      console.log(res);

    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.Start
          });
        });
      };
    });
  }

  onEnd(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        this.ngZone.run(() => {
          observer.next({
            event: SpeechEvent.End
          });
          this.isListening = false;
        });
      };
    });
  }

  onResult(): Observable<SpeechNotification<string>> {
    return new Observable(observer => {
      this.recognition.onresult = (event: any) => {
        let interimContent = '';
        let finalContent = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalContent += event.results[i][0].transcript;
            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.FinalContent,
                content: finalContent
              });
            });
          } else {
            interimContent += event.results[i][0].transcript;
            // console.log('interim transcript', event, interimContent);
            this.ngZone.run(() => {
              observer.next({
                event: SpeechEvent.InterimContent,
                content: interimContent
              });
            });
          }
        }
      };
    });
  }

  onError(): Observable<SpeechNotification<never>> {
    return new Observable(observer => {
      this.recognition.onerror = (event:any) => {
        // tslint:disable-next-line:no-any
        const eventError: string = (event as any).error;
        console.error(eventError);
        let error: SpeechError;
        switch (eventError) {
          case 'no-speech':
            error = SpeechError.NoSpeech;
            break;
          case 'audio-capture':
            error = SpeechError.AudioCapture;
            break;
          case 'not-allowed':
            error = SpeechError.NotAllowed;
            break;
          default:
            error = SpeechError.Unknown;
            break;
        }

        this.ngZone.run(() => {
          observer.next({
            error
          });
        });
      };
    });
  }

  stop(): void {
    this.recognition.stop();
  }
}

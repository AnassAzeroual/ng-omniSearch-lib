import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

(<any>window).SpeechRecognition = (<any>window).webkitSpeechRecognition || (<any>window).SpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
  recognition: any;
  language: string = '';
  isListening = false;
  private resultSubject = new Subject<string>();
  latestEmittedValue: string = '';

  constructor(private ngZone: NgZone) { }

  initialize(language: string): boolean {
    //check if the browser is mozilla firefox
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
      console.log('Speech recognition is not supported in Mozilla Firefox');
      return false;
    }
    if ('SpeechRecognition' in window) {

      //? instance of Speech Recognition
      this.recognition = new (<any>window).SpeechRecognition();
      //? settings
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      //? set language
      this.language = language;
      this.recognition.lang = language;
      this.onResult();
      return true;
    } else {
      return false
    }
  }


  onStart(): void {
    this.recognition.start();
    this.isListening = true;
  }

  onEnd() {
    this.recognition.stop();
    this.isListening = false;
  }

  onResult() {
    this.ngZone.runOutsideAngular(() => {
      this.recognition.onresult = (e: any) => {
        let interim = '';
        for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
          interim += e.results[i][0].transcript;
          if (this.latestEmittedValue !== interim) {
            this.resultSubject.next(interim);
          }
          this.latestEmittedValue = interim;
        }
      };
    })
  }

  getResults(): Observable<string> {
    return this.resultSubject.asObservable();
  }

  onError() {

  }

  stop(): void {
    this.recognition.stop();
  }
}

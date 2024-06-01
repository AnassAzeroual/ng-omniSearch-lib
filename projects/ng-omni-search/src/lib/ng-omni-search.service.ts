import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';


(<any>window).SpeechRecognition = (<any>window).webkitSpeechRecognition || (<any>window).SpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
  recognition: any;
  language: string = '';
  isListening = false;

  constructor(private ngZone: NgZone) { }

  initialize(language: string): boolean {
    if ('SpeechRecognition' in window) return false;
    //? instance of Speech Recognition
    this.recognition = new (<any>window).SpeechRecognition();
    //? settings
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    //? set language
    this.language = language;
    this.recognition.lang = language;
    this.onResult()
    return true;
  }


  onStart(): void {
    if (!this.recognition) return
    this.recognition.start();
    this.isListening = true;
  }

  onEnd() {
    if (!this.recognition) return
    this.recognition.stop();
    this.isListening = false;
  }

  onResult() {
    let final = '';

    this.recognition.onresult = (e:any) => {
      let interim = '';

      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;

        if (e.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      console.log(`${final} <i>${interim}</i>`);
    };
  }

  onError() {

  }

  stop(): void {
    this.recognition.stop();
  }
}

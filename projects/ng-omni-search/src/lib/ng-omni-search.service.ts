import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';


(<any>window).SpeechRecognition = (<any>window).webkitSpeechRecognition || (<any>window).SpeechRecognition;
@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
  recognition: any;
  language!: string;
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
    return true;
  }


  start(): void {
    if (!this.recognition) return
    this.recognition.start();
    this.isListening = true;
  }

  onStart(){
    
  }

  onEnd(){
    
  }

  onResult() {
    
  }

  onError(){
    
  }

  stop(): void {
    this.recognition.stop();
  }
}

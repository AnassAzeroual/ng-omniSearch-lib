import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
  recognition;

  constructor() {
    if (typeof (new webkitSpeechRecognition()) !== 'undefined') {
      this.recognition = new webkitSpeechRecognition(); // Fallback for other browsers
    } else {
      this.recognition = new SpeechRecognition(); // Use SpeechRecognition for Firefox
    }
  }

}

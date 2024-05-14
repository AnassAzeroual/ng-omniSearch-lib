import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgOmniSearchService {
rec = new SpeechRecognition() || new webkitSpeechRecognition();
  constructor() { }

  initRec(){
    if (this.rec) {
      return true
    } else {
      return false
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgOmniSearchService } from './ng-omni-search.service';

@Component({
  selector: 'lib-ng-omni-search',
  templateUrl: './ng-omni-search.component.html',
  styleUrls: ['./ng-omni-search.component.scss']
})
export class NgOmniSearchComponent implements OnInit {
  selectedLanguage: string = '';
  totalTranscript?: string;
  mic: boolean = false;
  
  @Input('language') set newLanguage(lang: string) {
    this.selectedLanguage = lang ?? 'en-US';
  }
  
  constructor(
    private srv: NgOmniSearchService
  ) { }

  ngOnInit(): void {
    const webSpeechReady = this.srv.initialize(this.selectedLanguage);
    if (webSpeechReady) {
      // this.initRecognition();
    } else {
      console.log('Your Browser is not supported. Please try Google Chrome.');
    }
  }

  start(): void {
    if (this.srv.isListening) {
      this.stop();
      return;
    }
  }

  stop(): void {
    this.srv.stop();
  }

  record() {
    this.mic = !this.mic;
    console.log(this.mic);
    
  }
}

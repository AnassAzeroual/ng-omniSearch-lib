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
    this.selectedLanguage = lang ?? navigator.language;
  }
  
  constructor(
    private srv: NgOmniSearchService
  ) { }

  ngOnInit(): void {
    const webSpeechReady = this.srv.initialize(this.selectedLanguage);
    if (webSpeechReady) {
      console.log(this.srv.initialize('en'));
      
    } else {
      console.log('Your Browser is not supported. Please try Google Chrome.');
    }
  }

  record() {
    this.mic = !this.mic;
    console.log(this.mic);
    if (this.mic) {
      this.srv.onStart()
    }else{
      this.srv.onEnd()
    }
    
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgOmniSearchService } from './ng-omni-search.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-ng-omni-search',
  templateUrl: './ng-omni-search.component.html',
  styleUrls: ['./ng-omni-search.component.scss']
})
export class NgOmniSearchComponent implements OnInit {
  selectedLanguage: string = '';
  mic: boolean = false;
  isCompatible: boolean = true;
  message = '';
  form!: FormGroup;

  @Input('language') set newLanguage(lang: string) {
    this.selectedLanguage = lang ?? navigator.language;
  }

  constructor(
    private srv: NgOmniSearchService,
    private fb:FormBuilder
  ) {
    this.form = fb.group({
      inputRecord: ['']
    })
  }

  ngOnInit(): void {
    const webSpeechReady = this.srv.initialize(this.selectedLanguage);
    if (!webSpeechReady) {
      console.warn('Your Browser is not supported. Please try Google Chrome.');
      this.message = 'Your Browser is not supported. Please try Google Chrome.';
      this.isCompatible = false;
    }else{
      this.message = 'Record';
      this.isCompatible = true;
    }
  }

  record() {
    if(!this.isCompatible) return
    this.mic = !this.mic;
    console.log(this.mic);
    if (this.mic) {
      this.srv.onStart()
    } else {
      this.srv.onEnd()
      this.srv.getResults().subscribe((res: string) => {
        this.form.get('inputRecord')?.setValue(res);
        console.log(res)
      })
    }

  }
}

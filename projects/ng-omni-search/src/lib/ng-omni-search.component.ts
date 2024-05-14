import { Component, OnInit } from '@angular/core';
import { NgOmniSearchService } from './ng-omni-search.service';

@Component({
  selector: 'lib-ng-omni-search',
  template: `
    <p>is compatible : {{isCompatibleRec}} </p>
     <button (click)="start()">Start</button>
     <button (click)="stop()">stop</button>
     <button (click)="clear()">clear</button>
    
  `,
  styles: [
  ]
})
export class NgOmniSearchComponent implements OnInit {
  isCompatibleRec = false;
  constructor(private srvOmniSearch: NgOmniSearchService) { }
  ngOnInit(): void {
    this.isCompatibleRec = this.srvOmniSearch.initRec()
  }


  start() {
    if (!this.isCompatibleRec) return

  }
  stop() {
    if (!this.isCompatibleRec) return

  }
  clear() {

  }
}

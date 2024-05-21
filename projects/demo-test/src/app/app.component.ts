import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'demo-test';
  languages: string[] = [
    'ar-AR', 'bg-BG', 'ca-ES', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-CA', 'en-GB',
    'en-IN', 'en-NZ', 'en-US', 'es-ES', 'es-US', 'eu-ES', 'fi-FI', 'fr-CA', 'fr-FR', 'gl-ES',
    'he-IL', 'hi-IN', 'hr-HR', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'kn-IN', 'ko-KR', 'lt-LT',
    'mk-MK', 'ms-MY', 'nl-NL', 'no-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'sk-SK',
    'sl-SI', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW'
  ];
  selectedLanguage!: string;

  onChangeLang(language: string): void {
    // if (this.srv.isListening) {
    //   this.stop();
    // }
    console.log(language);

    this.selectedLanguage = language;
  }

  
}

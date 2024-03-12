import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { langBox } from '../constants/localStorageKeys';

@Injectable()
export class ChangeDirService {
  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  onChangeLang(cultureName: string) {
    //  this.sessionState.setLanguage(cultureName);
    //  this.sessionState.setLanguage(cultureName);
  }

  arLang = 'ar';
  arDir = 'rtl';

  enLang = 'en';
  enDir = 'ltr';

  currentLang?: string;
  changeLang() {
    this.currentLang = localStorage.getItem(langBox) ?? '';
    this.currentLang = this.translate.currentLang;

    if (this.currentLang == this.arLang) {
      localStorage.setItem(langBox, this.enLang);
      this.translate.use(this.enLang);
      this.document.documentElement.setAttribute('dir', this.enDir);
      this.currentLang = this.enLang;
    } else {
      localStorage.setItem(langBox, this.arLang);
      this.translate.use(this.arLang);
      this.document.documentElement.setAttribute('dir', this.arDir);
      this.currentLang = this.arLang;
    }
    location.reload();
  }

  setDefultLang() {
    this.currentLang = localStorage.getItem(langBox) ?? '';
    if (this.currentLang == '' || this.currentLang == this.arLang) {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');

      this.currentLang = this.arLang;
    } else {
      this.translate.use(this.enLang);
      this.document.documentElement.setAttribute('dir', this.enDir);
      this.currentLang = this.enLang;
    }
  }
  get langStorage(): string {
    return localStorage.getItem(langBox) ?? this.arLang;
  }
}

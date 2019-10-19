import { Component, OnInit } from '@angular/core';

import { MaterialCssVarsService } from 'angular-material-css-vars';

@Component({
  selector: 'kongtrac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _materialCssVarsService: MaterialCssVarsService) {}

  ngOnInit() {
    this._materialCssVarsService.setPrimaryColor('#ba3448');
    this._materialCssVarsService.setAccentColor('#89b3f3');
  }
}

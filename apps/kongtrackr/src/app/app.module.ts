import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import { HttpClientModule } from '@angular/common/http';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { appModule } from './app.module.ajs';
import { PublicModule } from './public/public.module';
import { RankingModule } from './ranking/ranking.module';
import { QuicksearchModule } from './quicksearch/quicksearch.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PublicModule,
    RankingModule,
    QuicksearchModule,
    MaterialCssVarsModule.forRoot({
      darkThemeClass: 'isDarkTheme',
      lightThemeClass: 'isLightTheme'
    }),
    UIRouterUpgradeModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  bootstrap: []
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [appModule], { strictDi: false });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpgradeModule } from '@angular/upgrade/static';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import { HttpClientModule } from '@angular/common/http';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { appModule } from './app.module.ajs';
import { PlayerModule } from './player/player.module';
import { PublicModule } from './public/public.module';
import { RankingModule } from './ranking/ranking.module';
import { SharedModule } from './shared/shared.module';
import { QuicksearchModule } from './quicksearch/quicksearch.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialCssVarsModule.forRoot({
      darkThemeClass: 'isDarkTheme',
      lightThemeClass: 'isLightTheme'
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    PlayerModule,
    PublicModule,
    RankingModule,
    SharedModule,
    QuicksearchModule,
    UIRouterUpgradeModule.forRoot()
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

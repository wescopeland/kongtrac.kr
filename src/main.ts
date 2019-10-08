import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './vendor';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { UIRouter } from '@uirouter/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, [])
  .then(platformRef => {
    const urlService = platformRef.injector.get(UIRouter).urlService;

    function startUIRouter() {
      urlService.listen();
      urlService.sync();
    }

    platformRef.injector.get<NgZone>(NgZone).run(startUIRouter);
  })
  .catch(err => console.error(err));

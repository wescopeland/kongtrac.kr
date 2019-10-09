import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

export const publicModule = angular
  .module('kongtrac.public', [])
  .directive(
    'kongtracHeader',
    downgradeComponent({ component: HeaderComponent })
  )
  .directive(
    'kongtracNavbar',
    downgradeComponent({ component: NavbarComponent })
  )
  .directive(
    'kongtracFooter',
    downgradeComponent({ component: FooterComponent })
  ).name;

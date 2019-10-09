import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  declarations: [HeaderComponent, NavbarComponent, FooterComponent],
  exports: [HeaderComponent, NavbarComponent, FooterComponent],
  entryComponents: [HeaderComponent, NavbarComponent, FooterComponent]
})
export class PublicModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortNumberPipe } from './short-number.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ShortNumberPipe],
  providers: [ShortNumberPipe],
  exports: [ShortNumberPipe]
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalSearchDirective } from './global-search.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [GlobalSearchDirective],
  exports: [GlobalSearchDirective]
})
export class QuicksearchModule {}

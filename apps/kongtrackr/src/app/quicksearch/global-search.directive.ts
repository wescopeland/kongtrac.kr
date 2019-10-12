import { Directive, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'global-search'
})
export class GlobalSearchDirective extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('globalSearch', elementRef, injector);
  }
}

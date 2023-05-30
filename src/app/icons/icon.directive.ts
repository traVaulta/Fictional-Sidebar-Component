import { Directive, HostBinding } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[icon]'
})
export class IconDirective {
  @HostBinding('class.icon') ready = true;
}

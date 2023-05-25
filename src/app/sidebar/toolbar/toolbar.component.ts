import { Component } from '@angular/core';

import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-toolbar',
  imports: [
    LinkIconComponent
  ],
  template: `
    <div class="flex space-between">
      <div>
        icon
      </div>
      <div>avatar</div>
    </div>
  `
})
export class SidebarToolbarComponent {}

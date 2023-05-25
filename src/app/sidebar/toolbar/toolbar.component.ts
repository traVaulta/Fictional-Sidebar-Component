import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-toolbar',
  template: `
    <div class="flex space-between">
      <div>icon</div>
      <div>avatar</div>
    </div>
  `
})
export class SidebarToolbarComponent {}

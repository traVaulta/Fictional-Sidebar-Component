import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarToolbarComponent } from './toolbar/toolbar.component';
import { SidebarContentComponent } from './content/content.component';

@Component({
  standalone: true,
  selector: 'orfs-sidebar',
  imports: [
    CommonModule,
    SidebarToolbarComponent,
    SidebarContentComponent
  ],
  template: `
    <aside class="container">
      <orfs-sidebar-toolbar></orfs-sidebar-toolbar>
      <div class="sidebar-heading fg-primary-900 w-700">Companies</div>
      <orfs-sidebar-content></orfs-sidebar-content>
    </aside>
  `,
  styles: [`
    .sidebar-heading {
      margin: 14px 0;
    }
  `]
})
export class SidebarComponent {
}

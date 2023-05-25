import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarToolbarComponent } from './sidebar/toolbar/toolbar.component';

@Component({
  selector: 'orfs-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    SidebarToolbarComponent
  ],
  template: `
    <aside class="container">
      <orfs-sidebar-toolbar></orfs-sidebar-toolbar>
      <div class="sidebar-heading fg-primary-900 w-700">Companies</div>
      <orfs-sidebar></orfs-sidebar>
    </aside>
  `,
  styles: [`
    .sidebar-heading {
      margin: 14px 0;
    }
  `],
})
export class AppComponent {}

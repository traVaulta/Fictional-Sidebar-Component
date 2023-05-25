import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'orfs-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent
  ],
  template: `
    <div>
      <div class="sidebar-heading fg-primary-900 w-700">Companies</div>
      <orfs-sidebar></orfs-sidebar>
    </div>
  `,
  styles: [`
    .sidebar-heading {
      margin: 14px 0;
    }
  `],
})
export class AppComponent {}

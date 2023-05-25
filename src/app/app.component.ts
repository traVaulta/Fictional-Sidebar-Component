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
  template: ' <orfs-sidebar></orfs-sidebar>'
})
export class AppComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'orfs-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
  ],
  template: ' <orfs-sidebar></orfs-sidebar>'
})
export class AppComponent {}

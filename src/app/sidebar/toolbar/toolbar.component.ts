import { Component } from '@angular/core';

import { ProfileIconComponent } from '../../icons/profil-icon/profile-icon.component';
import { NotificationBellIconComponent } from '../../icons/notification-bell-icon/notification-bell-icon.component';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-toolbar',
  imports: [
    ProfileIconComponent,
    NotificationBellIconComponent
  ],
  template: `
    <div class="flex space-between align-center">
      <div>
        <orfs-notification-bell-icon></orfs-notification-bell-icon>
      </div>
      <div>
        <orfs-profile-icon></orfs-profile-icon>
      </div>
    </div>
  `
})
export class SidebarToolbarComponent {}

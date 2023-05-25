import { Component, effect, signal } from '@angular/core';
import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';
import { ClientService } from './client.service';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-content',
  imports: [
    LinkIconComponent
  ],
  template: `
    <div class="sidebar-heading fg-primary-900 w-700">Companies</div>
    <nav class="fg-primary-900 w-700">
      Ravvio
      <ul class="no-decoration fg-primary-900 w-700">
        <li>
          Finance Team
          <ul class="no-decoration fg-grey w-600">
            <li class="flex space-between">Michael P. Lucifer <orfs-link-icon></orfs-link-icon></li>
          </ul>
        </li>
        <li>
          Technical Team
          <ul class="no-decoration fg-grey w-600">
            <li class="flex space-between">Marlyn B. Brown <orfs-link-icon></orfs-link-icon></li>
            <li class="flex space-between">David P. Perez <orfs-link-icon></orfs-link-icon></li>
          </ul>
         </li>
      </ul>
    </nav>
    <nav class="fg-primary-900 w-700">
      CashLab
      <ul class="no-decoration fg-grey w-600">
        <li class="flex space-between">Anna J. Kelly <orfs-link-icon></orfs-link-icon></li>
        <li class="flex space-between">Brenda J. Soto <orfs-link-icon></orfs-link-icon></li>
      </ul>
    </nav>
    <nav class="fg-primary-900 w-700">
      Dovish
      <ul class="no-decoration fg-primary-900 w-700">
        <li>
          Management
          <ul class="no-decoration fg-grey w-600">
            <li class="flex space-between">Timothy A. Merrow <orfs-link-icon></orfs-link-icon></li>
          </ul>
         </li>
      </ul>
    </nav>
  `
})
export class SidebarContentComponent {
  data = signal<Response[]>([]);
  constructor(private client: ClientService) {
    effect(() => {})
  }

  async getAll() {
    const data: any[] = (await this.client.getAll()) ?? [];
    this.data.set(data);
  }
}

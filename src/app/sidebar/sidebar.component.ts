import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'orfs-sidebar',
  imports: [
    CommonModule
  ],
  template: `
    <div class="sidebar-heading fg-primary-900 w-700">Companies</div>
    <nav class="fg-primary-900 w-700">
      Ravvio
      <ul class="no-decoration fg-primary-900 w-700">
        <li>
          Finance Team
          <ul class="no-decoration fg-grey w-600">
            <li>Michael P. Lucifer</li>
          </ul>
        </li>
        <li>
          Technical Team
          <ul class="no-decoration fg-grey w-600">
            <li>Marlyn B. Brown</li>
            <li>David P. Perez</li>
          </ul>
        </li>
      </ul>
    </nav>
    <nav class="fg-primary-900 w-700">
      CashLab
      <ul class="no-decoration fg-grey w-600">
        <li>Anna J. Kelly</li>
        <li>Brenda J. Soto</li>
      </ul>
    </nav>
    <nav class="fg-primary-900 w-700">
      Dovish
      <ul class="no-decoration fg-primary-900 w-700">
        <li>
          Management
          <ul class="no-decoration fg-grey w-600">
            <li>Timothy A. Merrow</li>
          </ul>
        </li>
      </ul>
    </nav>
  `
})
export class SidebarComponent {
}

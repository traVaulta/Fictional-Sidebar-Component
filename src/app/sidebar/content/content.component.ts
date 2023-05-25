import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';

import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';
import { ClientService } from './client.service';
import { prepEmployee, prepItems } from './mapper';
import { DepartmentDto, EmployeeDto, EmployeeUI, ResponseDto } from './models';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-content',
  imports: [
    CommonModule,
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
    <hr>
    <hr>
    <hr>
    <nav *ngFor="let company of result()" class="fg-primary-900 w-700">
      {{ company.name }}
      <ul class="no-decoration fg-primary-900 w-700">
        <li *ngFor="let depOrEmpl of asAny(company.items)">
          {{ depOrEmpl.name }}
          <ng-container *ngIf="extractIfDepartment(depOrEmpl) as empls">
            <ul *ngFor="let empl of empls" class="no-decoration fg-grey w-600">
              <li class="flex space-between">{{ empl.name }} <orfs-link-icon></orfs-link-icon></li>
            </ul>
          </ng-container>
        </li>
      </ul>
    </nav>
  `
})
export class SidebarContentComponent implements OnInit {
  data = signal<ResponseDto[]>([]);
  employees = computed(() => this.data().map(v => prepEmployee(v)));
  result = computed(() => prepItems(this.employees()));

  constructor(private client: ClientService) {}

  ngOnInit() {
    this.getAll();
  }

  asAny(depsOrEmpls: DepartmentDto[] | EmployeeDto[]) {
    return <any[]>depsOrEmpls;
  }

  extractIfDepartment(depOrEmpl: DepartmentDto | EmployeeDto): EmployeeDto[] {
    if ('items' in depOrEmpl) {
      return (<DepartmentDto>depOrEmpl).items;
    } else {
      return [];
    }
  }

  async getAll() {
    const data = (await this.client.getAll()) ?? [];
    this.data.set(data);
  }
}

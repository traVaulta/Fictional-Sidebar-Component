import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';

import { IconDirective } from '../../icons/icon.directive';
import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';
import { ClientService } from './client.service';
import { mapResponseRecursively } from './mapper';
import { DepartmentDto, EmployeeDto, ResponseDto } from './models';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-content',
  imports: [
    CommonModule,
    LinkIconComponent,
    IconDirective
  ],
  template: `
    <nav *ngFor="let company of result()" class="fg-primary-900 w-700">
      {{ company.name }}
      <ul class="no-decoration">
        <ng-container *ngFor="let depOrEmpl of asAny(company.items)">
          <ng-template #noDeps>
            <li class="fg-grey w-600 flex space-between align-center">{{ depOrEmpl.name }}</li>
          </ng-template>
          <ng-container *ngIf="extractIfDepartment(depOrEmpl) as empls; else noDeps">
            <li class="flex space-between align-center" [ngClass]="{ 'fg-primary-900 w-700': empls.length > 0, 'fg-grey w-600': empls.length < 1 }">
                {{ depOrEmpl.name }} <orfs-link-icon icon></orfs-link-icon>
            </li>
            <ul *ngFor="let empl of empls" class="no-decoration">
              <li class="fg-grey w-600 flex space-between align-center">{{ empl.name }} <orfs-link-icon icon></orfs-link-icon></li>
            </ul>
          </ng-container>
        </ng-container>
      </ul>
    </nav>
  `
})
export class SidebarContentComponent implements OnInit {
  data = signal<ResponseDto[]>([]);
  result = computed(() => mapResponseRecursively(this.data()));

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

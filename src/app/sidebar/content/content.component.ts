import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';

import { IconDirective } from '../../icons/icon.directive';
import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';
import { mapResponseRecursively } from '../../../domain/company/mapper';
import { DepartmentDto } from '../../../domain/department/model';
import { ClientService } from '../../../domain/employee/client';
import { EmployeeDto, ResponseDto } from '../../../domain/employee/model';

@Component({
  standalone: true,
  selector: 'orfs-sidebar-content',
  imports: [
    CommonModule,
    LinkIconComponent,
    IconDirective
  ],
  templateUrl: './content.component.html'
})
export class SidebarContentComponent implements OnInit {
  private data = signal<ResponseDto[]>([]);

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

  private async getAll() {
    const data = await this.client.getAll();
    this.data.set(data);
  }
}

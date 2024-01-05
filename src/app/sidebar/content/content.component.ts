import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';

import { IconDirective } from '../../icons/icon.directive';
import { LinkIconComponent } from '../../icons/link-icon/link-icon.component';
import { mapData } from '../../../domain/company/mapper';
import { DepartmentDto } from '../../../domain/department/model';
import { EmployeeDto } from '../../../domain/employee/model';
import { ClientService } from '../../../domain/raw/client';
import { ResponseDto } from "../../../domain/raw/model";

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

  result = computed(() => mapData(this.data()));

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

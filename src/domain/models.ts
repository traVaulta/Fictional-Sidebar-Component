import { EmployeeDto } from './employee/model';
import { DepartmentDto } from './department/model';

export interface CompanyDto {
  name: string;
  items: DepartmentDto[] | EmployeeDto[];
}

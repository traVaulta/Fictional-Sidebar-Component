import { DepartmentDto } from '../department/model';
import { EmployeeDto } from '../employee/model';

export interface CompanyDto {
  name: string;
  items: DepartmentDto[] | EmployeeDto[];
}

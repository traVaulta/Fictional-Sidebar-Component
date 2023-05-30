import { EmployeeDto } from './employee/model';

export interface DepartmentDto {
  name: string;
  items: EmployeeDto[];
}
export interface CompanyDto {
  name: string;
  items: DepartmentDto[] | EmployeeDto[];
}

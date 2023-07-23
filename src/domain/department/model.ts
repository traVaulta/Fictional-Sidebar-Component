import { EmployeeDto } from '../employee/model';

export interface DepartmentDto {
  name: string;
  items: EmployeeDto[];
}

export interface ResponseDto {
  id: string;
  name: string;
}

export interface EmployeeUI {
  id: string;
  name: string;
  department?: string;
  company: string;
}
export interface EmployeeDto {
  id: string;
  name: string;
}
export interface DepartmentDto {
  name: string;
  items: EmployeeDto[];
}
export interface CompanyDto {
  name: string;
  items: DepartmentDto[] | EmployeeDto[];
}

import { EmployeeDto, ResponseDto } from '../employee/model';
import { DepartmentDto } from '../department/model';
import { CompanyDto } from './model';

export const mapData = (response: ResponseDto[]) => {
  const companies: { [k: string]: CompanyDto } = {};
  const departments: { [k: string]: DepartmentDto } = {};
  const employees: { [k: string]: EmployeeDto } = {};

  for (const item of response) {
    const segments = item.name.split('/');

    const department: DepartmentDto | undefined = segments.length < 3 ? undefined : <DepartmentDto>{ name: segments[1], items: [] };
    const company: CompanyDto | undefined = <CompanyDto>{ name: segments[0], items: [] };
    const employee: EmployeeDto | undefined = <EmployeeDto>{ name: segments.length < 3 ? segments[1] : segments[2] };

    if (!companies[company.name]) companies[company.name] = company;
    if (department && !departments[department.name]) departments[department.name] = department;
    if (!employees[employee.name]) employees[employee.name] = employee;

    let existingEmployee = employees[employee.name]!;
    let existingDepartment: DepartmentDto | undefined;
    if (department && (existingDepartment = departments[department.name])) {
      existingDepartment.items.push(existingEmployee);
    }
    let existingCompany: CompanyDto | undefined;
    if ((existingCompany = companies[company.name]) && existingDepartment) {
      const existing = <DepartmentDto[]>existingCompany.items;
      existingCompany.items = [...existing, existingDepartment];
    } else if (existingCompany) {
      const existing = <EmployeeDto[]>existingCompany.items;
      existingCompany.items = [...existing, existingEmployee];
    }
  }

  return Object.values(companies);
};

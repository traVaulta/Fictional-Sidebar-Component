import { EmployeeDto, ResponseDto } from '../employee/model';
import { DepartmentDto } from '../department/model';
import { CompanyDto } from './model';

export const mapData = (response: ResponseDto[]) => {
  const companies: CompanyDto[] = [];
  const departments: DepartmentDto[] = [];
  const employees: EmployeeDto[] = [];

  for (const item of response) {
    const segments = item.name.split('/');

    const department: DepartmentDto | undefined = segments.length < 3 ? undefined : <DepartmentDto>{ name: segments[1], items: [] };
    const company: CompanyDto | undefined = <CompanyDto>{ name: segments[0], items: [] };
    const employee: EmployeeDto | undefined = <EmployeeDto>{ name: segments.length < 3 ? segments[1] : segments[2] };

    if (!companies.find(value => value.name === company.name)) companies.push(company);
    if (department && !departments.find(value => value.name === department.name)) departments.push(department);
    if (!employees.find(value => value.name === employee.name)) employees.push(employee);

    let existingEmployee = employees.find(value => value.name === employee.name)!;
    let existingDepartment: DepartmentDto | undefined;
    if (department && (existingDepartment = departments.find(value => value.name === department.name))) {
      existingDepartment.items.push(existingEmployee);
    }
    let existingCompany: CompanyDto | undefined;
    if ((existingCompany = companies.find(value => value.name === company.name)) && existingDepartment) {
      const existing = <DepartmentDto[]>existingCompany.items;
      existingCompany.items = [...existing, existingDepartment];
    } else if (existingCompany) {
      const existing = <EmployeeDto[]>existingCompany.items;
      existingCompany.items = [...existing, existingEmployee];
    }
  }

  return companies;
};

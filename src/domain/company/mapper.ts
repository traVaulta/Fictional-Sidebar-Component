import { EmployeeDto } from '../employee/model';
import { DepartmentDto } from '../department/model';
import { ResponseDto } from "../raw/model";
import { CompanyDto } from './model';

export const mapData = (response: ResponseDto[]) => {
  const companies: CompanyDto[] = [];

  for (let i = 0; i < response.length; i++) {
    const item = response[i];
    const { id } = item;
    let [name, ...rest] = item.name.split(' / ');
    let companyId = companies.findIndex(c => c.name === name);
    if (companyId < 0) {
      companies.push({ name, items: [] });
      companyId = companies.length - 1;
    }
    [name, ...rest] = rest;
    const department = name && rest?.length ? (<DepartmentDto[]>companies[companyId].items).find(d => d.name === name) : undefined;
    if (!department && name && rest?.length) {
      (<DepartmentDto[]>companies[companyId].items).push({ name, items: [ { name: rest[0], id } ] });
    } else if (!department && name) {
      (<EmployeeDto[]>companies[companyId].items).push({ name, id });
    } else if (department && name && rest?.length && !(<EmployeeDto[]>department.items).some(e => e.id === id)) {
      (<EmployeeDto[]>department.items).push({ name, id });
    }
  }

  return companies;
};

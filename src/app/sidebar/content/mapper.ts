import { CompanyDto, EmployeeDto, EmployeeUI, ResponseDto } from './models';

export const prepEmployee = (response: ResponseDto) => {
  const segments = response.name.split('/');

  return <EmployeeUI>{
    id: response.id,
    name: segments.length === 3 ? segments[2] : segments[1],
    company: segments[0],
    department: segments.length === 3 ? segments[1] : undefined
  };
}

export const prepItems = (data: EmployeeUI[]) => {
  let companies: { [k: string]: EmployeeUI } = {};
  let deps: { [k: string]: EmployeeUI } = {};

  companies = data.reduce((acc, cur) => ({
    ...acc,
    [cur.company]: cur
  }), companies);

  deps = data.filter(e => e.department && e.department.length).reduce((acc, cur) => ({
    ...acc,
    [cur.department!]: cur
  }), companies);

  let result = <CompanyDto[]>[];

  return Object.keys(companies).map(k => (<CompanyDto>{
    name: k,
    items: []
  }));
};

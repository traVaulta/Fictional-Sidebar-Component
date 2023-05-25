import { CompanyDto, DepartmentDto, EmployeeDto, EmployeeUI, ResponseDto } from './models';

export const prepEmployee = (response: ResponseDto) => {
  const segments = response.name.split('/');

  return <EmployeeUI>{
    id: response.id,
    name: segments.length === 3 ? segments[2] : segments[1],
    company: segments[0],
    department: segments.length === 3 ? segments[1] : undefined
  };
}

export const mapUiToDto = ({ id, name }: EmployeeUI): EmployeeDto => (<EmployeeDto>{
  id,
  name
});

export const prepItems = (data: EmployeeUI[]) => {
  let deps: { [k: string]: EmployeeUI[] } = {};

  deps = data
    .filter(e => e.department && e.department.length)
    .reduce((acc, cur) => ({
      ...acc,
      [cur.department!]: cur.department! in acc ?
        [...acc[cur.department!], cur] :
        [cur]
    }), deps);

  let compDeps: { [k: string]: string[] } = {};
  compDeps = data
    .filter(e => e.department && e.department.length)
    .reduce((acc, cur) => ({
      ...acc,
      [cur.company!]: cur.company! in acc ?
        [...acc[cur.company!], cur.department!] :
        [cur.department!]
    }), compDeps);

  let compNoDeps: { [k: string]: EmployeeUI[] } = {};
  compNoDeps = data
    .filter(e => !(e.department && e.department.length))
    .reduce((acc, cur) => ({
      ...acc,
      [cur.company!]: cur.company! in acc ?
        [...acc[cur.company!], cur] :
        [cur]
    }), compNoDeps);

  let companies = Object.keys(
    data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.company]: curr.company
      }),
      <{ [_: string]: string }>{}
    )
  );

  return companies.map(companyName => (<CompanyDto>{
    name: companyName,
    items: [
      ...(companyName in compNoDeps) ?
        compNoDeps[companyName].map(mapUiToDto) :
        Object.keys(
          compDeps[companyName].reduce((acc, curr) => ({...acc, [curr]: curr}), <{ [_: string]: string }>{})
        )
          .reduce((acc, curr) => [...acc, curr], <string[]>[])
          .map(departmentName => <DepartmentDto>{
            name: departmentName,
            items: deps[departmentName].map(mapUiToDto)
          })
    ]
  }));
};

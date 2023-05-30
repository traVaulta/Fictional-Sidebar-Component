import { CompanyDto, DepartmentDto } from './models';
import { EmployeeDto, ResponseDto } from './employee/model';

export const mapResponseRecursively = (
  response: ResponseDto[],
  deps: { [k: string]: EmployeeDto[] } = {},
  companies: { [k: string]: string } = {},
  compDeps: { [k: string]: string[] } = {},
  compNoDeps: { [k: string]: EmployeeDto[] } = {}
): CompanyDto[] => {
  if (!response.length) {
    return Object.keys(companies)
      .reduce((acc, curr) => [...acc, curr], <string[]>[])
      .map(companyName => (<CompanyDto>{
        name: companyName,
        items: [
          ...(companyName in compNoDeps) ?
            compNoDeps[companyName] :
            compDeps[companyName]
              .map(departmentName => <DepartmentDto>{
                name: departmentName,
                items: deps[departmentName]
              })
        ]
      }));
  }

  const [employeeRaw, ...other] = response;
  const segments = employeeRaw.name.split('/');

  if (segments.length === 3 && segments[0] in compDeps) {
    compDeps[segments[0]].push(segments[1]);
  } else if (segments.length === 3) {
    compDeps[segments[0]] = [segments[1]];
  } else if (segments[0] in compNoDeps) {
    compNoDeps[segments[0]].push({ id: employeeRaw.id, name: segments[1]});
  } else {
    compNoDeps[segments[0]] = [{ id: employeeRaw.id, name: segments[1]}];
  }

  if (!(segments[0] in companies)) {
    companies[segments[0]] = segments[0];
  }
  if (segments.length === 3 && segments[1] in deps) {
    deps[segments[1]].push({ id: employeeRaw.id, name: segments[2]});
  } else if (segments.length === 3) {
    deps[segments[1]] = [{ id: employeeRaw.id, name: segments[2]}];
  }

  return mapResponseRecursively(
    other,
    deps,
    companies,
    compDeps,
    compNoDeps
  );
}

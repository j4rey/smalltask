import { Injectable, EventEmitter } from '@angular/core';
import { Dept } from './models/dept.model';
import { Observable, of, forkJoin } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Emp } from './models/emp.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  private _nextID = 3;
  private _departments: Dept[];

  constructor(private employeeService: EmployeeService) {
    //initial feed data
    let dept1 = new Dept(1, 'Human Resource', 'Hopkinsville');
    dept1.DepartmentHead = 1;
    let dept2 = new Dept(2, 'Finance', 'South Boston');
    dept2.DepartmentHead = 6;
    this._departments = [dept1, dept2];
  }

  /* Get all deparments */
  public GetAllDept(): Observable<any> {
    return of(
      this._departments.map((obj) => ({
        ...obj,
        ['NoOfEmps']: this.employeeService.Employees.filter(x => x.DepartmentId == obj.ID).length,
        ['depthead']: this.employeeService.Employees.find(y => y.id == obj.DepartmentHead) ? this.employeeService.Employees.find(y => y.id == obj.DepartmentHead).name : '',
        ['DepartmentHeadName']: this.GetDeparmentHeadName(obj)
      }))
    );
  }

  public GetDeparmentHeadName(dept: Dept) {
    const selectedEmployees = this.employeeService.Employees.filter((emp: Emp) => +(emp.DepartmentId) === +(dept.ID));
    return selectedEmployees ? selectedEmployees.find(x => +(x.ID) === +(dept.DepartmentHead)) ?
      selectedEmployees.find(x => +(x.ID) === +(dept.DepartmentHead)).Name : '' : '';
  }

  public GetDepartmentAndEmployeesDetails(deptID: number): Observable<[Dept,Emp[],Dept[]]> {
    let dept = of(this._departments.find(x => x.ID == deptID));
    let emps = of(this.employeeService.Employees.filter(x => x.DepartmentId === deptID));
    let depts = of(this._departments);
    return forkJoin([dept, emps, depts]);
  }

  public AddOrUpdate(newdept: Dept): Dept {
    const selecteddept = this._departments.find(x => +(x.ID) === +(newdept.ID));
    if (selecteddept) {
      selecteddept.DepartmentName = newdept.DepartmentName;
      selecteddept.DepartmentHead = newdept.DepartmentHead;
      selecteddept.Location = newdept.Location;
      return selecteddept;
    } else {
      newdept.ID = this._nextID++;
      this._departments.push(newdept);
      return newdept;
    }
  }

  public Delete(id: any): any {
    const selecteddeptIndex = this._departments.findIndex((x:Dept) => +(x.ID) === +(id));
    if(selecteddeptIndex != -1){
      this._departments.splice(selecteddeptIndex,1);
    }
    // else{
    //   console.log('no found', selecteddeptIndex);
    // }
  }
}

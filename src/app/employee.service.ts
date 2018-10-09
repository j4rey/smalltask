import { Injectable, EventEmitter } from '@angular/core';
import { Emp } from './models/emp.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  //temporary; next employee id
  private _nextID:number = 11;
  
  //initial data feed
  private employees: Emp[] = [
    new Emp(1,  'John M. Mullins',  'Male', 7286.00, 1),
    new Emp(2,  'Cynthia D. Hammond',  'Female', 2079.00, 1),
    new Emp(3,  'Debbie A. Corpuz','Female', 5857.00, 1),
    new Emp(4,  'Brian S. Murry', 'Male', 8708.00, 1),
    new Emp(5,  'Martin K. Lentz', 'Male', 6773.00, 1),
    new Emp(6,  'Mattie B. Wasson',  'Male', 7045.00, 2),
    new Emp(7,  'Alfred V. Broadwell','Male', 2751.00, 2),
    new Emp(8,  'Jesse S. Hart','Female', 7190.00, 2),
    new Emp(9,  'Karen K. Lash', 'Female', 5907.00, 2),
    new Emp(10, 'Duane S. Beck',  'Male', 8570.00, 2),
  ]

  //returns a clone of employees array
  get Employees() {
    return JSON.parse(JSON.stringify(this.employees));
  }

  //returns next employee id
  get NextID() {
    return this._nextID;
  }

  constructor() { }

  public Delete(id: any): any {
    const selectedempIndex = this.employees.findIndex((x:Emp) => +(x.ID) === +(id));
    if(selectedempIndex != -1){
      this.employees.splice(selectedempIndex,1);
    }
    // else{
    //   console.log('no found', selectedempIndex);
    // }
  }

  public AddOrUpdate(newemp: Emp): any {
    const selectedemp = this.employees.find(x=> +(x.ID)===+(newemp.ID));
    if(selectedemp){
      selectedemp.Name = newemp.Name;
      selectedemp.Gender = newemp.Gender;
      selectedemp.Salary = newemp.Salary;
      selectedemp.DepartmentId = +newemp.DepartmentId;
    }else {
      newemp.ID = this._nextID++;
      this.employees.push(newemp);
    }
  }
}

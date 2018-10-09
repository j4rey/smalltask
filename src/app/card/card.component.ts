import { Dept } from './../models/dept.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DepartmentService } from '../department.service';
import { Emp } from '../models/emp.model';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  private _deptID: number;
  private routeSubscription: Subscription = null;
  private dataSubscription: Subscription = null;
  public department: Dept;
  public employees: Emp[];
  public departments: Dept[];

  get DeparmentHeadName() {
    return this.departmentService.GetDeparmentHeadName(this.department);
  }

  constructor(route: ActivatedRoute, private departmentService: DepartmentService,
    private employeeService: EmployeeService, private fb: FormBuilder) {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
    this.routeSubscription = route.paramMap.subscribe((x: ParamMap) => {
      this._deptID = +x.get("id");
    })
  }

  ngOnInit() {
    this.GetDepartmentAndEmployeesDetails();
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
      this.routeSubscription = null;
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.dataSubscription = null;
    }
  }

  private GetDepartmentAndEmployeesDetails() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.dataSubscription = null;
    }
    this.dataSubscription = this.departmentService.GetDepartmentAndEmployeesDetails(this._deptID).subscribe(d => {
      this.department = d[0];
      this.employees = d[1];
      this.departments = d[2];
    })
  }

  private _backupEmp: Emp; //save employee details in case of cancel clicked
  public toggle(selectedEmp: Emp) {
    if (selectedEmp.edit == true) { //cancel clicked, reset employee data
      selectedEmp.Name = this._backupEmp.Name;
      selectedEmp.Salary = this._backupEmp.Salary;
      selectedEmp.Gender = this._backupEmp.Gender;
      selectedEmp.DepartmentId = this._backupEmp.DepartmentId;
    }
    else {
      //save employee details as backup
      this._backupEmp = JSON.parse(JSON.stringify(selectedEmp));
    }
    selectedEmp.edit = !selectedEmp.edit;
  }

  public Delete(emp: Emp) {
    let c = confirm(`Are you sure you want to delete ${emp.Name}?`);
    if (c) {
      this.employeeService.Delete(emp.ID);
      this.GetDepartmentAndEmployeesDetails();
    }
  }

  public OnSubmitClicked(data: Emp) {
    let empForm = this.fb.group({
      ID: [data.ID, Validators.required],
      Name: [data.Name, Validators.required],
      Gender: [data.Gender, Validators.required],
      Salary: [data.Salary, Validators.compose([Validators.required, Validators.min(0), Validators.minLength(1)])],
      DepartmentId: [data.DepartmentId, Validators.required]
    })
    if (empForm.valid) {
      this.employeeService.AddOrUpdate(empForm.value);
      this.GetDepartmentAndEmployeesDetails();
    } else{
      alert('Invalid Employee details');
    }
  }

  public GetDeparmentNameById(deptId: number){
    const tempdept = this.departments.find(d=>d.ID===deptId);
    return tempdept?tempdept.DepartmentName:'';
  }

  /* New Employee */
  public newEmp: Emp = new Emp(this.employeeService.NextID, '', '', 0.00, 0);
  public OnAdd() {
    let empForm: FormGroup = this.fb.group({
      ID: [+this.newEmp.ID, Validators.required],
      Name: [this.newEmp.Name, Validators.required],
      Gender: [this.newEmp.Gender, Validators.required],
      Salary: [+this.newEmp.Salary, Validators.compose([Validators.required, Validators.min(0), Validators.minLength(1)])],
      DepartmentId: [+this.newEmp.DepartmentId, Validators.required]
    })
    if (empForm.valid) {
      this.employeeService.AddOrUpdate(empForm.value);
      this.GetDepartmentAndEmployeesDetails();
      this.OnReset();
    }
    else{
      alert('Invalid Employee details');
    }
  }
  
  public OnReset() {
    this.newEmp = new Emp(this.employeeService.NextID, '', '', 0.00, 0);
  }
}

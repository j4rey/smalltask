import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Dept } from '../models/dept.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Emp } from '../models/emp.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent {

  public department: Dept;
  public employees: Emp[] = [];

  constructor(private deptService: DepartmentService, public activeModal: NgbActiveModal
  ) {
    this.department = new Dept(0, '', '')
  }

  public SetSelectedDepartment(deptid: number) {
    this.deptService.GetDepartmentAndEmployeesDetails(deptid).subscribe(d => {
      if (d && d[0]) {
        this.department = d[0]
        this.employees = d[1];
      } else {
        this.department = new Dept(0, '', '')
        this.employees = [];
      }
    })
  }

  public OnSubmitClicked(form: NgForm) {
    if (form.valid) {
      const returnDept = this.deptService.AddOrUpdate(form.value);
      this.activeModal.close(returnDept)
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dept } from './../models/dept.model';
import { DepartmentService } from '../department.service';
import { AddEditDepartmentComponent } from '../add-edit-department/add-edit-department.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public departments = [];

  constructor(private deptService: DepartmentService, private modalService: NgbModal) { }

  ngOnInit() {
    this.GetDepartments();
  }

  private GetDepartments() {
    this.deptService.GetAllDept().subscribe(x => this.departments = x);
  }

  public ShowDialog(deptid: number = 0) { //0 for new department
    const modal = this.modalService.open(AddEditDepartmentComponent);
    modal.componentInstance.SetSelectedDepartment(deptid)
    modal.result.then(val => {
      this.GetDepartments();
    }).catch(rej => console.log('catch', rej));
  }

  public Delete(dept: Dept) {
    let c = confirm(`Are you sure you want to delete ${dept.DepartmentName} and all its employees?`);
    if (c) {
      this.deptService.Delete(dept.ID);
      this.GetDepartments();
    }
  }
}

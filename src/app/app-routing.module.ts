import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
// import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';

const routes: Routes = [
  {path: '', component: ListComponent, pathMatch:'full'},
  {path: ':id', component: CardComponent},
  // {path: 'department/:id', component: AddEditDepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

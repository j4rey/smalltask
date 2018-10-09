import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { NewCustomInputComponent } from './controls/new-custom-input/new-custom-input.component';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component'
import { GenderDropdownComponent } from './controls/gender-dropdown/gender-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    NewCustomInputComponent,
    GenderDropdownComponent,
    AddEditDepartmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddEditDepartmentComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  declarations: [FormComponent, ViewComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    DropdownMenuComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormModule {}

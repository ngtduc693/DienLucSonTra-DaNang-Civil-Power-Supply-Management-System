import {
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";
import { NgModule } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import {
  TablesRoutingModule,
  routedComponents,
} from "./timkiem-routing.module";
import { FsIconComponent } from "./tree-grid/tree-grid.component";
import { FormsComponent } from "./../forms/forms.component";
import { FormInputsComponent } from "./../forms/form-inputs/form-inputs.component";
import { FormLayoutsComponent } from "./../forms/form-layouts/form-layouts.component";
import { DatepickerComponent } from "./../forms/datepicker/datepicker.component";
import { ButtonsComponent } from "./../forms/buttons/buttons.component";
import { FormsModule as ngFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
  ],
})
export class TimKiemKhachHangModule {}

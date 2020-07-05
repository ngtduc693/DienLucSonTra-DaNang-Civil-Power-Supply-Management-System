import {
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbToastrModule,
  NbWindowModule
} from "@nebular/theme";
import { AngularFileUploaderModule } from "angular-file-uploader";


import { NgModule, ChangeDetectionStrategy } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbAlertModule,
  NbAccordionModule,
  NbSpinnerModule ,
  
} from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import {
  TablesRoutingModule,
  routedComponents,
} from "./timkiem-routing.module";
//import { FsIconComponent } from "./thongtintrenmaychu/timthongtintrenmaychu.component";
import { FormsComponent } from "./../forms/forms.component";
import { FormInputsComponent } from "./../forms/form-inputs/form-inputs.component";
import { FormLayoutsComponent } from "./../forms/form-layouts/form-layouts.component";
import { DatepickerComponent } from "./../forms/datepicker/datepicker.component";
import { ButtonsComponent } from "./../forms/buttons/buttons.component";
import { FormsModule as ngFormsModule } from "@angular/forms";
import { ThongTinTrenMayChuComponent } from './thongtintrenmaychu/thongtintrenmaychu.component';
import { LaythongtinkhachangComponent } from './laythongtinkhachang/laythongtinkhachang.component';

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
    NbAlertModule,
    NbToastrModule.forRoot(),
    NbAccordionModule,
    AngularFileUploaderModule,
    NbSpinnerModule,
    NbWindowModule 
  ],
  declarations: [
    ...routedComponents,
    ThongTinTrenMayChuComponent,
    FormsComponent,
    ButtonsComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    DatepickerComponent,
    LaythongtinkhachangComponent,
    
  ],
})
export class TimKiemKhachHangModule {}

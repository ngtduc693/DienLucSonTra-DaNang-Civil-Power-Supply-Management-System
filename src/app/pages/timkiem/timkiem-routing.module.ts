import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './timkiem.component';
import { TimKiemKhachHangComponent } from './khachhang/timkiemkhachhang.component';
import { ThongTinTrenMayChuComponent } from './thongtintrenmaychu/thongtintrenmaychu.component';
import { AuthService } from '../../auth/auth-service.service';
const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'khachhang',
      component: TimKiemKhachHangComponent,
      
      canActivate: [AuthService]
    },
    {
      path: 'thongtintrenmaychu',
      component: ThongTinTrenMayChuComponent,
      
        canActivate: [AuthService]
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  TimKiemKhachHangComponent,
  ThongTinTrenMayChuComponent,
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './timkiem.component';
import { TimKiemKhachHangComponent } from './khachhang/timkiemkhachhang.component';
import { ThongTinTrenMayChuComponent } from './thongtintrenmaychu/thongtintrenmaychu.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'khachhang',
      component: TimKiemKhachHangComponent,
    },
    {
      path: 'thongtintrenmaychu',
      component: ThongTinTrenMayChuComponent,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './timkiem.component';
import { TimKiemKhachHangComponent } from './khachhang/timkiemkhachhang.component';
import { ThongTinTrenMayChuComponent } from './thongtintrenmaychu/thongtintrenmaychu.component';
import { AuthService } from '../../auth/auth-service.service';
import { LaythongtinkhachangComponent } from './laythongtinkhachang/laythongtinkhachang.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { BaocaoComponent } from './baocao/baocao.component';
import { DangkylapdatdienComponent } from './dangkylapdatdien/dangkylapdatdien.component';
import { DanhSachDangKyDienComponent } from './danh-sach-dang-ky-dien/danh-sach-dang-ky-dien.component';

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
      path: 'danhmuc',
      component: DanhmucComponent,

      canActivate: [AuthService]
    },
    {
      path: 'thongtintrenmaychu',
      component: ThongTinTrenMayChuComponent,

      canActivate: [AuthService]
    },
    {
      path: 'laythongtinkhachang/:makhachhang',
      component: LaythongtinkhachangComponent,

      canActivate: [AuthService]
    },
    {
      path: 'baocao',
      component: BaocaoComponent,

      canActivate: [AuthService]
    },
    {
      path: 'dangkylapdatdien/:makhachhang',
      component: DangkylapdatdienComponent,
      canActivate: [AuthService]
    },
    {
      path: 'danhsachdangkylapdatdien',
      component: DanhSachDangKyDienComponent,
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
  LaythongtinkhachangComponent,
  DanhmucComponent,
  BaocaoComponent,
];

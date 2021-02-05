import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../shared/api.service';
import { Khachhang, KhachHangModel } from '../../../shared/khachhang';

@Component({
  selector: 'ngx-danh-sach-dang-ky-dien',
  templateUrl: './danh-sach-dang-ky-dien.component.html',
  styleUrls: ['./danh-sach-dang-ky-dien.component.scss']
})
export class DanhSachDangKyDienComponent implements OnInit {



  luaChonKhachHang: Khachhang;
  ngOnInit() {
  }

  settingsDanhSachKhachHang = {

    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage: 20,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: 'Thao tác',
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      MA_KHANG: {
        title: 'Mã khách hàng',
        type: 'string',
        filter: true,
        sort: true,
      },
      NGUOITAO: {
        title: 'Người tạo',
        type: 'string',
        filter: true,
        sort: true,
      },
      THOIDIEMTAO: {
        title: 'Thời điểm tạo',
        type: 'string',
        filter: true,
        sort: true,
      },
      CHITIET: {
        title: 'Chi tiết',
        type: 'html'
      },
    },
  };

  trangThaiLayDuLieu: string;
  duLieuTrenFireBase: any;
  duLieuKHTrenServer: KhachHangModel[] = [];
  sourceDanhSachKhachHang: LocalDataSource = new LocalDataSource();
  constructor(private service: SmartTableData,
     private apiService: ApiService,
     private router: Router) {

    this.LoadDuLieu();

  }
  onSelectConfirm(event): void {
    this.luaChonKhachHang = event.data;    
  }
  async LoadDuLieu() {

    let duLieuTam:KhachHangModel[] = [];
    await this.apiService.layDuLieuDangKyDienTuMayChu().then(result => {
      this.duLieuTrenFireBase = result;
    }).then(res=>{
      this.duLieuTrenFireBase.forEach(async element => {
        const chiTiet = '<a target="_black" href="/pages/timkiem/dangkylapdatdien/' + element.BUOC_1.MA_KHANG + '"><i class="fa fa-search-plus" aria-hidden="true"></i></a>';
        const khachHang = new KhachHangModel(element.BUOC_1.MA_KHANG,element.BUOC_1.NGAY_TAO,element.BUOC_1.TEN_TO_CHUC_CA_NHAN);
        khachHang.CHITIET=chiTiet;
        duLieuTam.push(khachHang);
      });
      this.duLieuKHTrenServer = duLieuTam;
      console.log(this.duLieuKHTrenServer);
    })
   
  }
  addNewForm(){
    this.router.navigateByUrl('/pages/timkiem/dangkylapdatdien');
  }

}

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem , DuLieuKhachHang} from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Khachhang, KhachhangSearchModel , KhachHangMDSDDModelResult, KhachHangCSSDDModelResult, KhachHangModelResult} from '../../../shared/khachhang';
import {ApiService} from '../../../shared/api.service';
import { take } from 'rxjs/operators';
import { AnyARecord } from 'dns';
@Component({
  selector: 'ngx-thongtintrenmaychu',
  templateUrl: './/thongtintrenmaychu.component.html',
  styleUrls: ['.//thongtintrenmaychu.component.scss'],
})
export class ThongTinTrenMayChuComponent {
  luaChonTimKiem :TimKiem ;
  luaChonKhachHang: Khachhang;
  ketQuaTimKiem: Khachhang[];
  ketQuaTimKiem_danhSachKhachHang : Khachhang[] = [];
  ngOnInit(){
  }
  settingsTyLeGiaBanDien = {
    
    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage : 5,
    },
    actions:{
      add:false,
      edit:false,
      delete:false,
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
      MUC_DICH_SU_DUNG_DIEN: {
        title: 'Mục đích sử dụng điện',
        type: 'string',
        filter:false,
      },
      TY_LE: {
        title: 'Tỷ lệ % hoặc kWh',
        type: 'string',
        filter:false,
      },
      GIO_BINH_THUONG: {
        title: 'Giờ B.thường',
        type: 'string',
        filter:false,
      },
      GIO_CAO_DIEM: {
        title: 'Giờ cao điểm',
        type: 'string',
        filter:false,
      },
      GIO_THAP_DIEM: {
        title: 'Giờ thấp điểm',
        type: 'string',
        filter:false,
      },
    },
  };

  settingsCongSuatSuDungDien = {
    
    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage : 5,
    },
    actions:{
      add:false,
      edit:false,
      delete:false,
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
      MUC_DICH_SU_DUNG: {
        title: 'Mục đích sử dụng',
        type: 'string',
        filter:false,
      },
      TEN_THIET_BI: {
        title: 'Tên thiết bị',
        type: 'string',
        filter:false,
      },
      DIEN_AP_SU_DUNG: {
        title: 'Điện áp sử dụng (V)	',
        type: 'string',
        filter:false,
      },
      CONG_SUAT: {
        title: 'Công suất (kW)	',
        type: 'number',
        filter:false,
      },
      SO_LUONG: {
        title: 'Số lượng	',
        type: 'number',
        filter:false,
      },
      TONG_SO: {
        title: 'Tổng số',
        type: 'number',
        filter:false,
      },
    },
  };
  trangThaiLayDuLieu : string;
  sourceCongSuatSuDungDien : LocalDataSource = new LocalDataSource();
  sourceTyLeGiaBanDien : LocalDataSource = new LocalDataSource();
  duLieuTrenFireBase: any;
  duLieuMDSHKHTrenServer: KhachHangModelResult[] = [];
  constructor(private service: SmartTableData, private apiService: ApiService) {
    
    this.LoadDuLieu();
    
  }
  
  async LoadDuLieu()
  {
    this.duLieuMDSHKHTrenServer= [];            
    let duLieuTam_TyLe = [];
    let duLieuTam_CongSuat = [];
     await this.apiService.layDuLieuTuMayChu().then(result => {
       console.log(result);
        this.duLieuTrenFireBase = result;
     });
     this.duLieuTrenFireBase.forEach(element => {
      duLieuTam_TyLe = [];
      duLieuTam_CongSuat = []
       let MKH = element.MKH;
       let TLSDD = new KhachHangMDSDDModelResult(element.DULIEUCHITIET.TyLeGiaBanDien[0].MUC_DICH_SU_DUNG_DIEN,
        element.DULIEUCHITIET.TyLeGiaBanDien[0].TY_LE,
        element.DULIEUCHITIET.TyLeGiaBanDien[0].GIO_BINH_THUONG,
        element.DULIEUCHITIET.TyLeGiaBanDien[0].GIO_CAO_DIEM,
        element.DULIEUCHITIET.TyLeGiaBanDien[0].GIO_THAP_DIEM );
        let CSDD = new KhachHangCSSDDModelResult(
          element.DULIEUCHITIET.CongSuatSD[0].MUC_DICH_SU_DUNG,
          element.DULIEUCHITIET.CongSuatSD[0].TEN_THIET_BI,
          element.DULIEUCHITIET.CongSuatSD[0].DIEN_AP_SU_DUNG,
          element.DULIEUCHITIET.CongSuatSD[0].CONG_SUAT,
          element.DULIEUCHITIET.CongSuatSD[0].SO_LUONG,
          element.DULIEUCHITIET.CongSuatSD[0].TONG_SO,
        )
        duLieuTam_TyLe.push(TLSDD.layDuLieu());
        duLieuTam_CongSuat.push(CSDD.layDuLieu());
        this.duLieuMDSHKHTrenServer.push(new KhachHangModelResult(MKH,duLieuTam_TyLe,duLieuTam_CongSuat));
     });
     console.log(this.duLieuMDSHKHTrenServer);
  }
}

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem, DuLieuKhachHang } from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Khachhang, KhachhangSearchModel, KhachHangMDSDDModelResult, KhachHangCSSDDModelResult, KhachHangModelResult } from '../../../shared/khachhang';
import { ApiService } from '../../../shared/api.service';
import { take } from 'rxjs/operators';
import { AnyARecord } from 'dns';

@Component({
  selector: 'ngx-thongtintrenmaychu',
  templateUrl: './/thongtintrenmaychu.component.html',
  styleUrls: ['.//thongtintrenmaychu.component.scss'],
})
export class ThongTinTrenMayChuComponent {
  danhSachAnh: string[] = [];
  luaChonTimKiem: TimKiem;
  luaChonKhachHang: Khachhang;
  ketQuaTimKiem: Khachhang[];
  ketQuaTimKiem_danhSachKhachHang: Khachhang[] = [];
  ngOnInit() {
  }
  settingsTyLeGiaBanDien = {

    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage: 5,
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
      MUC_DICH_SU_DUNG_DIEN: {
        title: 'Mục đích sử dụng điện',
        type: 'string',
        filter: false,
      },
      TY_LE: {
        title: 'Tỷ lệ % hoặc kWh',
        type: 'string',
        filter: false,
      },
      GIO_BINH_THUONG: {
        title: 'Giờ B.thường',
        type: 'string',
        filter: false,
      },
      GIO_CAO_DIEM: {
        title: 'Giờ cao điểm',
        type: 'string',
        filter: false,
      },
      GIO_THAP_DIEM: {
        title: 'Giờ thấp điểm',
        type: 'string',
        filter: false,
      },
    },
  };

  settingsCongSuatSuDungDien = {

    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage: 5,
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
      MUC_DICH_SU_DUNG: {
        title: 'Mục đích sử dụng',
        type: 'string',
        filter: false,
      },
      TEN_THIET_BI: {
        title: 'Tên thiết bị',
        type: 'string',
        filter: false,
      },
      DIEN_AP_SU_DUNG: {
        title: 'Điện áp sử dụng (V)	',
        type: 'string',
        filter: false,
      },
      CONG_SUAT: {
        title: 'Công suất (kW)	',
        type: 'number',
        filter: false,
      },
      SO_LUONG: {
        title: 'Số lượng	',
        type: 'number',
        filter: false,
      },
      TONG_SO: {
        title: 'Tổng số',
        type: 'number',
        filter: false,
      },
    },
  };
  trangThaiLayDuLieu: string;
  sourceCongSuatSuDungDien: LocalDataSource = new LocalDataSource();
  sourceTyLeGiaBanDien: LocalDataSource = new LocalDataSource();
  duLieuTrenFireBase: any;
  duLieuMDSHKHTrenServer: KhachHangModelResult[] = [];
  constructor(private service: SmartTableData, private apiService: ApiService) {

    this.LoadDuLieu();

  }

  async LoadDuLieu() {

    this.duLieuMDSHKHTrenServer = [];
    let duLieuTam_TyLe = [];
    let duLieuTam_CongSuat = [];
    await this.apiService.layDuLieuTuMayChu().then(result => {
      console.log(result);
      this.duLieuTrenFireBase = result;
    });
    this.duLieuTrenFireBase.forEach(async element => {
      duLieuTam_TyLe = [];
      duLieuTam_CongSuat = [];
      let TLSDD: any;
      let CSDD: any;
      let MKH = element.MKH;
      element.DULIEUCHITIET.TyLeGiaBanDien.forEach(
        element => {
          TLSDD = new KhachHangMDSDDModelResult(element.MUC_DICH_SU_DUNG_DIEN,
            element.TY_LE,
            element.GIO_BINH_THUONG,
            element.GIO_CAO_DIEM,
            element.GIO_THAP_DIEM);
          duLieuTam_TyLe.push(TLSDD.layDuLieu());
        }
      );
      element.DULIEUCHITIET.CongSuatSD.forEach(
        element => {

          CSDD = new KhachHangCSSDDModelResult(
            element.MUC_DICH_SU_DUNG,
            element.TEN_THIET_BI,
            element.DIEN_AP_SU_DUNG,
            element.CONG_SUAT,
            element.SO_LUONG,
            element.TONG_SO,

          );
          duLieuTam_CongSuat.push(CSDD.layDuLieu());
        });

      await this.apiService.layDuLieuAnhTuMayChu(MKH).then(async res => {
        var listOfFiles = res.items.toString().split(',');
        for (let item of listOfFiles) {
          var point = item;
          item = item.replace('gs://qlkh-cpc.appspot.com/', '');
          if (item != undefined && item != '') {
            console.log('Tep anh bi ma hoa: ' + item);
            await this.apiService.storage.ref(item).getDownloadURL().pipe(take(1)).toPromise().then(res => {
              console.log('Thong tin anh: ' + res);
              this.danhSachAnh.push(res);
              
            }).then(res => {
              if (point===listOfFiles[listOfFiles.length-1]){
                console.log('Du lieu anh cua khach hang: ' + this.danhSachAnh);
                this.duLieuMDSHKHTrenServer.push(new KhachHangModelResult(MKH, duLieuTam_TyLe, duLieuTam_CongSuat, this.danhSachAnh));
                this.danhSachAnh = [];
              }
            });
          }
          else{
            this.duLieuMDSHKHTrenServer.push(new KhachHangModelResult(MKH, duLieuTam_TyLe, duLieuTam_CongSuat, undefined));
                this.danhSachAnh = [];
          }
          
        }
      });


     
    });
    console.log(this.duLieuMDSHKHTrenServer);
  }
}

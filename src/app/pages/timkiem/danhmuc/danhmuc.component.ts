import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { TimKiem, DuLieuKhachHang } from "../timkiem";
import { SmartTableData } from "../../../@core/data/smart-table";
import { Khachhang, KhachhangSearchModel, KhachHangModelResult, KhachHangMDSDDModelResult, DanhMucCongSuatModelResult, DanhMucMucDichModelResult, DanhMucModelResult } from "../../../shared/khachhang";
import { ApiService } from "../../../shared/api.service";
import { take, finalize } from "rxjs/operators";
import { AnyARecord } from "dns";
import { NbToastrService } from "@nebular/theme";
import { AuthService } from '../../../auth/auth-service.service';
import {
  CapDienNhomDichVu,
  LoaiNhomDichVu,
} from "../../../shared/capdiennhomdichvu";
import { Observable } from 'rxjs';
import { getLocaleDateTimeFormat } from '@angular/common';
@Component({
  selector: 'ngx-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.scss']
})
export class DanhmucComponent {

  tinhTrangTimKiem:boolean = false;
  chonNhomDichVu: string;
  tyLePhanTramHoacKwh: string;
  luaChonTimKiem: TimKiem;
  luaChonKhachHang: Khachhang;
  ketQuaTimKiem: Khachhang[];
  ketQuaTimKiem_danhSachKhachHang: Khachhang[] = [];
  ngOnInit() {}
  settingsTyLeGiaBanDien = {
    noDataMessage: "Chưa có dữ liệu",
    pager: {
      perPage: 5,
    },
    actions: {
      add: true,
      edit: true,
      delete: true,
      columnTitle: "Thao tác",
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
        title: "Mục đích sử dụng điện",
        type: "string",
        filter: false,
      },
      GIO_BINH_THUONG: {
        title: "Giờ B.thường",
        type: "number",
        filter: false,
      },
      GIO_CAO_DIEM: {
        title: "Giờ cao điểm",
        type: "number",
        filter: false,
      },
      GIO_THAP_DIEM: {
        title: "Giờ thấp điểm",
        type: "number",
        filter: false,
      },
    },
  };

  settingsCongSuatSuDungDien = {
    noDataMessage: "Chưa có dữ liệu",
    pager: {
      perPage: 5,
    },
    actions: {
      add: true,
      edit: true,
      delete: true,
      columnTitle: "Thao tác",
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
      TEN_THIET_BI: {
        title: "Tên thiết bị",
        type: "string",
        filter: false,
      },
      CONG_SUAT: {
        title: "Công suất (kW)	",
        type: "number",
        filter: false,
      },
    },
  };


  
  trangThaiCapNhatDuLieu: string;
  danhSachNhomDichVu: LoaiNhomDichVu[];
  source: LocalDataSource = new LocalDataSource();
  sourceThongTinDiemDo: LocalDataSource = new LocalDataSource();
  sourceCongSuatSuDungDien: LocalDataSource = new LocalDataSource();
  sourceTyLeGiaBanDien: LocalDataSource = new LocalDataSource();
  constructor(
    private service: SmartTableData,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private userLogin: AuthService,
  ) {
    this.danhSachNhomDichVu = CapDienNhomDichVu.layDanhSachNhomDichVu();
    this.LoadDuLieu();

  }
  
 
  dienNhanhTyLeGiaBanDien() {
    if (this.chonNhomDichVu == undefined) {
      this.showToast("top-right", "warning", "Chọn danh sách dịch vụ trước");
    } else if (this.tyLePhanTramHoacKwh == undefined) {
      this.showToast("top-right", "warning", "Bạn chưa nhập tỷ lệ % hoặc kWh");
    } else {
      console.log('Nhom dich vu: ');
      console.log(this.chonNhomDichVu);
      let thongTinDichVu = CapDienNhomDichVu.layNhomDichVu(
        this.chonNhomDichVu,
        this.tyLePhanTramHoacKwh
      );
      let item = {
        MUC_DICH_SU_DUNG_DIEN: thongTinDichVu.TenDichVu,
        GIO_BINH_THUONG: thongTinDichVu.GioBinhThuong,
        GIO_CAO_DIEM: thongTinDichVu.GioCaoDiem,
        GIO_THAP_DIEM: thongTinDichVu.GioThapDiem,
      };
      this.sourceTyLeGiaBanDien.add(item);
      this.sourceTyLeGiaBanDien.refresh();
      console.log(item);
    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Chắc chắn xóa?")) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onLuuDuLieuClicked() {
    let congSuatSDD: string[];
    let tyLeGBD: string[];
    this.sourceTyLeGiaBanDien
      .getAll()
      .then((data) => {
        tyLeGBD = data;
      })
      .then(() => {
        //console.log(tyLeGBD);
        this.sourceCongSuatSuDungDien
          .getAll()
          .then((data) => {
            congSuatSDD = data;
          })
          .then(() => {
            //console.log(congSuatSDD);
            let duLieuTaiLen: DuLieuKhachHang = {
              MKH: 'APP',
              DULIEUCHITIET: {
                CongSuatSD: congSuatSDD,
                TyLeGiaBanDien: tyLeGBD,
              },
              NTL: this.userLogin.layUserDaDangNhap(),
              THOIDIEMTAO: new Date().toLocaleDateString(),
            };
            console.log('Du lieu tai len: ' + duLieuTaiLen);
            this.apiService
              .luuDuLieuDanhMucLenMayChu(JSON.stringify(duLieuTaiLen))
              .then(
                (res) => {
                  //this.trangThaiCapNhatDuLieu = 'success'
                  this.showToast(
                    "top-right",
                    "success",
                    "Lưu dữ liệu thành công"
                  );
                },
                (err) => {
                  this.showToast("top-right", "warning", "Lỗi khi lưu dữ liệu");
                }
              );
          });
      });
  }
  private index: number = 0;
  showToast(position, status, message) {
    this.index += 1;
    this.toastrService.show(message || status, `Thông báo số ${this.index}`, {
      position,
      status,
    });
  }
  onSelectConfirm(event): void {
    this.luaChonKhachHang = event.data;
  }
  duLieuTrenFireBase: any;
  duLieuDanhMucTrenServer: KhachHangModelResult[] = [];
  //#region Upload File
  async LoadDuLieu() {
    this.duLieuDanhMucTrenServer = [];
    let ketQuaTraVeTuServer = [];
    let duLieuTam_TyLe = [];
    let duLieuTam_CongSuat = [];
    await this.apiService.layDuLieuDanhMucTuMayChu('APP').then(result => {
      console.log(result);
      ketQuaTraVeTuServer.push(result);
      this.duLieuTrenFireBase = ketQuaTraVeTuServer;
    });
    this.duLieuTrenFireBase.forEach(async element => {
      duLieuTam_TyLe = [];
      duLieuTam_CongSuat = [];
      let TLSDD: any;
      let CSDD: any;
      let MKH = 'APP';
      element.DULIEUCHITIET.TyLeGiaBanDien.forEach(
        element => {
          TLSDD = new DanhMucMucDichModelResult(element.MUC_DICH_SU_DUNG_DIEN,            
            element.GIO_BINH_THUONG,
            element.GIO_CAO_DIEM,
            element.GIO_THAP_DIEM);
          duLieuTam_TyLe.push(TLSDD.layDuLieu());
        }
      );
      element.DULIEUCHITIET.CongSuatSD.forEach(
        element => {

          CSDD = new DanhMucCongSuatModelResult(
            element.TEN_THIET_BI,
            element.DIEN_AP_SU_DUNG,
            element.CONG_SUAT

          );
          duLieuTam_CongSuat.push(CSDD.layDuLieu());
        });
        this.sourceCongSuatSuDungDien = new LocalDataSource(duLieuTam_CongSuat);
        this.sourceTyLeGiaBanDien = new LocalDataSource(duLieuTam_TyLe);
        await this.duLieuDanhMucTrenServer.push(new DanhMucModelResult(MKH, duLieuTam_TyLe, duLieuTam_CongSuat));

     

     
    });
    console.log(this.duLieuDanhMucTrenServer);
  }
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  downloadURLList: string[] = [];
  upload(event) {
    this.downloadURLList = [];
    for(let file of event.target.files){
      const id = Math.random().toString(36).substring(2);
      var path = 'uploads/' + this.luaChonKhachHang.MA_KHANG + '/';
      this.apiService.ref = this.apiService.storage.ref(path + id);
      this.apiService.task = this.apiService.ref.put(file);
      this.uploadProgress = this.apiService.task.percentageChanges();
      this.apiService.task.snapshotChanges().pipe(
        
        finalize(() => {
          console.log(file);
          this.downloadURL = this.apiService.storage.ref(path + id).getDownloadURL();
        }
         ))
    .subscribe();
    
    }
  }
}

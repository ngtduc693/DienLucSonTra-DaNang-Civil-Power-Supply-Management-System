import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { TimKiem, DuLieuKhachHang } from "../timkiem";
import { SmartTableData } from "../../../@core/data/smart-table";
import { Khachhang, KhachhangSearchModel, DanhMucMucDichModelResult, DanhMucCongSuatModelResult, DanhMucModelResult } from "../../../shared/khachhang";
import { ApiService } from "../../../shared/api.service";
import { take, finalize, first, takeUntil } from "rxjs/operators";
import { AnyARecord } from "dns";
import { NbToastrService } from "@nebular/theme";
import { AuthService } from '../../../auth/auth-service.service';
import {
  CapDienNhomDichVu,
  LoaiNhomDichVu,
} from "../../../shared/capdiennhomdichvu";
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { getLocaleDateTimeFormat } from '@angular/common';
import { stringify } from 'querystring';
@Component({
  selector: "ngx-smart-table",
  templateUrl: ".//timkiemkhachhang.component.html",
  styleUrls: [".//timkiemkhachhang.component.scss"],
})
export class TimKiemKhachHangComponent {
  tinhTrangTimKiem:boolean = false;
  chonNhomDichVu: string;
  tyLePhanTramHoacKwh: string;
  luaChonTimKiem: TimKiem;
  luaChonKhachHang: Khachhang;
  ketQuaTimKiem: Khachhang[];
  ketQuaTimKiem_danhSachKhachHang: Khachhang[] = [];
  duLieuDanhMucTrenServer: any[];
  duLieuTrenFireBase: any[];
  duLieuTyLe: Subject<any[]>;
  duLieuCongSuat: Subject<any[]>;
  duLieuTyLeAfterFetched: any[];
  duLieuCongSuatAfterFetched: any[];
  chonNhomThietBi: any;
  chonNhomMucDich: any;
  chuoiGia: string;
  ngOnInit() {
    this.LoadDuLieu();
    this.danhSachNhomDichVu = CapDienNhomDichVu.layDanhSachNhomDichVu();
    this.duLieuCongSuat = new Subject<any[]>();
    this.duLieuTyLe  = new Subject<any[]>();
    this.duLieuTyLe.pipe(take(1)).subscribe(result => {
      this.duLieuTyLeAfterFetched = result;
      this.settingsTyLeGiaBanDien.columns.MUC_DICH_SU_DUNG_DIEN.editor.config.list = this.duLieuTyLeAfterFetched;     
      this.settingsTyLeGiaBanDien  = Object.assign({},this.settingsTyLeGiaBanDien);
      console.log('1. Du lieu ty le: ');
      console.log(this.duLieuTyLeAfterFetched );
    });
    this.duLieuCongSuat.pipe(take(1)).subscribe(result => {
      this.duLieuCongSuatAfterFetched= result; 
      this.settingsCongSuatSuDungDien.columns.TEN_THIET_BI.editor.config.list = this.duLieuCongSuatAfterFetched ; 
      
      this.settingsCongSuatSuDungDien = Object.assign({},this.settingsCongSuatSuDungDien);
     
     
      console.log('2. Du lieu cong suat: ');
      console.log(this.duLieuCongSuatAfterFetched );
   }) ;
  }
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
        type: "html",
        editor: {
          type: 'list', // Used to set dropdown list from database. 
          config: {           
            
            list: this.duLieuTyLeAfterFetched
          },
        },
      },
      TY_LE: {
        title: "Tỷ lệ % hoặc kWh",
        type: "string",
        filter: false,
      },
      GIO_BINH_THUONG: {
        title: "Giờ B.thường",
        type: "number",
        filter: false,
        editable:false,
        addable: false
      },
      GIO_CAO_DIEM: {
        title: "Giờ cao điểm",
        type: "number",
        filter: false,
        editable:false,
        addable: false
      },
      GIO_THAP_DIEM: {
        title: "Giờ thấp điểm",
        type: "number",
        filter: false,
        editable:false,
        addable: false
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
      MUC_DICH_SU_DUNG: {
        title: "Mục đích sử dụng",
        type: "html",
        editor: {
          type: 'list', // Used to set dropdown list from database. 
          config: {
            list: [
              { value: 'Kinh doanh', title: 'Kinh doanh' },
              { value: 'Sinh hoạt', title: 'Sinh hoạt' },
              { value: 'Sản xuất', title: 'Sản xuất' },
              { value: 'Chiếu sáng', title: 'Chiếu sáng' },
              { value: 'Cơ quan', title: 'Cơ quan' }
            ],
          },
        },
        filter: false
      },
      TEN_THIET_BI: {
        title: "Tên thiết bị",
        type: "html",
        editor: {
          type: 'list', // Used to set dropdown list from database. 
          config: {           
            
            list: this.duLieuCongSuatAfterFetched
          },
        },
        filter: false,
      },
      SO_LUONG: {
        title: "Số lượng	",
        type: "number",
        
        filter: false,
      },
      CONG_SUAT: {
        title: "Công suất (kW)	",
        type: "number",
        filter: false,
        editable: false,
        addable: false,
      },
      HE_SO: {
        title: "Hệ số	",
        type: "number",
        filter: false,
      },
      SO_H_SU_DUNG: {
        title: "Số giờ sử dụng	",
        type: "number",
        filter: false,
      },
      TONG_SO: {
        title: "Tổng số",
        type: "number",
        filter: false,
        editable:false,
        addable: false
      },
    },
  };
  settings = {
    pager: {
      perPage: 2,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
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
        title: "Mã khách hàng",
        type: "string",
      },
      TEN_KHANG: {
        title: "Tên khách hàng",
        type: "string",
      },
      DTHOAI: {
        title: "Điện thoại",
        type: "string",
      },
      DIA_CHI_KH: {
        title: "Địa chỉ",
        type: "string",
      },
      MA_HDONG: {
        title: "Mã hợp đồng",
        type: "string",
      },
      SO_HO: {
        title: "Số hộ",
        type: "number",
      },
    },
  };

  settingsThongTinDiemDo = {
    pager: {
      perPage: 2,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
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
      MA_TRAM: {
        title: "Mã trạm",
        type: "string",
      },
      TEN_TRAM: {
        title: "Tên trạm",
        type: "string",
      },
      MA_LO: {
        title: "Mã lộ",
        type: "string",
      },
      SO_COT: {
        title: "Số cột",
        type: "string",
      },
      KVUC_STT: {
        title: "Khu vực-STT",
        type: "string",
      },
      TEN_CAPDA: {
        title: "Cấp điện áp",
        type: "string",
      },
      MA_DDO: {
        title: "Mã điểm đo",
        type: "string",
      },
      LOAI_DDO: {
        title: "Loại điểm đo",
        type: "number",
      },
      DIA_CHI_DDO: {
        title: "Địa chỉ điểm đo",
        type: "string",
      },
      SO_PHA: {
        title: "Số pha",
        type: "number",
      },
      MA_SOGCS: {
        title: "Mã sổ GCS",
        type: "string",
      },
      CHUOI_GIA: {
        title: "Chuỗi giá",
        type: "string",
      },
    },
  };
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api",
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `Bearer AAA`
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    multiple: true,
    formatsAllowed: ".jpg,.png",
    replaceTexts: {
      selectFileBtn: 'Chọn các tệp...',
      resetBtn: 'Hủy',
      uploadBtn: 'Tải lên',
      dragNDropBox: 'Kéo thả',
      attachPinBtn: 'Đính kèm tệp...',
      afterUploadMsg_success: 'Tải lên thành công!',
      afterUploadMsg_error: 'Có lỗi khi tải lên!',
      sizeLimit: 'Dung lượng tối đa'
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
     
   
    
  }
  
  async onTimKiemKhachHang(duLieuTruyenVao) {
    
    this.tinhTrangTimKiem = false;
    this.ketQuaTimKiem_danhSachKhachHang = [];
    let modelSearch = duLieuTruyenVao.value;
    console.log(modelSearch);
    let data: KhachhangSearchModel = {
      strMaDViQLy: ApiService.MaDonViQuanLy,
      strGiaTriTimKiem: modelSearch.timKiemTheoMKH != ""?modelSearch.timKiemTheoMKH : modelSearch.timKiemTheoMaTram != ""?modelSearch.timKiemTheoMaTram:modelSearch.timKiemTheoDiaChi,
      nLoaiTimKiem: modelSearch.timKiemTheoTuyChon == "chonMKH" ? 3 : modelSearch.timKiemTheoTuyChon == "chonDiaChi"? 5: 2,
      bGetHetHLuc: false,
    };
    this.tinhTrangTimKiem = true;
    await this.apiService
    .onTimKiemKhachHang(data)
    .pipe(take(1))
    .toPromise()
    .then((resp) => {
      console.log('Responsed data: ');
      console.log(resp);
      for (const data of resp) {
        this.ketQuaTimKiem_danhSachKhachHang.push(data);
      }
      this.tinhTrangTimKiem = false;
    }).catch(err => {console.log(err); this.tinhTrangTimKiem = false;});
    // await this.apiService
    //   .onTimKiemKhachHang(data)
    //   .pipe(take(1))
    //   .toPromise()
    //   .then((resp) => {
    //     const keys = resp.headers.keys();
    //     for (const data of resp.body) {
    //       this.ketQuaTimKiem_danhSachKhachHang.push(data);
    //     }
    //   });
    // this.apiService.onTimKiemKhachHang(data).subscribe((data:string)  => {
    //   let result = JSON.parse(data);
    //  // ketQuaTimKiem_danhSachKhachHang.push(result);
    // });

    this.ketQuaTimKiem = this.ketQuaTimKiem_danhSachKhachHang;
    this.source.load(this.ketQuaTimKiem);
    this.sourceThongTinDiemDo.load(this.ketQuaTimKiem);
  }
  dienNhanhCongSuat() {
    if (this.chonNhomThietBi == undefined) {
      this.showToast("top-right", "warning", "Chọn thiết bị trước");
    
    } else {

      let thongTinThietBi = this.duLieuCongSuatAfterFetched.find(m=> m.value === this.chonNhomThietBi);
      let item = {
        MUC_DICH_SU_DUNG: null,
        TEN_THIET_BI: thongTinThietBi.value,
        SO_LUONG: '',
        CONG_SUAT: thongTinThietBi.value2,
        HE_SO: '',
        SO_H_SU_DUNG:'',
        TONG_SO:'',

      };
      console.log('Dữ liệu được thêm vào mục Công suất: ');
      console.log(item);
      this.sourceCongSuatSuDungDien.add(item);
      this.sourceCongSuatSuDungDien.refresh();
      
    }
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
        TY_LE: thongTinDichVu.TyLe,
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

              MKH: this.luaChonKhachHang.MA_KHANG,
              DULIEUCHITIET: {
                CongSuatSD: congSuatSDD,
                TyLeGiaBanDien: tyLeGBD,
              },
              NTL: this.userLogin.layUserDaDangNhap(),
              THOIDIEMTAO: new Date().toLocaleDateString(),
              TEN_KHANG: this.luaChonKhachHang.TEN_KHANG,
              DTHOAI: this.luaChonKhachHang.DTHOAI,
              DIA_CHI_DDO: this.luaChonKhachHang.DIA_CHI_DDO,
              DIA_CHI_KH: this.luaChonKhachHang.DIA_CHI_KH,
            };
            this.apiService
              .luuDuLieuLenMayChu(JSON.stringify(duLieuTaiLen))
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
    console.log(event.data);
  }
  //#region Upload File
  
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
 
  //#endregion
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
          let TLSDD = {
            value: element.MUC_DICH_SU_DUNG_DIEN, 
            title:    element.MUC_DICH_SU_DUNG_DIEN,         
            valueBT: element.GIO_BINH_THUONG,
            valueCD:  element.GIO_CAO_DIEM,
            valueTD: element.GIO_THAP_DIEM
          };
          duLieuTam_TyLe.push(TLSDD);
            
      });
      element.DULIEUCHITIET.CongSuatSD.forEach(
        element => {
          
          let CSDD =  {
            value: element.TEN_THIET_BI,
            title: element.TEN_THIET_BI,
            value2: element.CONG_SUAT
          };
          duLieuTam_CongSuat.push(CSDD);
        });       
        this.duLieuCongSuat.next(duLieuTam_CongSuat);
        this.duLieuTyLe.next(duLieuTam_TyLe);

     
       // console.log('1. Ty le: ');
       // console.log(this.duLieuTyLe );
        

     
    });
  }
   onClickTinhToanCongSuat(){

    let CSSDD : any;
    this.chuoiGia = "";
    this.sourceCongSuatSuDungDien.getAll().then( (data) => {
      CSSDD = data;
      let TongSoDien: number = 0;
       CSSDD.forEach(item=>{
        if (item.CONG_SUAT==='')
         {
           var newData = item;           
            let congSuat = this.duLieuCongSuatAfterFetched.find(m=>m.value===item.TEN_THIET_BI).value2;
            newData.CONG_SUAT = congSuat;
            newData.TONG_SO = newData.SO_LUONG * newData.CONG_SUAT * newData.HE_SO * newData.SO_H_SU_DUNG;
            this.sourceCongSuatSuDungDien.update(item,newData);
            TongSoDien += newData.TONG_SO;
         }          
      });
      CSSDD.forEach((item,index)=>{
        if (index==0)
          this.chuoiGia += item.MUC_DICH_SU_DUNG + "*(" + Math.round(item.TONG_SO/  TongSoDien *100)  +"%)";
        else
          this.chuoiGia += "+" + item.MUC_DICH_SU_DUNG + "*(" + Math.round(item.TONG_SO/  TongSoDien *100)  +"%)";
      });
      
    });
    
    console.log();
  }

  onClickTinhToanMDSDD(){

    let CSSDD : any;
    this.sourceTyLeGiaBanDien.getAll().then( (data) => {
      CSSDD = data;
       CSSDD.forEach(item=>{
        debugger;
           var newData = item;           
            let BT = this.duLieuTyLeAfterFetched.find(m=>m.value===item.MUC_DICH_SU_DUNG_DIEN).valueBT;
            let CD = this.duLieuTyLeAfterFetched.find(m=>m.value===item.MUC_DICH_SU_DUNG_DIEN).valueCD;
            let TD = this.duLieuTyLeAfterFetched.find(m=>m.value===item.MUC_DICH_SU_DUNG_DIEN).valueTD;
            newData.GIO_BINH_THUONG = BT;
            newData.GIO_CAO_DIEM = CD;
            newData.GIO_THAP_DIEM = TD;
            this.sourceTyLeGiaBanDien.update(item,newData);
                  
      });
    });
    
    console.log();
  }
}

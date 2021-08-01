import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem, DuLieuKhachHang } from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Khachhang, KhachhangSearchModel, KhachHangMDSDDModelResult, KhachHangCSSDDModelResult, KhachHangModelResult, KhachHangModelExportFile } from '../../../shared/khachhang';
import { ApiService } from '../../../shared/api.service';
import { take } from 'rxjs/operators';
import { AnyARecord } from 'dns';
import { ActivatedRoute, Router } from '@angular/router';
import * as docx from "docx";
import { Document, Packer, Paragraph, TextRun, ImportDotx } from "docx";
import * as _ from 'lodash';
import { debug } from 'console';
declare const generate: any;
//const template = fs.readFileSync('../../../../assets/data/mytemplate.doc');
@Component({
  selector: 'ngx-laythongtinkhachang',
  templateUrl: './laythongtinkhachang.component.html',
  styleUrls: ['./laythongtinkhachang.component.scss']
})


export class LaythongtinkhachangComponent {

  danhSachAnh: string[] = [];
  luaChonTimKiem: TimKiem;
  luaChonKhachHang: Khachhang;
  ketQuaTimKiem: Khachhang[];
  ketQuaTimKiem_danhSachKhachHang: Khachhang[] = [];
  chuoiGia: string;
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
      SO_LUONG: {
        title: "Số lượng	",
        type: "number",

        filter: false,
      },
      CONG_SUAT: {
        title: 'Công suất (kW)	',
        type: 'number',
        filter: false,
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
      },
    },
  };
  trangThaiLayDuLieu: string;
  sourceDanhSachKhachHang: LocalDataSource = new LocalDataSource();
  sourceCongSuatSuDungDien: LocalDataSource = new LocalDataSource();
  sourceTyLeGiaBanDien: LocalDataSource = new LocalDataSource();
  duLieuTrenFireBase: any;
  duLieuMDSHKHTrenServer: KhachHangModelResult[] = [];
  duLieuKhachHang: KhachHangModelExportFile;
  DanhSachMucDichVaTongSoDienTheoNo: any;
  constructor(private service: SmartTableData, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    this.LoadDuLieu(this.route.snapshot.paramMap.get('makhachhang'))
  }
  onSelectConfirm(event): void {
    this.luaChonKhachHang = event.data;
  }
  duLieuTam_TyLe = [];
  duLieuTam_CongSuat = [];
  async LoadDuLieu(makhachhang: string) {
    this.chuoiGia = "";
    let TongSoDien: number = 0;
    this.duLieuMDSHKHTrenServer = [];
    let ketQuaTraVeTuServer = [];
    this.duLieuTam_TyLe = [];
    this.duLieuTam_CongSuat = [];
    await this.apiService.layDuLieuKhachHangTuMayChu(makhachhang).then(result => {
      console.log(result);
      ketQuaTraVeTuServer.push(result);
      this.duLieuTrenFireBase = ketQuaTraVeTuServer;
    });
    this.duLieuTrenFireBase.forEach(async element => {
      this.duLieuTam_TyLe = [];
      this.duLieuTam_CongSuat = [];
      let TLSDD: any;
      let CSDD: any;
      let MKH = element.MKH;
      this.duLieuKhachHang = {
        MA_KHACH_HANG : element.MKH,
        TEN_KHANG: element.TEN_KHANG,
        DTHOAI: element.DTHOAI,
        DIA_CHI_DDO: element.DIA_CHI_DDO,
        DIA_CHI_KH: element.DIA_CHI_KH,

      }
      element.DULIEUCHITIET.CongSuatSD = _.sortBy(element.DULIEUCHITIET.CongSuatSD, (e) => {
        return e.MUC_DICH_SU_DUNG
      });
      element.DULIEUCHITIET.TyLeGiaBanDien = _.sortBy(element.DULIEUCHITIET.TyLeGiaBanDien, (e) => {
        return e.MUC_DICH_SU_DUNG_DIEN
      });
      element.DULIEUCHITIET.TyLeGiaBanDien.forEach(
        element => {
          TLSDD = new KhachHangMDSDDModelResult(element.MUC_DICH_SU_DUNG_DIEN,
            element.TY_LE,
            element.GIO_BINH_THUONG,
            element.GIO_CAO_DIEM,
            element.GIO_THAP_DIEM);
          this.duLieuTam_TyLe.push(TLSDD.layDuLieu());
        }
      );



      element.DULIEUCHITIET.CongSuatSD.forEach(
        (element, index) => {

          CSDD = new KhachHangCSSDDModelResult(
            element.MUC_DICH_SU_DUNG,
            element.TEN_THIET_BI,
            element.CONG_SUAT,
            element.HE_SO,
            element.SO_LUONG,
            element.SO_H_SU_DUNG,
            element.TONG_SO,

          );
          this.duLieuTam_CongSuat.push(CSDD.layDuLieu());
          TongSoDien += element.TONG_SO;


        });



      this.DanhSachMucDichVaTongSoDienTheoNo = _.groupBy(element.DULIEUCHITIET.CongSuatSD,"MUC_DICH_SU_DUNG");
      for (var md in this.DanhSachMucDichVaTongSoDienTheoNo){
        this.DanhSachMucDichVaTongSoDienTheoNo[md]["TONG_SO_THEO_MDICH"] = _.sumBy(this.DanhSachMucDichVaTongSoDienTheoNo[md],"TONG_SO");
      }

      for (var md in this.DanhSachMucDichVaTongSoDienTheoNo){
        this.chuoiGia += "+" + md + "*(" + Math.round(this.DanhSachMucDichVaTongSoDienTheoNo[md]["TONG_SO_THEO_MDICH"] / TongSoDien * 100) + "%)";

      }
      this.chuoiGia = this.chuoiGia.substr(1);
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
              if (point === listOfFiles[listOfFiles.length - 1]) {
                console.log('Du lieu anh cua khach hang: ' + this.danhSachAnh);
                this.duLieuMDSHKHTrenServer.push(new KhachHangModelResult(MKH, this.duLieuTam_TyLe, this.duLieuTam_CongSuat, this.danhSachAnh));
                this.danhSachAnh = [];
              }
            });
          }
          else {
            this.duLieuMDSHKHTrenServer.push(new KhachHangModelResult(MKH, this.duLieuTam_TyLe, this.duLieuTam_CongSuat, undefined));
            this.danhSachAnh = [];
          }

        }
      });



    });
    console.log(this.duLieuMDSHKHTrenServer);
  }

  TaoBienBan(){
    let TCCS:number=0;
    let TCSL:number=0;
    let TCHS:number=0;
    let TCCSSD:number=0;
    let TCTGSDN:number=0;
    let TCTCSSD:number=0;
    let TCHSD:number=0;
    let TongSoDien:number=0;

    this.duLieuTam_CongSuat.forEach(element => {
      TongSoDien += element.TONG_SO;
    });

    this.duLieuTam_CongSuat.forEach(element => {
      TCCS+= +element.CONG_SUAT;
      TCSL+= +element.SO_LUONG;
      TCHS+= +element.HE_SO;
      TCCSSD+= +element.TONG_SO;
      element["TY_LE"] = Math.round(element.TONG_SO / TongSoDien * 100);
      element.SO_H_SU_DUNG = +element.SO_H_SU_DUNG;
      TCHSD += +element.SO_H_SU_DUNG
      element["TCSSD"] = +element.CONG_SUAT * +element.SO_LUONG * +element.HE_SO;
      TCTGSDN+= +element.CONG_SUAT * +element.SO_LUONG * +element.HE_SO;
    });
    var groups = _.groupBy(this.duLieuTam_CongSuat, 'MUC_DICH_SU_DUNG');
    var duLieuTam_CongSuat_KetLuan = _.map(groups, function(value, key) {
      return { 
        MD_KL: key, 
        MD_CS_TS: _.reduce(value, function(total, o) { 
            return total + o.TONG_SO;
        }, 0),
        MD_TL_KL: _.reduce(value, function(total, o) { 
          return total + o.TY_LE;
        }, 0)
      };
    });
    debugger;

    generate(this.duLieuKhachHang,this.duLieuTam_TyLe,this.duLieuTam_CongSuat, {"TCCS":TCCS,"TCSL" : TCSL,"TCHS":TCHS,"TCCSSD":TCCSSD, "TCTGSDN":TCTGSDN, "TCTCSSD":TCTCSSD, "TCHSD":TCHSD}, duLieuTam_CongSuat_KetLuan)
  }
}

import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem , DuLieuKhachHang} from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Khachhang, KhachhangSearchModel } from '../../../shared/khachhang';
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
      add:true,
      edit:true,
      delete:true,
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
        type: 'number',
        filter:false,
      },
      GIO_CAO_DIEM: {
        title: 'Giờ cao điểm',
        type: 'number',
        filter:false,
      },
      GIO_THAP_DIEM: {
        title: 'Giờ thấp điểm',
        type: 'number',
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
      add:true,
      edit:true,
      delete:true,
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
  constructor(private service: SmartTableData, private apiService: ApiService) {
    
   
    
  }
  async onTimKiemKhachHang(duLieuTruyenVao) {
    
    let modelSearch = duLieuTruyenVao.value;
    let data : KhachhangSearchModel = {
      strMaDViQLy : ApiService.MaDonViQuanLy,
      strGiaTriTimKiem : ApiService.MaDonViQuanLy + modelSearch.timKiemTheoMKH,
      nLoaiTimKiem : modelSearch.timKiemTheoTuyChon=="chonMKH"?3:2,
      bGetHetHLuc : false
    };
    await this.apiService.onTimKiemKhachHang_Local(data)
    .pipe(take(1)).toPromise().then(resp => {
      const keys = resp.headers.keys();
      for (const data of resp.body) {
        this.ketQuaTimKiem_danhSachKhachHang.push(data);
      }
    });
    // this.apiService.onTimKiemKhachHang(data).subscribe((data:string)  => {
    //   let result = JSON.parse(data);
    //  // ketQuaTimKiem_danhSachKhachHang.push(result);
    // });

    this.ketQuaTimKiem = this.ketQuaTimKiem_danhSachKhachHang;   
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Chắc chắn xóa?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onLuuDuLieuClicked(){
    let congSuatSDD:string[];
    let tyLeGBD: string[];
    
    this.sourceTyLeGiaBanDien.getAll().then((data)=>{
      tyLeGBD = data;
    }).then(()=>{
      console.log(tyLeGBD);
      this.sourceCongSuatSuDungDien.getAll().then((data)=>{
        congSuatSDD = data;
      }).then(()=>{  
        console.log(congSuatSDD); 
        let duLieuTaiLen:DuLieuKhachHang = {
          MKH : this.luaChonKhachHang.MA_KHANG,
          DULIEUCHITIET: {
            CongSuatSD : congSuatSDD,
            TyLeGiaBanDien : tyLeGBD,
          }
        };       
        this.apiService.luuDuLieuLenMayChu(JSON.stringify(duLieuTaiLen))
        .then(res => {
          this.trangThaiLayDuLieu = 'success'
        }, err => {
          this.trangThaiLayDuLieu = 'warning'
        });;
      });
    });
    
    
  }
  onSelectConfirm(event): void {
    this.luaChonKhachHang = event.data;
  }
}

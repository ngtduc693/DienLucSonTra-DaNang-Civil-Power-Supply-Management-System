import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem, DuLieuKhachHang } from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Khachhang, KhachhangSearchModel, KhachHangMDSDDModelResult, KhachHangCSSDDModelResult, KhachHangModelResult, KhachHangModel } from '../../../shared/khachhang';
import { ApiService } from '../../../shared/api.service';
import { take } from 'rxjs/operators';
import { AnyARecord } from 'dns';
import { LaythongtinkhachangComponent } from '../laythongtinkhachang/laythongtinkhachang.component';

@Component({
  selector: 'ngx-thongtintrenmaychu',
  templateUrl: './/thongtintrenmaychu.component.html',
  styleUrls: ['.//thongtintrenmaychu.component.scss'],
})
export class ThongTinTrenMayChuComponent {
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
  constructor(private service: SmartTableData, private apiService: ApiService) {

    this.LoadDuLieu();

  }
  onSelectConfirm(event): void {
    this.luaChonKhachHang = event.data;    
  }
  async LoadDuLieu() {

    let duLieuTam:KhachHangModel[] = [];
    await this.apiService.layDuLieuTuMayChu().then(result => {
      this.duLieuTrenFireBase = result;
    }).then(res=>{
      this.duLieuTrenFireBase.forEach(async element => {
        
        duLieuTam.push(new KhachHangModel(element.MKH,element.THOIDIEMTAO,element.NTL));
      });
      this.duLieuKHTrenServer = duLieuTam;
      console.log(this.duLieuKHTrenServer);
    })
   
  }
}

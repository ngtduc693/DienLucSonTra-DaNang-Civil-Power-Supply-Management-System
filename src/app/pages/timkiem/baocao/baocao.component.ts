import { Component, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { ApiService } from '../../../shared/api.service';
import { take, finalize } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth-service.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import * as _ from 'lodash';
import { truncate } from 'fs';
import * as moment from 'moment';
@Component({
  selector: 'ngx-baocao',
  templateUrl: './baocao.component.html',
  styleUrls: ['./baocao.component.scss']
})
export class BaocaoComponent {
  baoCaoDataSetting = {
    noDataMessage: 'Chưa có dữ liệu',
    pager: {
      perPage: 10,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: 'Thao tác',
    },
    columns: {
      STT: {
        title: 'STT',
        type: 'number',
        filter: false,
      },
      MA_KH: {
        title: 'Mã khách hàng',
        type: 'string',
        filter: true,
      },
      NGUOI_TAO_LAP: {
        title: 'Người tạo lập',
        type: 'string',
        filter: true,
      },
      NGAY_TAO_LAP: {
        title: 'Ngày tạo lập',
        type: 'string',
        filter: true,
      },
    },
  };

  baoCaoData: LocalDataSource = new LocalDataSource();
  buttonAllName = 'Xuất toàn bộ dữ liệu ra excel';
  buttonFilteredName = 'Xuất dữ liệu đã được lọc ra excel';

  dateFrom: any;
  dateTo: any;
  allRawData: any[];
  constructor (
    private service: SmartTableData,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private userLogin: AuthService,
  ) {
    this.initPage();
  }

  ngOnInit() {}

  async initPage() {
    await this.loadData();
    this.setButtonName();
    this.baoCaoData.onChanged().subscribe((change) => {

      if (change.action === 'filter') {
        this.setButtonName();
        // this.onDateFilterClicked();
      }
    });
  }

  async loadData() {
    const baoCaoData = await this.apiService.layDuLieuTuMayChu();
    let i = 1;
    const tempData = [];
    baoCaoData.forEach((data: any) => {
      const row: any = {};
      row.STT = i;
      row.MA_KH = data.MKH;
      row.NGUOI_TAO_LAP = data.NTL;
      row.NGAY_TAO_LAP = data.THOIDIEMTAO;
      tempData.push(row);
      i++;
    });
    this.allRawData = tempData;
    this.baoCaoData = new LocalDataSource(tempData);
    this.baoCaoData.refresh();
    return;
  }

  async onExportAllFileExcelClicked() {
    this.downloadCSV(this.allRawData);
  }

  async onExportFilteredFileExcelClicked() {
    const filteredData = await this.baoCaoData.getFilteredAndSorted();
    this.downloadCSV(filteredData);
  }

  async onDateFilterClicked() {
    const filteredDatas = this.allRawData.filter(row => {
      let dateData = row.NGAY_TAO_LAP.split('/');
      dateData = dateData[2] + '-' + dateData[1] + '-' + dateData[0];
      dateData = moment(dateData);
      if (dateData.unix() >=  moment(this.dateFrom).unix() && dateData.unix() <= moment(this.dateTo).unix()) {
        return true;
      } else {
        return false;
      }
    });
    await this.baoCaoData.load(filteredDatas);
    this.baoCaoData.refresh();
    this.setButtonName();
  }

  async onDateFilterClearClicked() {
    await this.baoCaoData.load(this.allRawData);
    this.baoCaoData.refresh();
    this.setButtonName();
  }

  async setButtonName() {
    const allData = this.allRawData;
    const filteredData = await this.baoCaoData.getFilteredAndSorted();
    if (allData.length > 0) {
      this.buttonAllName = `Xuất toàn bộ dữ liệu ra excel (${allData.length} khách hàng)`;
    } else {
      this.buttonAllName = `Xuất toàn bộ dữ liệu ra excel (0 khách hàng)`;
    }

    if (filteredData.length > 0) {
      this.buttonFilteredName = `Xuất dữ liệu đã được lọc ra excel (${filteredData.length} khách hàng)`;
    } else {
      this.buttonFilteredName = `Xuất dữ liệu đã được lọc ra excel (0 khách hàng)`;
    }
  }

  downloadCSV(data) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: [
        'STT',
        'Mã khách hàng',
        'Người tạo lập',
        'Ngày tạo lập',
      ],
    };

    new Angular5Csv(data, 'BaoCaoQuanLyCapDien', options);
  }
}

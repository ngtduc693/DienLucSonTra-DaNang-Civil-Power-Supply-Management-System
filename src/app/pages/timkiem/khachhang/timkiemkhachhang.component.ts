import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { TimKiem } from '../timkiem';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './/timkiemkhachhang.component.html',
  styleUrls: ['.//timkiemkhachhang.component.scss'],
})
export class TimKiemKhachHangComponent {
  luaChonTimKiem :TimKiem ;
  
  ngOnInit(){
  }
  settings = {
    actions:{
      add:false,
      edit:false,
      delete:false
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
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    
    const data = this.service.getData();
    
    this.source.load(data);
  }
  onTimKiemKhachHang(duLieuTruyenVao) {
    console.log(duLieuTruyenVao);
    this.luaChonTimKiem  = {
      MKH : -1,
      DiaChi : "",
      MaTram : "",
      TuyChon: ""
    };
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSelectConfirm(event): void {
    if (window.confirm('Chắc chắn chọn?')) {
      console.log(event.data);
      //event.confirm.resolve();
      
    } else {
      //event.confirm.reject();
    }
  }
}

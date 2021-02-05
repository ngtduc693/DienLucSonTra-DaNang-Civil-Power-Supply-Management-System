import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../../../shared/api.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
declare const generateFileDocRegSolar: any;

@Component({
  selector: 'ngx-dangkylapdatdien',
  templateUrl: './dangkylapdatdien.component.html',
  styleUrls: ['./dangkylapdatdien.component.scss']
})

export class DangkylapdatdienComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  sevenForm: FormGroup;
  eighthForm: FormGroup;
  dangKySuDungDien = {};
  maKhachHang: string;
  isEdit: boolean;
  downloadURLList: string[] = [];

  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;
  submitted5 = false;
  submitted7 = false;
  submitted8 = false;

  @ViewChild('stepper') stepper: NbStepperComponent;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      TEN_TO_CHUC_CA_NHAN: ['', Validators.required],
      MA_SO_THUE: ['',],
      DAI_DIEN: ['',],
      CHUC_VU: ['',],
      CMND: ['',],
      NGAY_CAP: ['',],
      NOI_CAP: ['',],
      DIEN_THOAI: ['',],
      GIAY_UY_QUYEN_SO: ['',],
      NGAY_UY_QUYEN: ['',],
      MA_KHANG: ['', Validators.required],
      DIA_DIEM_DU_AN: ['',],
      TONG_CONG_SUAT: ['',],
      CONG_SUAT_BO_INVERTER: ['',],
      SO_PHA: ['',],
    });

    this.secondForm = this.fb.group({
      KHACH_HANG: ['', Validators.required],
      MA_KHANG: ['', Validators.required],
      CONG_SUAT_INVERTER: ['',],
      SO_PHA: ['',],
      CONG_SUAT_TONG_HE_THONG_PIN: ['',],
      CAP_DIEN_AP_DAU_NOI: ['',],
      DIA_CHI_DU_AN: ['',],
      DIEM_DAU_NOI: ['',],
      TBA: ['',],
      THUOC_TAI_SAN: ['',],
      MA_TRAM: ['',],
      THUOC_XT: ['',],
      DUNG_LUONG_TBA: ['',],
      CAP_DIEN_AP_DO_DIEM: ['',],
      VI_TRI_LAP_DAT_DO_DIEM: ['',],
      TONG_CONG_SUAT_DAU_NOI_1: ['',],
      DIEU_KIEN_DAU_NOI: ['',],
      CONG_SUAT_DAU_NOI_CUA_KHACH_HANG: ['',],
      DUONG_DAY_HA_AP: ['',],
      TONG_CONG_SUAT_DAU_NOI_2: ['',],
      CONG_SUAT_GIAI_TOA: ['',],
      DIEU_KIEN_HA_AP: ['',],

    });

    this.thirdForm = this.fb.group({
      CHU_DAU_TU: ['', Validators.required],
      TONG_CONG_SUAT_CAC_BO_INVERTER: ['',],
      VI_TRI_DAU_NOI: ['',],
      DUONG_DAY_TRAM_BIEN_AP: ['',],
    });

    this.fourthForm = this.fb.group({
      HO_VA_TEN: ['', Validators.required],
      CMND: ['', Validators.required],
      NGAY_CAP: ['',],
      NOI_CAP: ['',],
      DAI_DIEN: ['',],
      DIA_CHI: ['',],
      DIEN_THOAI: ['',],
      EMAIL: ['',],
      CONG_SUAT: ['',],
      CONG_TRINH_XAY_DUNG_TAI: ['',]
    });

    this.fifthForm = this.fb.group({
      TEN_TO_CHUC_CA_NHAN: ['', Validators.required],
      MA_SO_THUE: ['',],
      DAI_DIEN: ['',],
      CHUC_VU: ['',],
      CMND: ['',],
      NGAY_CAP: ['',],
      NOI_CAP: ['',],
      EMAIL: ['',],
      DIEN_THOAI: ['',],
      GIAY_UY_QUYEN_SO: ['',],
      NGAY_UY_QUYEN: ['',],
      TAI_KHOAN_NHAN_TIEN: ['',],
      TEN_CHU_TAI_KHOAN: ['',],
      SO_TAI_KHOAN: ['',],
      NGAN_HANG: ['',],
      DIA_DIEM_DU_AN: ['',],
      CONG_SUAT_DU_AN: ['',],
      TAM_PIN_MAT_TROI_LOAI: ['',],
      CONG_SUAT_1: ['',],
      SO_TAM: ['',],
      CUA_NHA_SAN_SUAT1: ['',],
      BO_INVERTER_LOAI: ['',],
      CONG_SUAT_INVERTER: ['',],
      CUA_NHA_SAN_SUAT2: ['',],
      CAP_DIEN_AP_DAU_NOI: ['',],
      SO_PHA: ['',],
      MA_KHANG: ['',],
      DIA_DIEM_SU_DUNG_HIEN_TAI: ['',],
    }),
      this.sevenForm = this.fb.group({
        TEN_KHANG: ['', Validators.required],
        MA_KHANG: ['', Validators.required],
        DIA_CHI: ['',],
        LO_TRINH: ['',],
        VI_TRI: ['',],
      });
    this.eighthForm = this.fb.group({
      TEN_KHANG: ['', Validators.required],
      MA_KHANG: ['', Validators.required],
      DIA_CHI: ['',],
      DIEN_THOAI: ['',],
      EMAIL: ['',],
      CMND: ['',],
      NGAY_CAP: ['',],
      NOI_CAP: ['',],
      CONG_SUAT: ['',],
      DIA_CHI_VAN_HANH: ['',],
      SO_TAI_KHOAN: ['',],
      NGAN_HANG: ['',],
      TEN_TAI_KHOAN: ['',],
    });
    this.onInitData(this.route.snapshot.paramMap.get('makhachhang'))
  }

  async onInitData(maKhachHang) {
    await this.apiService.layDuLieuDangKyDienTuMayChuTheoMaKhachHang(maKhachHang).then(result => {
      if (result) {
        this.dangKySuDungDien = result;
        this.isEdit = true;
        this.downloadURLList = result['fileUploads'];
        this.maKhachHang = this.dangKySuDungDien["BUOC_1"]["MA_KHANG"];
        this.setDataFormGroup(this.firstForm, result['BUOC_1']);
        this.setDataFormGroup(this.secondForm, result['BUOC_2']);
        this.setDataFormGroup(this.thirdForm, result['BUOC_3']);
        this.setDataFormGroup(this.fourthForm, result['BUOC_4']);
        this.setDataFormGroup(this.fifthForm, result['BUOC_5']);
        this.setDataFormGroup(this.sevenForm, result['BUOC_7']);
        this.setDataFormGroup(this.eighthForm, result['BUOC_8']);
      }
    });
  }
  onFirstSubmit() {
    this.submitted1 = true;

    this.firstForm.markAsDirty();
    if (this.firstForm.invalid) {
      return;
    }

    this.maKhachHang = this.firstForm.controls["MA_KHANG"].value;
    this.dangKySuDungDien["BUOC_1"] = this.getDataFormGroup(this.firstForm);
    this.dangKySuDungDien["BUOC_1"]["NGAY_TAO"] = moment(Date.now()).format("DD/MM/YYYY HH:mm:ss");
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.secondForm.controls["MA_KHANG"].setValue(this.firstForm.controls["MA_KHANG"].value);
    this.secondForm.controls["KHACH_HANG"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);
    this.stepper.next();
  }


  onSecondSubmit() {
    this.submitted2 = true;

    this.secondForm.markAsDirty();
    if (this.secondForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_2"] = this.getDataFormGroup(this.secondForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.thirdForm.controls["CHU_DAU_TU"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);

    this.stepper.next();
  }

  onThirdSubmit() {
    this.submitted3 = true;

    this.thirdForm.markAsDirty();
    if (this.thirdForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_3"] = this.getDataFormGroup(this.thirdForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.fourthForm.controls["HO_VA_TEN"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);
    this.fourthForm.controls["CMND"].setValue(this.firstForm.controls["CMND"].value);
    this.fourthForm.controls["NGAY_CAP"].setValue(this.firstForm.controls["NGAY_CAP"].value);
    this.fourthForm.controls["NOI_CAP"].setValue(this.firstForm.controls["NOI_CAP"].value);
    this.fourthForm.controls["DAI_DIEN"].setValue(this.firstForm.controls["DAI_DIEN"].value);
    this.fourthForm.controls["DIEN_THOAI"].setValue(this.firstForm.controls["DIEN_THOAI"].value);
    this.stepper.next();
  }
  onFourSubmit() {
    this.submitted4 = true;

    this.fourthForm.markAsDirty();
    if (this.fourthForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_4"] = this.getDataFormGroup(this.fourthForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.fifthForm.controls["TEN_TO_CHUC_CA_NHAN"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);
    this.fifthForm.controls["MA_SO_THUE"].setValue(this.firstForm.controls["MA_SO_THUE"].value);
    this.fifthForm.controls["DAI_DIEN"].setValue(this.firstForm.controls["DAI_DIEN"].value);
    this.fifthForm.controls["CMND"].setValue(this.firstForm.controls["CMND"].value);
    this.fifthForm.controls["NGAY_CAP"].setValue(this.firstForm.controls["NGAY_CAP"].value);
    this.fifthForm.controls["NOI_CAP"].setValue(this.firstForm.controls["NOI_CAP"].value);
    this.fifthForm.controls["DAI_DIEN"].setValue(this.firstForm.controls["DAI_DIEN"].value);
    this.fifthForm.controls["DIEN_THOAI"].setValue(this.firstForm.controls["DIEN_THOAI"].value);

    this.stepper.next();
  }

  onFifthSubmit() {
    this.submitted5 = true;

    this.fifthForm.markAsDirty();
    if (this.fifthForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_5"] = this.getDataFormGroup(this.fifthForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.sevenForm.controls["MA_KHANG"].setValue(this.firstForm.controls["MA_KHANG"].value);
    this.sevenForm.controls["TEN_KHANG"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);

    this.stepper.next();
  }

  onSevenSubmit() {
    this.submitted7 = true;

    this.sevenForm.markAsDirty();
    if (this.sevenForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_7"] = this.getDataFormGroup(this.sevenForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);

    this.eighthForm.controls["MA_KHANG"].setValue(this.firstForm.controls["MA_KHANG"].value);
    this.eighthForm.controls["TEN_KHANG"].setValue(this.firstForm.controls["TEN_TO_CHUC_CA_NHAN"].value);
    this.eighthForm.controls["CMND"].setValue(this.firstForm.controls["CMND"].value);
    this.eighthForm.controls["NGAY_CAP"].setValue(this.firstForm.controls["NGAY_CAP"].value);
    this.eighthForm.controls["NOI_CAP"].setValue(this.firstForm.controls["NOI_CAP"].value);
    this.eighthForm.controls["DIEN_THOAI"].setValue(this.firstForm.controls["DIEN_THOAI"].value);
    this.eighthForm.controls["EMAIL"].setValue(this.fourthForm.controls["EMAIL"].value);
    this.stepper.next();
  }

  onEighthSubmit() {
    this.submitted8 = true;

    this.eighthForm.markAsDirty();
    if (this.eighthForm.invalid) {
      return;
    }
    this.dangKySuDungDien["BUOC_8"] = this.getDataFormGroup(this.eighthForm);
    this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);
    this.stepper.next();
  }

  downLoadFileDoc() {
    generateFileDocRegSolar(this.dangKySuDungDien);
  }

  getDataFormGroup(formGroup) {
    let formData = {};
    for (const field in formGroup.controls) {
      formData[field] = formGroup.controls[field].value
    }
    return formData;
  }


  setDataFormGroup(formGroup, data) {
    for (const field in formGroup.controls) {
      if (data && data[field]) {
        formGroup.controls[field].setValue(data[field]);
      }
    }
  }

  //#region Upload File

  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  upload(event) {
    this.downloadURLList = [];
    for (let file of event.target.files) {
      const id = Math.random().toString(36).substring(2);
      var path = 'uploads/' + this.maKhachHang + '/';
      this.apiService.ref = this.apiService.storage.ref(path + id);
      this.apiService.task = this.apiService.ref.put(file);
      this.uploadProgress = this.apiService.task.percentageChanges();
      this.apiService.task.snapshotChanges().pipe(

        finalize(() => {
          console.log(file);
          this.downloadURL = this.apiService.storage.ref(path + id).getDownloadURL();
          this.downloadURL.subscribe(value => {
            this.downloadURLList.push(value)
            this.dangKySuDungDien["fileUploads"] = this.downloadURLList;
            this.sendDataToService(this.dangKySuDungDien, this.maKhachHang);
          });
        }
        ))
        .subscribe();

    }

  }

  //#endregion

  showToast(position, status, message) {
    this.toastrService.show(message || status, `Thông báo `, {
      position,
      status,
    });
  }

  sendDataToService(data, maKhachHang) {
    this.apiService
      .luuDuLieuDangKyDien(data, maKhachHang)
      .then(
        (res) => {
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
  }

}

import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

export interface Khachhang {
    MA_KHANG: string;
    TEN_KHANG: string;
    DTHOAI: string;
    MA_HDONG:string;
    MA_KHTT:string;
    MANHOM_KHANG:string
    LOAI_KHANG:string;
    DIA_CHI_KH:string;
    MA_DDO:string;
    SO_HO:string;
    LOAI_DDO:string;
    DIA_CHI_DDO:string;
    KIMUA_CSPK:string;
    SO_PHA:string;
    MA_SOGCS:string;
    KVUC_STT:string;
    MA_TRAM:string;
    MA_LO:string;
    MA_TO:string;
    MA_LOAIHD:string;
    MA_CAPDA:string;
    NGAY_HLUC_DDO:string;
    NGAY_HLUC:string;
    DA_TLY:string;
    DTHOAI_DVU:string;
    SO_COT:string;
    TEN_TRAM:string;
    TEN_CAPDA:string;
    TENNHOM_KHANG:string;
    TEN_LOAIHD:string;
    TENLOAI_DDO:string;
    MA_DVIQLY:string;
    CHUOI_GIA:string;
};
export interface KhachhangSearchModel {
    strMaDViQLy: string;
    nLoaiTimKiem: number;
    strGiaTriTimKiem: string;
    bGetHetHLuc:boolean;
}
export class KhachHangMDSDDModelResult{
    MUC_DICH_SU_DUNG_DIEN: string;
    TY_LE: string;
    GIO_BINH_THUONG: string;
    GIO_CAO_DIEM: string;
    GIO_THAP_DIEM:string;
    constructor(mucdich:string,tyle:string,giobinhthuong:string,giocaodiem:string,giothapdiem:string){
        this.MUC_DICH_SU_DUNG_DIEN = mucdich;
        this.TY_LE = tyle;
        this.GIO_BINH_THUONG = giobinhthuong;
        this.GIO_CAO_DIEM = giocaodiem;
        this.GIO_THAP_DIEM = giothapdiem;
    }
    public layDuLieu(){
        return{
            MUC_DICH_SU_DUNG_DIEN: this.MUC_DICH_SU_DUNG_DIEN,
            TY_LE: this.TY_LE,
            GIO_BINH_THUONG: this.GIO_BINH_THUONG,
            GIO_CAO_DIEM: this.GIO_CAO_DIEM,
            GIO_THAP_DIEM: this.GIO_THAP_DIEM,
        }

    }
}
export class KhachHangCSSDDModelResult{
    MUC_DICH_SU_DUNG: string;
    TEN_THIET_BI: string;
    DIEN_AP_SU_DUNG: string;
    CONG_SUAT: number;
    SO_LUONG:number;
    TONG_SO:number;
    constructor(mucdich:string,tenthietbi:string,dienap:string,congsuat:number,soluong:number,tongso:number){
        this.MUC_DICH_SU_DUNG = mucdich;
        this.TEN_THIET_BI = tenthietbi;
        this.DIEN_AP_SU_DUNG = dienap;
        this.CONG_SUAT = congsuat;
        this.SO_LUONG = soluong;
        this.TONG_SO = tongso;
    }
    public layDuLieu(){
        return{
            MUC_DICH_SU_DUNG: this.MUC_DICH_SU_DUNG,
            TEN_THIET_BI: this.TEN_THIET_BI,
            DIEN_AP_SU_DUNG: this.DIEN_AP_SU_DUNG,
            CONG_SUAT: this.CONG_SUAT,
            SO_LUONG: this.SO_LUONG,
            TONG_SO: this.TONG_SO,
        }

    }
}
export class KhachHangModelResult{
    MaKhachHang: string;
    MucDichSuDungDien: any[];
    CongSuatSuDungDien: any[];
    DanhSachAnh: any[];
    constructor(makhachhang:string, mucdichsudung:any[], congsuatsudung: any[], danhsachanh: any[])
    {
        this.MaKhachHang = makhachhang;
        this.MucDichSuDungDien = mucdichsudung;
        this.CongSuatSuDungDien = congsuatsudung;
        this.DanhSachAnh = danhsachanh;
    }
}
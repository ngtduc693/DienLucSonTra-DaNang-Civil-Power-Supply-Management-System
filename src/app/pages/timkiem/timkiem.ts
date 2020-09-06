export interface TimKiem {
    MKH:number,
    DiaChi:string,
    MaTram:string,
    TuyChon:string
}
export interface DuLieuKhachHang {
    MKH:string,
    DULIEUCHITIET:DuLieuKhachHangChiTiet,
    NTL:string,
    THOIDIEMTAO: string,
    TEN_KHANG: string;
    DTHOAI: string;
    DIA_CHI_DDO:string;
    DIA_CHI_KH:string;
}
export interface DuLieuKhachHangChiTiet {
    CongSuatSD : string[],
    TyLeGiaBanDien: string[]
}


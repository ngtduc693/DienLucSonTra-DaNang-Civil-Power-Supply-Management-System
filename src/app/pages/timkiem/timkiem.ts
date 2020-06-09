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
}
export interface DuLieuKhachHangChiTiet {
    CongSuatSD : string[],
    TyLeGiaBanDien: string[]
}


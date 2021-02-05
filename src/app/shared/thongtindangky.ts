import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

export interface ThongTinDangKy {
    Buoc1: Buoc1,
    Buoc2: Buoc2,
    Buoc3: Buoc3,
    Buoc4: Buoc4,
    Buoc5: Buoc5,
    Buoc7: Buoc7,
    Buoc8: Buoc8,
};

export interface Buoc1{
    TEN_TO_CHUC_CA_NHAN : string;
    MA_SO_THUE : string;
    DAI_DIEN : string;
    CHUC_VU : string;
    CMND : string;
    NGAY_CAP : string;
    NOI_CAP : string;
    DIEN_THOAI : string;
    GIAY_UY_QUYEN_SO : string;
    NGAY_UY_QUYEN : string;
    MA_KHACH_HANG : string;
    DIA_DIEM_DU_AN : string;
    TONG_CONG_SUAT : string;
    CONG_SUAT_BO_INVERTER : string;
    SO_PHA : string;
}
export interface Buoc2{
    KHACH_HANG : string,
    MA_KHACH_HANG: string,
    CONG_SUAT_INVERTER: string,
    CONG_SUAT_TONG_HE_THONG_PIN : string,
    CAP_DIEN_AP_DAU_NOI : string,
    DIA_CHI_DU_AN: string,
    DIEM_DAU_NOI: string,
    TBA: string,
    THUOC_TAI_SAN: string,
    MA_TRAM:string,
    THUOC_XT: string,
    DUNG_LUONG_TBA: string,
    CAP_DIEN_AP_DO_DIEM: string,
    VI_TRI_LAP_DAT_DO_DIEM: string,
    TONG_CONG_SUAT_DAU_NOI_1: string,
    DIEU_KIEN_DAU_NOI: boolean,
    CONG_SUAT_DAU_NOI_CUA_KHACH_HANG: boolean,
    DUONG_DAY_HA_AP: boolean,
    TONG_CONG_SUAT_DAU_NOI_2: string,
    CONG_SUAT_GIAI_TOA: string,
    DIEU_KIEN_HA_AP: boolean,
}
export interface Buoc3{
    CHU_DAU_TU:string,
    TONG_CONG_SUAT_CAC_BO_INVERTER:string,
    VI_TRI_DAU_NOI:string,
    DUONG_DAY_TRAM_BIEN_AP:string,
}


export interface Buoc4{
    HO_VA_TEN:string,
    CMND:string,
    NGAY_CAP:string,
    NOI_CAP:string,
    DAI_DIEN:string,
    DIA_CHI:string,
    DIEN_THOAI:string,
    EMAIL:string,
    CONG_SUAT:string,
    CONG_TRINH_XAY_DUNG_TAI: string
}

export interface Buoc5{
    TEN_TO_CHUC_CA_NHAN : string;
    MA_SO_THUE : string;
    DAI_DIEN : string;
    CHUC_VU : string;
    CMND : string;
    NGAY_CAP : string;
    NOI_CAP : string;
    EMAIL:string;
    DIEN_THOAI : string;
    GIAY_UY_QUYEN_SO : string;
    NGAY_UY_QUYEN : string;
    TAI_KHOAN_NHAN_TIEN : string;
    TEN_CHU_TAI_KHOAN : string;
    SO_TAI_KHOAN : string;
    NGAN_HANG : string;
    DIA_DIEM_DU_AN : string;
    CONG_SUAT_DU_AN : string;
    TAM_PIN_MAT_TROI_LOAI : string;
    CONG_SUAT_1 : string;
    SO_TAM : string;
    CUA_NHA_SAN_SUAT1 : string;
    BO_INVERTER_LOAI : string;
    CONG_SUAT_INVERTER : string;
    CUA_NHA_SAN_SUAT2 : string;
    CAP_DIEN_AP_DAU_NOI : string;
    SO_PHA : string;
    MA_KHACH_HANG : string;
    DIA_DIEM_SU_DUNG_HIEN_TAI : string;
}

export interface Buoc7{
    TEN_KHACH_HANG:string,
    MA_KHACH_HANG:string,
    DIA_CHI:string,
    LO_TRINH:string,
    VI_TRI:string,
}

export interface Buoc8{
    TEN_KHACH_HANG:string,
    MA_KHACH_HANG:string,
    DIA_CHI:string,
    DIEN_THOAI:string,
    EMAIL:string,
    CMND:string,
    NGAY_CAP:string,
    NOI_CAP:string,
    CONG_SUAT:['',],
    DIA_CHI_VAN_HANH:['',],
    SO_TAI_KHOAN:string,
    NGAN_HANG:string,
    TEN_TAI_KHOAN:string,
}
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

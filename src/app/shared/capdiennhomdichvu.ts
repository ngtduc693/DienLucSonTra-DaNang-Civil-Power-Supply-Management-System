export class LoaiNhomDichVu {
    Ma: string;
    TenDichVu: string;
    GioBinhThuong: string;
    GioCaoDiem: string;
    GioThapDiem: string;
    TyLe:string;
    constructor(ma:string,gioBinhThuong:string,gioCaoDiem:string, gioThapDiem:string, tenDichVu: string){
        this.Ma = ma;
        this.GioBinhThuong = gioBinhThuong;
        this.GioCaoDiem = gioCaoDiem;
        this.GioThapDiem = gioThapDiem;
        this.TenDichVu = tenDichVu;
    }
}
export class CapDienNhomDichVu {
    private static NhomDichVu : LoaiNhomDichVu[] = [
        new LoaiNhomDichVu('SH','SHBT','SHBT','SHBT','Sinh hoạt'),
        new LoaiNhomDichVu('KD6','2666','4587','1622','Kinh doanh (dưới 6KV)'),
        new LoaiNhomDichVu('KD622','2629','4400','1547','Kinh doanh (6KV - 22KV)'),        
        new LoaiNhomDichVu('KD22','2442','4251','1361','Kinh doanh (trên 22KV)'),
        new LoaiNhomDichVu('SXBT6','1685','3076','1100','Sản xuất bình thường (dưới 6KV)'),
        new LoaiNhomDichVu('SXBT622','1611','2964','1044','Sản xuất bình thường (6KV - 22KV)'),
        new LoaiNhomDichVu('SXBT22110','1555','2871','1007','Sản xuất bình thường (22KV - 110KV)'),
        new LoaiNhomDichVu('SXBT110','1536','2759','970','Sản xuất bình thường (trên 110KV)'),
        new LoaiNhomDichVu('SXCN6','1581','2908','1024','Sản xuất công nghiệp (dưới 6KV)'),
        new LoaiNhomDichVu('SXCN22110','1526','2817','989','Sản xuất công nghiệp (22KV - 110KV)'),
        new LoaiNhomDichVu('SX','1685','1685','1685','Sản xuất'),
        new LoaiNhomDichVu('KD','2666','2666','2666','Kinh doanh'),
        new LoaiNhomDichVu('HCSN','1902','1902','1902','Hành chính sự nghiệp'),
        new LoaiNhomDichVu('HCSNBV','1771','1771','1771','Hành chính sự nghiệp (Bệnh viện, trường học,...)'),
    ];
    constructor(){}
    public static layNhomDichVu  (maCanTim:string, tyLe:string){
        let nhomDichVu =  this.NhomDichVu.find(value=>value.Ma = maCanTim);
        nhomDichVu.TyLe = tyLe;
        return nhomDichVu;
    };
    public static layDanhSachNhomDichVu  (){
        
        return this.NhomDichVu;
    };

}

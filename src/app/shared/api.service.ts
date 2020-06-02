import { Injectable , NgZone} from '@angular/core';
import { HttpClient,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TimKiemKhachHangComponent } from '../pages/timkiem/khachhang/timkiemkhachhang.component';
import { Khachhang,KhachhangSearchModel } from '../shared/khachhang';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AuthService} from "../auth/auth-service.service";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static MaDonViQuanLy : string = 'PP0500';
  public api_timkiemkhachhang : string = "http://10.72.2.68/ServiceHopDong-HopDong-context-root/resources/serviceHopDong/timKiemKhachHang";
  public api_local_timkiemkhachhang : string = "../../assets/data/PP05000944648.json";
  constructor(private httpClient: HttpClient,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public userLogined: AuthService,
     // NgZone service to remove outside scope warning
    ) { 

  }
  public async luuDuLieuLenMayChu(data) {
    await new Promise<any>((resolve, reject) =>{
       console.log((JSON.parse(data)));
        this.afs
            .collection('Data').doc((JSON.parse(data)).MKH)
            .set(JSON.parse(data));
    });
  }
  public async layDuLieuTuMayChu() {
    let danhSachNSD = await this.layDanhSachNguoiSuDungTuMayChu();
    console.log(danhSachNSD);
  }
  public async layDanhSachNguoiSuDungTuMayChu() {
    let snapshot = await new Promise<any>((resolve, reject) =>{
        this.afs.collection('Data').get();
    });
    return snapshot.docs.map(doc => doc.data());

  }
  public onTimKiemKhachHang(data:KhachhangSearchModel):Observable<string> {
    return this.httpClient.post<string>(this.api_timkiemkhachhang, data, httpOptions)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      //catchError(this.handleError('onTimKiemKhachHang', data)) // then handle the error
    );
   

  }
  public onTimKiemKhachHang_Local(data:KhachhangSearchModel): Observable<HttpResponse<Khachhang[]>> {
    return this.httpClient.get<Khachhang[]>(
      this.api_local_timkiemkhachhang, { observe: 'response' });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

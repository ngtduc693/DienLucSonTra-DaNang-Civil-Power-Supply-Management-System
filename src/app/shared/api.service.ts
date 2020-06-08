import { Injectable, NgZone } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { TimKiemKhachHangComponent } from "../pages/timkiem/khachhang/timkiemkhachhang.component";
import { Khachhang, KhachhangSearchModel } from "../shared/khachhang";
import { Observable, throwError } from "rxjs";
import { catchError, retry, takeUntil, take } from "rxjs/operators";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage, AngularFireStorageModule, AngularFireUploadTask, AngularFireStorageReference } from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  
  
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth-service.service";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/xml",
    Authorization: "jwt-token",
  }),
};
@Injectable({
  providedIn: "root",
})
export class ApiService {
  public static MaDonViQuanLy: string = "PP0500";
  public api_timkiemkhachhang: string =
    "http://10.72.2.68/ServiceHopDong-HopDong-context-root/resources/serviceHopDong/timKiemKhachHang";
  public api_local_timkiemkhachhang: string =
    "../../assets/data/PP05000944648.json";
  constructor(
    private httpClient: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    //public fsd: AngularFirestoreDocument,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public userLogined: AuthService,
    private storage: AngularFireStorage
  ) // NgZone service to remove outside scope warning
  {}
  public async luuDuLieuLenMayChu(data) {
    await this.afs
      .collection("Data")
      .doc(JSON.parse(data).MKH)
      .set(JSON.parse(data));
  }
  public async layDuLieuTuMayChu() {
      return await this.afs.collection("Data").valueChanges().pipe(take(1)).toPromise();
    
  }
  // public async taiTepLenFirebase() {
  //   const task = this.storage.upload("","");
  //   task
  //     .snapshotChanges()
  //     .pipe(t(1)).toPromise().then()

  //       finally(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  public onTimKiemKhachHang(data: KhachhangSearchModel): Observable<HttpResponse<Khachhang[]>> {
    return this.httpClient.get<Khachhang[]>(this.api_timkiemkhachhang, {
      observe: "response",
    });
  }
  public onTimKiemKhachHang_Local(
    data: KhachhangSearchModel
  ): Observable<HttpResponse<Khachhang[]>> {
    return this.httpClient.get<Khachhang[]>(this.api_local_timkiemkhachhang, {
      observe: "response",
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}

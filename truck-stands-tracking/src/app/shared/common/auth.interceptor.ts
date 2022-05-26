import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, finalize, retry} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toastrService: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.isLoggedIn()) {
      return next.handle(request);
    }
    const modifiedReq = request.clone({
      params: new HttpParams().set('access_token', this.authService.getAccessToken())
    });
    return next.handle(modifiedReq).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.authService.refreshToken();
        } else if (error.status === 200) {
        }else if (error.status >= 400 && error.status < 500) {
          // this.auth.logout();
          this.toastrService.error(`${error.status}: ${error.statusText}`)
        } else {
          const errorMessage = this.setError(error);
          this.toastrService.error(errorMessage);
        }
        return throwError(error);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      //Clint side error
      errorMessage = error.error.message;
    } else {
      //  server side error
      errorMessage = 'Internal Server Error';
      //   if(error.status !== 0){
      //     errorMessage = error.error;
      //   }
    }
    return errorMessage;
  }
}

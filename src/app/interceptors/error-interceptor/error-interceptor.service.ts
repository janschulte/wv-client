import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ToastService } from '../../components/toast/toast-container/toast-container.service';
import { ToastType } from './../../components/toast/toast-container/toast-container.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toast: ToastService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Http-Response --->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const message = error && error.message ? error.message : '';
        this.toast.show(message, { type: ToastType.Warn });
        return throwError(error);
      })
    );
  }

}

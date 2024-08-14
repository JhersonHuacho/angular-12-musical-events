import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IResponse } from '../services/api/api-models-base.interface';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()
export class ErrorApiInterceptor implements HttpInterceptor {
	constructor(
		private _toastEvokeService: ToastEvokeService,
		private _ngxService: NgxUiLoaderService
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		console.log('Request intercepted ErrorInterceptor: url', request.url);

		this._ngxService.start();

		return next.handle(request).pipe(
			finalize(() => this._ngxService.stop()),
			tap((response) => {
				if (response instanceof HttpResponse && response.status === 200) {
					const responseModel = response.body as IResponse;
					this.captureResponse200(responseModel);
				}

				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				this.errorsHttpClient(error);
				return throwError(() => error);
				// return EMPTY;
			})
		);
	}

	private errorsHttpClient(httpErrorResponse: HttpErrorResponse): void {
		switch (httpErrorResponse.status) {
			case 0:
			case 500:
			case 400:
				this._toastEvokeService.danger('Error', 'Ups, ocurrio un error inesperado, intenta nuevamente');
				break;
			case 404:
				this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
				break;
		}
	}

	private captureResponse200(response: IResponse) {
		if (!response.success) {
			this._toastEvokeService.danger('Error', response.errorMessage);
		}
	}
}

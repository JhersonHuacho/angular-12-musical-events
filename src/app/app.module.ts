import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ContainerModule } from './commons/components/container/container.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import LocaleEsAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { SharedFormCompleteModule } from './commons/shared/shared-form-complete.module';
import { SharedComponentsModule } from './commons/shared/shared-components.module';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

registerLocaleData(LocaleEsPe);
registerLocaleData(LocaleEsAR);

@NgModule({
	declarations: [AppComponent, BuyPageComponent, HomePageComponent, NotFoundPageComponent, MyAccountComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		ContainerModule,
		SharedComponentsModule,
		SharedFormCompleteModule,
		AppRoutingModule,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot(),
		DialogConfigModule.forRoot(),
		ConfirmBoxConfigModule.forRoot(),
		ToastNotificationConfigModule.forRoot()
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{ provide: LOCALE_ID, useValue: 'es-AR' },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorApiInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

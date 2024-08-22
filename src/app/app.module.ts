import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContainerModule } from './commons/components/container/container.module';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import LocaleEsAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { SharedFormCompleteModule } from './commons/shared/shared-form-complete.module';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { SharedComponentsModule } from './commons/shared/shared-components.module';

registerLocaleData(LocaleEsPe);
registerLocaleData(LocaleEsAR);

@NgModule({
	declarations: [AppComponent, HomePageComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ContainerModule,
		SharedFormCompleteModule,
		SharedComponentsModule,
		MatButtonModule,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
		DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
		ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
		ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
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

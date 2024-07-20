import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoveryPasswordPageComponent } from './pages/recovery-password-page/recovery-password-page.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ContainerModule } from './commons/components/container/container.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import LocaleEsPe from '@angular/common/locales/es-PE';
import LocaleEsAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { SharedFormCompleteModule } from './commons/shared/shared-form-complete.module';

registerLocaleData(LocaleEsPe);
registerLocaleData(LocaleEsAR);

@NgModule({
	declarations: [
		AppComponent,
		BuyPageComponent,
		HomePageComponent,
		NotFoundPageComponent,
		RegisterPageComponent,
		RecoveryPasswordPageComponent,
		MyAccountComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatButtonModule,
		ContainerModule,
		SharedFormCompleteModule,
		AppRoutingModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{ provide: LOCALE_ID, useValue: 'es-AR' }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}

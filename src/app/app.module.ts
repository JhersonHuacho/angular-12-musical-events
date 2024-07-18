import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './commons/components/container/components/header/header.component';
import { FooterComponent } from './commons/components/container/components/footer/footer.component';
import { ContainerComponent } from './commons/components/container/container.component';
import { CardEventComponent } from './commons/components/card-event/card-event.component';
import { CardMenusComponent } from './commons/components/card-menus/card-menus.component';
import { BuyPageComponent } from './pages/buy-page/buy-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoveryPasswordPageComponent } from './pages/recovery-password-page/recovery-password-page.component';
import { RestorePasswordPageComponent } from './pages/restore-password-page/restore-password-page.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ContainerComponent,
		CardEventComponent,
		CardMenusComponent,
		BuyPageComponent,
		HomePageComponent,
		LoginPageComponent,
		NotFoundPageComponent,
		RegisterPageComponent,
		RecoveryPasswordPageComponent,
		RestorePasswordPageComponent,
		MaintenanceComponent,
		MyAccountComponent
	],
	imports: [BrowserModule, BrowserAnimationsModule, MatButtonModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

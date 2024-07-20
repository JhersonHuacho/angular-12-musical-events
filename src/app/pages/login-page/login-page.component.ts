import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_MAINTENANCE_PAGES, PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
	title = 'INICIO DE SESISIÓN';
	disabledButton = false;

	constructor(private _router: Router) {}

	clickLogin(): void {
		console.log('clickLogin');
		this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
	}
}

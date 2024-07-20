import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_MAINTENANCE_PAGES, PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { ChannelHeaderService } from 'src/app/commons/services/local/channel-header.service';

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

	constructor(
		private _router: Router,
		private _channelHeaderService: ChannelHeaderService
	) {}

	clickLogin(): void {
		console.log('clickLogin');
		this._channelHeaderService.showUser(true);
		this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
	}
}

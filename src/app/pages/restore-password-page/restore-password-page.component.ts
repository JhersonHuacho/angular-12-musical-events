import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';

@Component({
	selector: 'app-restore-password-page',
	templateUrl: './restore-password-page.component.html',
	styleUrls: ['./restore-password-page.component.scss']
})
export class RestorePasswordPageComponent {
	private _token?: string;
	private _email?: string;

	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) {
		console.log(this._activatedRoute);
		console.log(this._activatedRoute.snapshot.params['email']);
		console.log(this._activatedRoute.snapshot.queryParams);
		this._captureData();
	}

	private _captureData(): void {
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras && navigation.extras.state) {
			this._token = navigation.extras.state['token'] as string;
		}

		if (this._activatedRoute.snapshot.params['email']) {
			this._email = this._activatedRoute.snapshot.params['email'] as string;
		}

		if (this._activatedRoute.snapshot.queryParams) {
			console.log(this._activatedRoute.snapshot.queryParams);
		}

		if (!this._token || !this._email) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.recoverPasswordPage.withSlash);
		}
	}
}

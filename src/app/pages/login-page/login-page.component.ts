import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES, PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { IDataUser } from 'src/app/commons/models/data-user';
import { IResponseLogin } from 'src/app/commons/services/api/user/user-api-model.interface';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { ChannelHeaderService } from 'src/app/commons/services/local/channel-header.service';
import { LocalStorageService } from 'src/app/commons/services/local/storage/local-storage.service';
import { SessionStorageService } from 'src/app/commons/services/local/storage/storage.service';

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
		private _channelHeaderService: ChannelHeaderService,
		private _formBuilder: FormBuilder,
		private _userApiService: UserApiService,
		private _localStorageService: LocalStorageService,
		private _sessionStorageService: SessionStorageService
	) {}

	formGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	});

	formGroupBuilder = this._formBuilder.group({
		email: ['huachin@gmail.com', [Validators.required, Validators.email]],
		password: ['password234', Validators.required]
	});

	clickLogin(): void {
		console.log('clickLogin', this.formGroup.value);
		console.log('clickLogin', this.formGroup.getRawValue());
		console.log('clickLogin', this.formGroup.valid);
		console.log('clickLogin', this.formGroup.invalid);
		console.log('clickLogin Angular 12', this.formGroup.get('email')?.value);
		console.log('clickLogin Angular 14', this.formGroup.controls.email.value);

		if (this.formGroup.valid) {
			this.disabledButton = true;
			// this._userApiService.login(this.formGroup.value).subscribe(
			const { email, password } = this.formGroup.getRawValue();

			this._userApiService.login({ user: email, password }).subscribe({
				next: (response) => {
					console.log('response', response);
					if (response.success) {
						// localStorage.setItem('token', response.token);
						//this._localStorageService.setItem('token', response.token);
						this.saveDataUserAndRedirect(response);
					}
				}
			});
		}
	}

	private saveDataUserAndRedirect(response: IResponseLogin): void {
		const dataUser: IDataUser = {
			token: response.token,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrador'
		};

		this._sessionStorageService.setItem('datauser', dataUser);
		this.redirectUser(dataUser.isAdmin);
	}

	private redirectUser(isAdmin: boolean): void {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;
		this._router.navigateByUrl(url);
		this._channelHeaderService.showUser(true);
	}
}

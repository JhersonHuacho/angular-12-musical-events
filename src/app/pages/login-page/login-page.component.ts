import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
		private _channelHeaderService: ChannelHeaderService,
		private _formBuilder: FormBuilder
	) {}

	formGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	});

	formGroupBuilder = this._formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	});

	clickLogin(): void {
		console.log('clickLogin', this.formGroup.value);
		console.log('clickLogin', this.formGroup.getRawValue());
		console.log('clickLogin', this.formGroup.valid);
		console.log('clickLogin', this.formGroup.invalid);
		console.log('clickLogin Angular 12', this.formGroup.get('email')?.value);
		console.log('clickLogin Angular 14', this.formGroup.controls.email.value);

		this._channelHeaderService.showUser(true);
		this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
	}
}

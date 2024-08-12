import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { DemoService } from 'src/app/commons/services/demo.service';
import { customPasswordValidator } from 'src/app/commons/validators/form.validator';
import { crossPasswordMatchingValidator, PasswordStateMatcher } from './register-custom-validators';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	providers: [DemoService]
})
export class RegisterPageComponent implements OnInit {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;
	passwordStateMatcher = new PasswordStateMatcher();

	constructor(private _formBuilder: FormBuilder) {}

	formGroup = this._formBuilder.group(
		{
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			typeDocument: new FormControl(null, Validators.required),
			documentNumber: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [customPasswordValidator, Validators.required]],
			confirmPassword: ['', Validators.required],
			age: new FormControl(null)
		},
		{ validators: crossPasswordMatchingValidator }
	);

	ngOnInit(): void {}

	clickRegister(): void {
		console.log('clickRegister', this.formGroup.errors);
		console.log('clickRegister', this.formGroup.controls.password.errors);
	}

	get firtsField(): FormControl {
		return this.formGroup.get('firstName') as FormControl;
	}

	get lastNameField(): FormControl {
		return this.formGroup.get('lastName') as FormControl;
	}

	get typeDocumentField(): FormControl {
		return this.formGroup.get('typeDocument') as FormControl;
	}

	get documentNumberField(): FormControl {
		return this.formGroup.get('documentNumber') as FormControl;
	}

	get emailField(): FormControl {
		return this.formGroup.get('email') as FormControl;
	}

	get passwordField(): FormControl {
		return this.formGroup.get('password') as FormControl;
	}

	get confirmPasswordField(): FormControl {
		return this.formGroup.get('confirmPassword') as FormControl;
	}

	get ageField(): FormControl {
		return this.formGroup.get('age') as FormControl;
	}
}

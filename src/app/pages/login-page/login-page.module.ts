import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from 'src/app/commons/shared/shared-form-basic.module';

const routes: Routes = [
	{
		path: '',
		component: LoginPageComponent
	}
];

@NgModule({
	declarations: [LoginPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule]
})
export class LoginPageModule {}

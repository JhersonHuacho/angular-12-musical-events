import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestorePasswordPageComponent } from './restore-password-page.component';
import { SharedFormBasicModule } from 'src/app/commons/shared/shared-form-basic.module';

export const routes: Routes = [
	{
		path: '',
		component: RestorePasswordPageComponent
	}
];

@NgModule({
	declarations: [RestorePasswordPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule]
})
export class RestorePasswordPageModule {}

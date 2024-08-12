import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page.component';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';

const routes: Routes = [
	{
		path: '',
		component: RegisterPageComponent
	}
];

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [RouterModule.forChild(routes), CommonModule, RouterModule, SharedFormCompleteModule]
})
export class RegisterPageModule {}

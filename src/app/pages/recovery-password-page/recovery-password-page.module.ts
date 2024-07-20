import { NgModule } from '@angular/core';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { RecoveryPasswordPageComponent } from './recovery-password-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [RecoveryPasswordPageComponent],
	imports: [SharedFormCompleteModule, RouterModule]
})
export class RecoveryPasswordPageModule {}

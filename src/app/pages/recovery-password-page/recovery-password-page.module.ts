import { NgModule } from '@angular/core';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { RecoveryPasswordPageComponent } from './recovery-password-page.component';

@NgModule({
	declarations: [RecoveryPasswordPageComponent],
	imports: [SharedFormCompleteModule]
})
export class RecoveryPasswordPageModule {}

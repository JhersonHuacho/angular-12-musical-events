import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyPageComponent } from './buy-page.component';
import { CardEventComponent } from 'src/app/commons/components/card-event/card-event.component';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { SharedComponentsModule } from 'src/app/commons/shared/shared-components.module';

@NgModule({
	declarations: [BuyPageComponent],
	imports: [CommonModule, SharedFormCompleteModule, SharedComponentsModule]
})
export class BuyPageModule {}

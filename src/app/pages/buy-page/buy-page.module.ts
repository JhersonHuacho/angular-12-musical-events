import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormBasicModule } from 'src/app/commons/shared/shared-form-basic.module';
import { BuyPageComponent } from './buy-page.component';

@NgModule({
	declarations: [BuyPageComponent],
	imports: [CommonModule, SharedFormBasicModule]
})
export class BuyPageModule {}

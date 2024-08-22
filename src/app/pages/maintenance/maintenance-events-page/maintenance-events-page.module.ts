import { NgModule } from '@angular/core';
import { MaintenanceEventsPageComponent } from './maintenance-events-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

export const routes: Routes = [{ path: '', component: MaintenanceEventsPageComponent }];

@NgModule({
	declarations: [MaintenanceEventsPageComponent],
	imports: [
		RouterModule.forChild(routes),
		MatTableModule,
		MatMenuModule,
		MatPaginatorModule,
		MatTabsModule,
		SharedFormCompleteModule
	],
	providers: [DatePipe]
})
export class MaintenanceEventsPageModule {}

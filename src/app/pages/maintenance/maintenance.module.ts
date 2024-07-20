import { NgModule } from '@angular/core';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { SharedComponentsModule } from 'src/app/commons/shared/shared-components.module';
import { RouterModule } from '@angular/router';
import { CardMenusComponent } from 'src/app/commons/components/card-menus/card-menus.component';

@NgModule({
	declarations: [MaintenanceComponent],
	imports: [MaintenanceRoutingModule, SharedComponentsModule, RouterModule]
})
export class MaintenanceModule {}

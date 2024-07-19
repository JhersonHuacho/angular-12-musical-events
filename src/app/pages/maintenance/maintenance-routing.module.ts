import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { PATH_MAINTENANCE_PAGES } from 'src/app/commons/config/path-pages';
import { BuyPageComponent } from '../buy-page/buy-page.component';

const routes: Routes = [
	{
		path: '',
		component: MaintenanceComponent,
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				component: BuyPageComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class MaintenanceRoutingModule {}

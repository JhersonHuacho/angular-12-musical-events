import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { PATH_MAINTENANCE_PAGES } from 'src/app/commons/config/path-pages';
import { MaintenanceGuard } from 'src/app/commons/guards/maintenance.guard';
import { AuthGuard } from 'src/app/commons/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: MaintenanceComponent,
		canActivate: [MaintenanceGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				loadChildren: () =>
					import('./maintenance-buy-page/maintenance-buy-page.module').then((m) => m.MaintenanceBuyPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				loadChildren: () =>
					import('./maintenance-events-page/maintenance-events-page.module').then((m) => m.MaintenanceEventsPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				loadChildren: () =>
					import('./maintenance-reports-page/maintenance-reports-page.module').then(
						(m) => m.MaintenanceReportsPageModule
					)
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: PATH_MAINTENANCE_PAGES.buy.onlyPath
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class MaintenanceRoutingModule {}

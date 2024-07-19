import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PATH_MAINTENANCE_PAGES, PATHS_AUTH_PAGES } from './commons/config/path-pages';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent
	},
	{
		path: PATHS_AUTH_PAGES.loginPage.onlyPath,
		loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule)
	},
	{
		path: PATH_MAINTENANCE_PAGES.onlyPath,
		loadChildren: () => import('./pages/maintenance/maintenance.module').then((m) => m.MaintenanceModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: []
})
export class AppRoutingModule {}

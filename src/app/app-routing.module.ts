import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PATH_MAINTENANCE_PAGES, PATH_NOT_FOUND_PAGE, PATHS_AUTH_PAGES } from './commons/config/path-pages';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

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
	},
	{
		path: PATHS_AUTH_PAGES.recoverPasswordPage.onlyPath,
		loadChildren: () =>
			import('./pages/recovery-password-page/recovery-password-page.module').then((m) => m.RecoveryPasswordPageModule)
	},
	{
		path: `${PATHS_AUTH_PAGES.restorePasswordPage.onlyPath}/:email`, // PATH PARAM
		loadChildren: () =>
			import('./pages/restore-password-page/restore-password-page.module').then((m) => m.RestorePasswordPageModule)
	},
	{
		path: `${PATHS_AUTH_PAGES.registerPage.onlyPath}`, // PATH PARAM
		loadChildren: () => import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule)
	},
	{
		path: PATH_NOT_FOUND_PAGE['not-found'].onlyPath,
		component: NotFoundPageComponent
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: PATH_NOT_FOUND_PAGE['not-found'].onlyPath
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: []
})
export class AppRoutingModule {}

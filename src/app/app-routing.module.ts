import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	PATH_BUY_PAGES,
	PATH_MAINTENANCE_PAGES,
	PATH_MY_ACCOUNT_PAGES,
	PATH_NOT_FOUND_PAGE,
	PATHS_AUTH_PAGES
} from './commons/config/path-pages';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { BuyGuard } from './commons/guards/buy.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './commons/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		canActivate: [BuyGuard],
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
		path: `${PATHS_AUTH_PAGES.registerPage.onlyPath}`, // PATH PARAM
		loadChildren: () => import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule)
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
		path: PATH_BUY_PAGES.buyPage.onlyPath, // PATH PARAM
		canActivate: [BuyGuard],
		loadChildren: () => import('./pages/buy-page/buy-page.module').then((m) => m.BuyPageModule)
	},
	{
		path: PATH_MAINTENANCE_PAGES.onlyPath, // PATH PARAM
		loadChildren: () => import('./pages/maintenance/maintenance.module').then((m) => m.MaintenanceModule)
	},
	{
		path: PATH_MY_ACCOUNT_PAGES.onlyPath, // PATH PARAM
		canActivate: [AuthGuard],
		loadChildren: () => import('./pages/my-account/my-account.module').then((m) => m.MyAccountModule)
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

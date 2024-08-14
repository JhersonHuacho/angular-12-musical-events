import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DataUserService } from '../services/local/storage/data-user.service';
import { PATHS_AUTH_PAGES } from '../config/path-pages';

@Injectable({
	providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
	constructor(
		private _dataUserService: DataUserService,
		private _router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this._dataUserService.isAdmin() === false) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}

		return true;
	}
}

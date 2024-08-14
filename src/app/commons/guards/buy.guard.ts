import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUserService } from '../services/local/storage/data-user.service';
import { PATH_MAINTENANCE_PAGES } from '../config/path-pages';

@Injectable({
	providedIn: 'root'
})
export class BuyGuard implements CanActivate {
	constructor(
		private _dataUserService: DataUserService,
		private _router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this._dataUserService.isAdmin() === true) {
			void this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
			return false;
		}

		return true;
	}
}

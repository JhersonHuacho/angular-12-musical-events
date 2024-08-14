import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataUserService } from '../services/local/storage/data-user.service';
import { ChannelHeaderService } from '../services/local/channel-header.service';
import { SessionStorageService } from '../services/local/storage/storage.service';
import { PATHS_AUTH_PAGES } from '../config/path-pages';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _dataUseService: DataUserService,
		private _channelHeaderService: ChannelHeaderService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.validSession();
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.validSession();
	}

	private validSession(): boolean {
		const isExpiredToken = this._dataUseService.isExpiredToken();

		if (isExpiredToken) {
			this._channelHeaderService.showUser(false);
			this._sessionStorageService.clear();
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}

		return true;
	}
}

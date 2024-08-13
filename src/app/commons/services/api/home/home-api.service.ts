import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IResponseHome } from './home-api.interface';
import { ResponseHome } from './home-api.class';

export const URL_HOME = environment.host + '/home';

@Injectable({
	providedIn: 'root'
})
export class HomeApiService {
	constructor(private _httpClient: HttpClient) {}

	getHome(): Observable<ResponseHome> {
		return this._httpClient.get<IResponseHome>(URL_HOME).pipe(
			map((response) => new ResponseHome(response)),
			tap((response) => console.log(response))
		);
	}
}

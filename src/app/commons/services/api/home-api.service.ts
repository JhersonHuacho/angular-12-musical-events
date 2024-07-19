import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_HOME = environment.host + '/home';

@Injectable({
	providedIn: 'root'
})
export class HomeApiService {
	constructor(private _httpClient: HttpClient) {}

	getHome(): Observable<Object> {
		return this._httpClient.get(URL_HOME);
	}
}

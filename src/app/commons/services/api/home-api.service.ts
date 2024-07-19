import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeApiService {
	constructor(private _httpClient: HttpClient) {}

	getHome(): Observable<Object> {
		return this._httpClient.get('https://api.example.com/home');
	}
}

import { Component, OnInit } from '@angular/core';
import { ICardEvent } from 'src/app/commons/models/components.interface';
import { IHomeGenres } from 'src/app/commons/services/api/home/home-api.interface';
import { HomeApiService } from 'src/app/commons/services/api/home/home-api.service';
import { DemoService } from 'src/app/commons/services/demo.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	listGenres: IHomeGenres[] = [];
	listEvents: ICardEvent[] = [];

	constructor(
		private _demoService: DemoService,
		private _homeService: HomeApiService
	) {
		console.log(_demoService.getMessages());
	}

	ngOnInit(): void {
		this._homeService.getHome().subscribe({
			next: (response) => {
				console.log(response);
				this.listGenres = response.genres;
				this.listEvents = response.getDataCardEvent();
			}
		});
	}
}

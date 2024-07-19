import { Component, OnInit } from '@angular/core';
import { HomeApiService } from 'src/app/commons/services/api/home-api.service';
import { DemoService } from 'src/app/commons/services/demo.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	constructor(
		private _demoService: DemoService,
		private _homeService: HomeApiService
	) {
		console.log(_demoService.getMessages());
	}

	ngOnInit(): void {
		this._homeService.getHome().subscribe((response) => {
			console.log(response);
		});
	}
}

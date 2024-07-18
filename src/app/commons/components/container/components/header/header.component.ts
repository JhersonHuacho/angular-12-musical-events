import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Angular 12';
	constructor() {}

	ngOnInit(): void {
		console.log('HeaderComponent initialized');
	}
}

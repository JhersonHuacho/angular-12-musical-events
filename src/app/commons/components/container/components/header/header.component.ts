import { Component, OnInit } from '@angular/core';
import { ChannelHeaderService } from 'src/app/commons/services/local/channel-header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	title = 'Angular 12';
	constructor(private _channelHeaderService: ChannelHeaderService) {
		this._channelHeaderService.$channelHeader.subscribe((response) => {
			console.log('HeaderComponent response: ', response);
		});
	}

	ngOnInit(): void {
		console.log('HeaderComponent initialized');
	}
}

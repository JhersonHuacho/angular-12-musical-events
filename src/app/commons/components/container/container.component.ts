import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {
	@ViewChild('header') header?: HeaderComponent;

	constructor() {}

	ngOnInit(): void {
		console.log('ContainerComponent initialized');
		console.log(this.header);
	}

	ngAfterViewInit(): void {
		console.log(this.header);
	}
}

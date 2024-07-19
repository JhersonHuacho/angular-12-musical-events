import { Component } from '@angular/core';
import { DemoService } from './commons/services/demo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angular-musical-events-modulos hola dede';

	constructor(private _demoService: DemoService) {}
}

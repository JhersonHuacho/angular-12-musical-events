import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/commons/services/demo.service';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
	providers: [DemoService]
})
export class RegisterPageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { ICardMenu } from '../../models/components.interface';

@Component({
	selector: 'app-card-menus',
	templateUrl: './card-menus.component.html',
	styleUrls: ['./card-menus.component.scss']
})
export class CardMenusComponent {
	@Input() menus: ICardMenu[] = [];

	constructor() {}

	clickMenu(menu: ICardMenu): void {}
}

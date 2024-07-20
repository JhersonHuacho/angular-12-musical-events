import { Component, Input, OnInit } from '@angular/core';
import { ICardEvent } from '../../models/components.interface';

@Component({
	selector: 'app-card-event',
	templateUrl: './card-event.component.html',
	styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent implements OnInit {
	@Input() event?: ICardEvent;

	isSelect = true;

	constructor() {}

	ngOnInit(): void {}
}

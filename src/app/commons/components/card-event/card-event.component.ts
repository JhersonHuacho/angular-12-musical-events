import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICardEvent } from '../../models/components.interface';

@Component({
	selector: 'app-card-event',
	templateUrl: './card-event.component.html',
	styleUrls: ['./card-event.component.scss']
})
export class CardEventComponent {
	@Input() event?: ICardEvent;
	@Output() clickCard = new EventEmitter<ICardEvent>();

	isSelect = false;

	constructor() {}

	clickEvent(): void {
		this.isSelect = !this.isSelect;
		this.clickCard.emit(this.event);
	}
}

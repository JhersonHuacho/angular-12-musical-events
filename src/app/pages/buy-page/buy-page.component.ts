import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-buy-page',
	templateUrl: './buy-page.component.html',
	styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit {
	currentDate = new Date();
	statusBuy: StatusBuy = 'INFO';

	constructor() {}

	ngOnInit(): void {}

	clickBuy(statusBuy: StatusBuy): void {
		this.statusBuy = statusBuy;
	}
}

type StatusBuy = 'INFO' | 'BUY' | 'VOUCHER';

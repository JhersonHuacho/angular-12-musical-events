import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConcertApiService } from 'src/app/commons/services/api/concerts/concert-api.service';
import { IRequestCreateUpdateConcert } from 'src/app/commons/services/api/concerts/concert-api-model.interface';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { MaintenanceEventsPageService } from './maintenance-events-page.service';
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	styleUrls: ['./maintenance-events-page.component.scss'],
	providers: [MaintenanceEventsPageService]
})
export class MaintenanceEventsPageComponent implements OnInit {
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	formGroup!: FormGroup;
	listGenres: IResponseGenre[] = [];

	constructor(
		private _genreApiService: GenreApiService,
		private _formBuilder: FormBuilder,
		private _concertApiService: ConcertApiService
	) {}

	ngOnInit(): void {
		this._loadGenres();
		this._loadEvents();
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		if (this.formGroup.valid) {
			const request = this.formGroup.getRawValue() as IRequestCreateUpdateConcert;
			this._concertApiService.createConcert(request);
		}
		console.log(this.formGroup.getRawValue());
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();

				this.fileNameField.setValue(htmlInput.files![0].name);
				this.imageField.setValue(resultImageFile);
			};
		}
	}

	private _loadEvents(): void {
		this._concertApiService.getListConcerts(1, 5).subscribe((response: any) => {
			console.log(response);
		});
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.data) {
				this.listGenres = response.data;
			}
		});
	}
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConcertApiService } from 'src/app/commons/services/api/concerts/concert-api.service';
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

export interface IEventForm {
	id: FormControl;
	title: FormControl;
	description: FormControl;
	date: FormControl;
	hour: FormControl;
	ticketsQuantity: FormControl;
	price: FormControl;
	place: FormControl;
	genre: FormControl;
	status: FormControl;
	image: FormControl;
	fileName: FormControl;
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
	styleUrls: ['./maintenance-events-page.component.scss']
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
	) {
		this._loadFormGroup();
	}

	ngOnInit(): void {
		this._loadGenres();
		this._loadEvents();
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
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

	//#region  load Form and getters y setters

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			id: new FormControl(0, Validators.required),
			title: new FormControl('', { validators: Validators.required }),
			description: new FormControl('', { validators: Validators.required }),
			date: new FormControl(new Date(), { validators: Validators.required }),
			hour: new FormControl('', { validators: Validators.required }),
			ticketsQuantity: new FormControl(0, { validators: Validators.required }),
			price: new FormControl(0, { validators: Validators.required }),
			place: new FormControl('', { validators: Validators.required }),
			status: new FormControl(0, { validators: Validators.required }),
			genre: new FormControl(null, { validators: Validators.required }),
			image: new FormControl('', { validators: Validators.required }),
			fileName: new FormControl('', { validators: Validators.required })
		});
	}

	get idField(): FormControl {
		//return this.formGroup.controls.id;
		return this.formGroup.get('id') as FormControl;
	}

	get titleField(): FormControl {
		//return this.formGroup.controls.title;
		return this.formGroup.get('title') as FormControl;
	}

	get descriptionField(): FormControl {
		//return this.formGroup.controls.description;
		return this.formGroup.get('description') as FormControl;
	}

	get dateField(): FormControl {
		//return this.formGroup.controls.date;
		return this.formGroup.get('date') as FormControl;
	}

	get hourField(): FormControl {
		//return this.formGroup.controls.hour;
		return this.formGroup.get('hour') as FormControl;
	}

	get ticketsQuantityField(): FormControl {
		//return this.formGroup.controls.ticketsQuantity;
		return this.formGroup.get('ticketsQuantity') as FormControl;
	}

	get priceField(): FormControl {
		// return this.formGroup.controls.price;
		return this.formGroup.get('price') as FormControl;
	}

	get placeField(): FormControl {
		//return this.formGroup.controls.place;
		return this.formGroup.get('place') as FormControl;
	}

	get genreField(): FormControl {
		// return this.formGroup.controls.genre;
		return this.formGroup.get('genre') as FormControl;
	}

	get statusField(): FormControl {
		//return this.formGroup.controls.status;
		return this.formGroup.get('status') as FormControl;
	}

	get imageField(): FormControl {
		// return this.formGroup.controls.image;
		return this.formGroup.get('image') as FormControl;
	}

	get fileNameField(): FormControl {
		// return this.formGroup.controls.fileName;
		return this.formGroup.get('fileName') as FormControl;
	}

	//#endregion
}

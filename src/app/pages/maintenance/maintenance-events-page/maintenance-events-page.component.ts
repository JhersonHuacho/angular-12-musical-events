import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConcertApiService } from 'src/app/commons/services/api/concerts/concert-api.service';
import {
	IRequestCreateUpdateConcert,
	IResponseConcert
} from 'src/app/commons/services/api/concerts/concert-api-model.interface';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { MaintenanceEventsPageService } from './maintenance-events-page.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CanComponentDeactivate } from 'src/app/commons/guards/form-event.guard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// export interface PeriodicElement {
// 	name: string;
// 	position: number;
// 	weight: number;
// 	symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
// 	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
// 	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
// 	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
// 	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
// 	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
// 	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
// 	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
// 	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
// 	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
// 	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
// ];

@Component({
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	styleUrls: ['./maintenance-events-page.component.scss'],
	providers: [MaintenanceEventsPageService]
})
export class MaintenanceEventsPageComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
	// displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
	// dataSource = new MatTableDataSource(ELEMENT_DATA);
	// formGroup!: FormGroup;
	listGenres: IResponseGenre[] = [];
	//variable para el Tab
	indexTabSaveEvent = 0;
	// variables para la tabla
	displayedColumns: string[] = [
		'imageUrl',
		'title',
		'description',
		'dateEvent',
		'ticketsQuantity',
		'price',
		'genre',
		'status',
		'action'
	];
	dataSource = new MatTableDataSource<IResponseConcert>();
	pageSizeOptions: number[] = [2, 4, 6];
	private _rowsPageBack = 4;
	private _numberPageBack = 1;

	//#region getters Form
	idField = this._maintenanceEventsPageService.idField;
	titleField = this._maintenanceEventsPageService.titleField;
	descriptionField = this._maintenanceEventsPageService.descriptionField;
	dateField = this._maintenanceEventsPageService.dateField;
	hourField = this._maintenanceEventsPageService.hourField;
	ticketsQuantityField = this._maintenanceEventsPageService.ticketsQuantityField;
	priceField = this._maintenanceEventsPageService.priceField;
	placeField = this._maintenanceEventsPageService.placeField;
	genreField = this._maintenanceEventsPageService.genreField;
	statusField = this._maintenanceEventsPageService.statusField;
	imageField = this._maintenanceEventsPageService.imageField;
	fileNameField = this._maintenanceEventsPageService.fileNameField;
	//#region

	private _crudMethod = CRUD_METHOD.SAVE;

	constructor(
		private _genreApiService: GenreApiService,
		// private _formBuilder: FormBuilder,
		private _maintenanceEventsPageService: MaintenanceEventsPageService,
		private _concertApiService: ConcertApiService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService
	) {}

	canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.getRawValue();

		const isThereDataEntered = Object.values(values).find((item) => item);
		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

	formGroup = this._maintenanceEventsPageService.formGroup;

	ngOnInit(): void {
		this._loadEvents();
		this._loadGenres();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		if (this.formGroup.valid) {
			this._maintenanceEventsPageService.saveEvent(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
					this._loadEvents();
				}
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idEvent: number): void {
		this._maintenanceEventsPageService.updateForm(idEvent).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveEvent = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idEvent: number): void {
		this._maintenanceEventsPageService.deleteEvent(idEvent).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idEvent);
			}
		});
	}

	clickFinalize(idEvent: number): void {
		this._maintenanceEventsPageService.endEvent(idEvent);
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

	getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this._numberPageBack++;
			this._loadEvents();
		}
	}

	private _loadEvents(): void {
		this._concertApiService.getListConcerts(this._numberPageBack, this._rowsPageBack).subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._maintenanceEventsPageService.getDataEvents(
						[...this.dataSource.data],
						response.data
					);
				} else {
					this._numberPageBack--;
				}
			}
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

import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { EMPTY, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { IResponse } from 'src/app/commons/services/api/api-models-base.interface';
import {
	IRequestCreateUpdateConcert,
	IResponseConcert
} from 'src/app/commons/services/api/concerts/concert-api-model.interface';
import { ConcertApiService } from 'src/app/commons/services/api/concerts/concert-api.service';
import { CRUD_METHOD, STATUS_CRUD } from 'src/app/commons/util/enums';

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

@Injectable()
export class MaintenanceEventsPageService {
	formGroup!: FormGroup;

	constructor(
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _eventApiService: ConcertApiService,
		private _datePipe: DatePipe,
		private _formBuilder: FormBuilder
	) {
		this._loadFormGroup();
	}

	deleteEvent(idEvent: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Evento?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) =>
				responseQuestion.success ? this._eventApiService.deleteConcert(idEvent) : EMPTY
			),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El evento a sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
			// catchError((error) => {
			// 	this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
			// 	return throwError(() => error);
			// })
		);
	}

	endEvent(idEvent: number): void {
		this._eventApiService.finalizeConcert(idEvent).subscribe((response) => {
			if (response.success) {
				this._toastEvokeService.success('Exito', 'El evento a sido finalizado');
			}
		});
	}

	updateForm(idEvent: number): Observable<IResponse<IResponseConcert>> {
		return this._eventApiService.getConcert(idEvent).pipe(
			tap((response) => {
				if (response.success) {
					const eventResponse = response.data;

					this.idField.setValue(eventResponse.id);
					this.titleField.setValue(eventResponse.title);
					this.descriptionField.setValue(eventResponse.description);
					this.dateField.setValue(new Date(eventResponse.dateEvent));
					this.hourField.setValue(this._datePipe.transform(eventResponse.dateEvent, 'HH:mm')!);
					this.placeField.setValue(eventResponse.place);
					this.ticketsQuantityField.setValue(eventResponse.ticketsQuantity);
					this.priceField.setValue(eventResponse.unitPrice),
						this.genreField.setValue(eventResponse.genre.id),
						this.statusField.setValue(eventResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
					this.imageField.setValue(eventResponse.imageUrl);
				}
			})
		);
	}

	getDataEvents(existingData: IResponseConcert[], responseEvents: IResponseConcert[]): IResponseConcert[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseEvents.filter((eventResponse) => {
				return existingData.some((event) => event.id === eventResponse.id);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseEvents);
			} else {
				newArray = existingData
					.filter((event) => {
						return !responseEvents.some((eventResponse) => eventResponse.id === event.id);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los eventos de manera decendente por id, podemos usar la función sort
			// newArray = newArray.sort((a, b) => b.id - a.id);
			return newArray;
		}

		return responseEvents;
	}

	saveEvent(method: CRUD_METHOD): Observable<boolean> {
		return this._confirmBoxEvokeService
			.warning('Evento', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._getMethod(method, this._getRequest(method)) : EMPTY
				),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}

					return this._succes(false);
				})
			);
	}

	/**
	 * En esta función vamos a retornar el evento que deseamos guardar o modificar; en el caso de las imagenes puede que al momento de seleccionar el evento para poder modificarlo solo modifiquen atributos de texto o número por lo tanto el valor de la imagen es solo una URL asi que no se debería de enviar, recuerden que el API necesita un base64 para crear una imagen.
	 * @param method
	 * @returns
	 */
	private _getRequest(method: CRUD_METHOD): IRequestCreateUpdateConcert {
		const request: IRequestCreateUpdateConcert = <IRequestCreateUpdateConcert>{
			title: this.titleField.value,
			description: this.descriptionField.value,
			dateEvent: this._datePipe.transform(this.dateField.value, 'yyyy-MM-dd'),
			timeEvent: this.hourField.value,
			ticketsQuantity: this.ticketsQuantityField.value,
			unitPrice: this.priceField.value,
			idGenre: this.genreField.value,
			place: this.placeField.value
		};

		const existHttpMitocode = this.imageField.value.search('https://mitocode.blob.core.windows.net');

		if (method === CRUD_METHOD.SAVE || (method == CRUD_METHOD.UPDATE && existHttpMitocode === -1)) {
			const base64 = this.imageField.value.split(',')[1];
			request.base64Image = base64;
			request.fileName = this.fileNameField.value!;
		}

		return request;
	}

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateUpdateConcert): Observable<IResponse<number>> {
		const idEvent = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._eventApiService.createConcert(request)
			: this._eventApiService.updateConcert(idEvent, request);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
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

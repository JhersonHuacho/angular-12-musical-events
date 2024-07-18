import { NgModule } from '@angular/core';
import { CardEventComponent } from '../components/card-event/card-event.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [CardEventComponent, CardEventComponent],
	imports: [MatCardModule],
	exports: [CardEventComponent, CardEventComponent]
})
export class SharedComponentsModule {}

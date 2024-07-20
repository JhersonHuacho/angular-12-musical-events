import { NgModule } from '@angular/core';
import { CardEventComponent } from '../components/card-event/card-event.component';
import { MatCardModule } from '@angular/material/card';
import { CardMenusComponent } from '../components/card-menus/card-menus.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [CardEventComponent, CardMenusComponent],
	imports: [CommonModule, RouterModule, MatCardModule],
	exports: [CardEventComponent, CardMenusComponent]
})
export class SharedComponentsModule {}

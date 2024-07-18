import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContainerComponent } from './container.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ContainerComponent, HeaderComponent, FooterComponent],
	imports: [MatButtonModule],
	exports: [ContainerComponent]
})
export class ContainerModule {}

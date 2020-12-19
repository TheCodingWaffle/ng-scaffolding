import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingModule {}

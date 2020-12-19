import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, RouterModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}

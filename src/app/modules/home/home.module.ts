import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ViewComponent } from './view/view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ViewComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule],
})
export class HomeModule {}

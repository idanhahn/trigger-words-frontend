import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { FooterComponent } from './footer/footer.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CustomersComponent } from './customers/customers.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { CustomerDetailAiComponent } from './customer-detail-ai/customer-detail-ai.component';
import { CustomerDetailDataComponent } from './customer-detail-data/customer-detail-data.component';
import { CustomerDetailChartsComponent } from './customer-detail-charts/customer-detail-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightPanelComponent,
    FooterComponent,
    ListItemComponent,
    CustomersComponent,
    LeftPanelComponent,
    CustomerDetailAiComponent,
    CustomerDetailDataComponent,
    CustomerDetailChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { FooterComponent } from './footer/footer.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CustomersComponent } from './customers/customers.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { CustomerDetailAiComponent } from './customer-detail-ai/customer-detail-ai.component';
import { CustomerDetailDataComponent } from './customer-detail-data/customer-detail-data.component';
import { CustomerDetailChartsComponent } from './customer-detail-charts/customer-detail-charts.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersListItemComponent } from './customers-list-item/customers-list-item.component';
import { LoaderComponent } from './loader/loader.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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
    CustomerDetailChartsComponent,
    CustomersListComponent,
    CustomersListItemComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

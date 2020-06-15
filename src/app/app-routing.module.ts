import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomersComponent} from './customers/customers.component';
import {CustomerDetailAiComponent} from './customer-detail-ai/customer-detail-ai.component';
import {CustomerDetailDataComponent} from './customer-detail-data/customer-detail-data.component';
import {CustomerDetailChartsComponent} from './customer-detail-charts/customer-detail-charts.component';

const routes: Routes = [
  { path: 'customers',
    component: CustomersComponent,
    children: [
      {
        path: ':id/ai',
        component: CustomerDetailAiComponent
      },
      {
        path: ':id/data',
        component: CustomerDetailDataComponent
      },
      {
        path: ':id/charts',
        component: CustomerDetailChartsComponent
      },
      // TODO: Change to default unselected
      {
        path: '',
        redirectTo: 'jsnow/data',
        pathMatch: 'full'
      }
    ]
  },
  //{path: 'main-second', component: MainSecondComponent},
  //{path: 'main-third', component: MainThirdComponent},
  // TODO: Change to default unselected
  {path: '', redirectTo: '/customers/jsnow/data', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

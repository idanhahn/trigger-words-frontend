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
        path: 'ai',
        component: CustomerDetailAiComponent
      },
      {
        path: 'data',
        component: CustomerDetailDataComponent
      },
      {
        path: 'charts',
        component: CustomerDetailChartsComponent
      },
      {
        path: '',
        redirectTo: 'ai',
        pathMatch: 'full'
      }
    ]
  },
  //{path: 'main-second', component: MainSecondComponent},
  //{path: 'main-third', component: MainThirdComponent},
  {path: '', redirectTo: '/customers/ai', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

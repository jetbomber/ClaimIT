import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { CompanyCreateComponent } from './companies/company-create/company-create.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { DivisionDetailsComponent } from './companies/division-details/division-details.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'companies', component: CompanyListComponent},
      {path: 'companies/:id', component: CompanyDetailComponent},
      {path: 'create', component: CompanyCreateComponent},
      {path: 'divisions/:id', component: DivisionDetailsComponent},
      {path: 'employees', component: EmployeeListComponent},
      {path: 'employees/:id', component: EmployeeDetailComponent},
      {path: 'claims', component: ClaimListComponent},
      {path: 'claims/:id', component: ClaimDetailComponent},
      {path: 'reports', component: ReportsComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

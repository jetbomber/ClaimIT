import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { ClaimListComponent } from './claims/claim-list/claim-list.component';
import { ClaimDetailComponent } from './claims/claim-detail/claim-detail.component';
import { ReportsComponent } from './reports/reports.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyCreateComponent } from './companies/company-create/company-create.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { DivisionListComponent } from './companies/division-list/division-list.component';
import { ClassListComponent } from './companies/class-list/class-list.component';
import { DivisionDetailsComponent } from './companies/division-details/division-details.component';
import { ClassDetailsComponent } from './companies/class-details/class-details.component';
import { CheckboxInputComponent } from './_forms/checkbox-input/checkbox-input.component';
import { SelectInputComponent } from './_forms/select-input/select-input.component';
import { MatSelectModule} from '@angular/material/select';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { EmployeeInfoComponent } from './employees/employee-info/employee-info.component';
import { DependentListComponent } from './employees/dependent-list/dependent-list.component';
import { DependentDetailsComponent } from './employees/dependent-details/dependent-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CompanyListComponent,
    CompanyDetailComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    ClaimListComponent,
    ClaimDetailComponent,
    ReportsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    CompanyCreateComponent,
    TextInputComponent,
    DateInputComponent,
    DivisionListComponent,
    DivisionDetailsComponent,
    ClassListComponent,
    ClassDetailsComponent,
    CheckboxInputComponent,
    SelectInputComponent,
    EmployeeCreateComponent,
    EmployeeInfoComponent,
    DependentListComponent,
    DependentDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    NgxSpinnerModule,
    MatSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

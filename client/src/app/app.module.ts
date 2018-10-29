import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesTableComponent, EditDialog, ViewDialog } from './employees-table/employees-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModules } from './material/material.module';
import { SatPopoverModule } from '@ncstate/sat-popover';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesTableComponent,
    EditDialog,
    ViewDialog
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SatPopoverModule,
    AppMaterialModules,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditDialog, ViewDialog]
})
export class AppModule { }

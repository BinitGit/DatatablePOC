import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TextInputFilterComponent } from './filters/text-input-filter/text-input-filter.component';
import { DropdownFilterComponent } from './filters/dropdown-filter/dropdown-filter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TextInputFilterComponent,
    DropdownFilterComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

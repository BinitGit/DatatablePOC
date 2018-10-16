import { Component, OnInit } from '@angular/core';
import { Column, Filter, FilterType, DataTableSettings, Paging, FilterParam } from './datatable-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { columnGroupWidths } from '@swimlane/ngx-datatable/release/utils';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filteredColumns: Column[];
  displayPopover: boolean;
  filterTypes = FilterType;

  settings: DataTableSettings;
  filters: Filter[];

  constructor (private http: HttpClient) {
    this.getSettings();
    // http.get<string>('http://localhost:62429/api/DataTable/GetSettings')
    //     .toPromise()
    //     .then(settings => {
    //       console.log(settings);
    //       this.settings = JSON.parse(settings);
    //       console.log(this.settings);
    //       this.filteredColumns = this.settings.columns.slice(0);
    //       this.filteredRows = this.settings.rows.slice(0);
    //     });

    this.displayPopover = false;
  }

  ngOnInit() { }

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.filteredColumns = this.filteredColumns
                                 .filter(c => c.prop !== col.prop);
    } else {
      this.filteredColumns = [...this.filteredColumns, col];
    }
  }

  isChecked(col: Column) {
    return this.filteredColumns.find(c => c.prop === col.prop);
  }

  // updateFilter(filterData) {
  //   console.log(filterData);
  //   // this.settings.filters.find(f => f.prop === filterData.prop)
  //   //             .params[0].value = filterData.textInput;

  //   // this.filteredRows = this.settings.rows.filter(row =>
  //   //   this.settings.filters.every(f =>
  //   //     !f.params[0].value || row[f.prop].toLowerCase()
  //   //                                      .includes(f.params[0]
  //   //                                                 .value
  //   //                                                 .toLowerCase())));
  // }

  private matchFilter(prop: string): Filter {
    return this.settings.filters.find(f => f.prop === prop);
  }

  private updateFilter(eventProp: string, filterType: FilterType, fparams: FilterParam[]) {
    const filter = this.matchFilter(eventProp);
    if (filter) {
      filter.fparams = fparams;
    } else {
      this.filters.push({ prop: eventProp,
                          type: filterType,
                          fparams: fparams });
    }
    this.getData();
  }

  updateTextFilter(event: {prop: string, textInput: string}): void {
    this.updateFilter(event.prop,
                      FilterType.text,
                      [{ key: event.prop,
                        value: event.textInput }]);
  }

  updateDropdownFilter(event: {prop: string, selected: string}): void {
    this.updateFilter(event.prop,
                      FilterType.dropdown,
                      [{ key: event.selected,
                         value: true}]);
  }

  getSettings(): void {
    this.http.get<string>('http://localhost:62429/api/DataTable/GetSettings')
             .toPromise()
             .then(settings => {
               console.log(settings);
               this.settings = JSON.parse(settings);
               console.log(this.settings);
               this.filters = this.settings.filters.slice(0);
               this.filteredColumns = this.settings.columns.slice(0);
             });
  }

  getData(): void {
    this.http.post<string>('http://localhost:62429/api/DataTable/GetData',
                           this.settings,
                           { headers: new HttpHeaders('Access-Control-Allow-Origin') })
             .toPromise()
             .then(settings => {
               console.log(settings);
               this.settings = JSON.parse(settings);
               console.log(this.settings);
             });
  }

  observe(data: Observable<any>): void {
    data.toPromise()
        .then(settings => {
          console.log(settings);
          this.settings = JSON.parse(settings);
          console.log(this.settings);
          this.filters = this.settings.filters.slice(0);
          this.filteredColumns = this.settings.columns.slice(0);
        });
  }

  onSort(event: {column: Column, newValue: string}) {
    this.settings.sort = { prop: event.column.prop,
                           asc: event.newValue === 'asc' };
    this.getData();
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilterParam } from 'src/app/datatable-types';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements OnInit {

  @Input() prop: string;
  @Input() title: string;
  @Input() options: FilterParam[];

  selectedValue: string;

  constructor() { }

  @Output() selectedChange = new EventEmitter<any>();

  ngOnInit() {
    if (!this.title) {
      this.title = `Select by ${this.prop}`;
    }
  }

  emitSelected(): void {
      this.selectedChange.emit({ prop: this.prop,
                                 selectedValue: this.selectedValue });
  }
}

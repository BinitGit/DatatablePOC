import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

@Component({
  selector: 'app-text-input-filter',
  templateUrl: './text-input-filter.component.html',
  styleUrls: ['./text-input-filter.component.css']
})
export class TextInputFilterComponent implements OnInit {

  @Input() prop: string;
  @Input() title: string;
  @Input() textInput: string;

  @Output() inputChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    if (!this.title) {
      this.title = `Filter by ${this.prop}`;
    }
  }

  emitText(): void {
      this.inputChange.emit({prop: this.prop,
                             textInput: this.textInput});
  }
}

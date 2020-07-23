import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../interfaces';

@Component({
  selector: 'softuni-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Output() toggleEvent: EventEmitter<number> = new EventEmitter();

  toggleCompleted() {
    this.toggleEvent.emit(123);
  }
}

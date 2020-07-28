import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ITodo } from '../interfaces';

@Component({
  selector: 'softuni-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Output() toggleEvent: EventEmitter<number> = new EventEmitter();

  toggleCompleted() {
    this.toggleEvent.emit();
  }
}

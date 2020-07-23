import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ITodo } from './interfaces';
import { fromEvent } from 'rxjs';
import { map, debounceTime, throttleTime, tap, share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'softuni-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('filterInput') filterInput: ElementRef;

  todos: ITodo[];

  constructor(private todoService: TodoService) {
    todoService.fetch();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    this.todos = this.todoService.todos;
  }

  ngAfterViewInit() {
    // const stream$ = fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
    //   debounceTime(600),
    //   map(() => this.filterInput.nativeElement.value),
    //   tap(value => console.log(value)),
    //   share()
    // );
    // stream$.subscribe(value => console.log('1', value));
    // stream$.subscribe(value => console.log('2', value));
  }

  addTodo(title: string) {
    this.todoService.addTodo(title);
  }

  toggleCompleted(idx: number, data: number) {
    this.todoService.toggleCompleted(idx, data);
  }
}

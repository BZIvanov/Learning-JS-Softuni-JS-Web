import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = null;

  constructor(private http: HttpClient) {}

  fetch() {
    this.http
      .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  addTodo(title: string) {
    if (!title) {
      return;
    }
    this.todos.push({ title, completed: false });
  }

  toggleCompleted(idx: number, data: number) {
    const selectedTodo = this.todos[idx];
    this.todos[idx] = { ...selectedTodo, completed: !selectedTodo.completed };
  }
}

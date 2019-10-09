import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const todos = [
      { id: 1, text: 'Feed cat', date: new Date()},
      { id: 2, text: 'Do homework', date: new Date()},
      { id: 3, text: 'Cook dinner', date: new Date()},
      { id: 4, text: 'Do workout', date: new Date()},
      { id: 5, text: 'Drink coffee', date: new Date()},
      { id: 6, text: 'Meet with Ann', date: new Date() },
      { id: 7, text: 'Read book' , date: new Date()},
      { id: 8, text: 'Ride a bike' , date: new Date()},
      { id: 9, text: 'Buy avocado' , date: new Date()},
      { id: 10, text: 'Call dad', date: new Date() }
    ];

    return {todos};
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}

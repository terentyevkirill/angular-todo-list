import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const todos = [
      { id: 1, text: 'Feed cat' },
      { id: 2, text: 'Do homework' },
      { id: 3, text: 'Cook dinner' },
      { id: 4, text: 'Do workout' },
      { id: 5, text: 'Drink coffee' },
      { id: 6, text: 'Meet with Ann' },
      { id: 7, text: 'Read book' },
      { id: 8, text: 'Ride a bike' },
      { id: 9, text: 'Buy avocado' },
      { id: 10, text: 'Call dad' }
    ];

    return {todos};
  }

  getId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}

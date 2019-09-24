import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap(_ => this.log('fetched todos')),
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  getTodoNo404<Data>(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<Todo[]>(url)
      .pipe(
        map(todos => todos[0]), // returns a {0|1} element array
        tap(t => {
          const outcome = t ? `fetched` : `did not find`;
          this.log(`${outcome} todo id=${id}`);
        }),
        catchError(this.handleError<Todo>(`getTodo id=${id}`))
      );
  }

  getTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      tap(_ => this.log(`detched todo id=${id}`)),
      catchError(this.handleError<Todo>(`getTodo id=${id}`))
    );
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions).pipe(
      tap(_ => this.log(`updated todo id=${todo.id}`)),
      catchError(this.handleError<any>('updatedTodo'))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Todo[]>(`${this.todosUrl}/?text=${term}`).pipe(
      tap(_ => this.log(`found todos matching "${term}"`)),
      catchError(this.handleError<Todo[]>('searchTodos', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }
}

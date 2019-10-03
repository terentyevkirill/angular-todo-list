import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup;
  isSubmitted = false;

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.todoForm.invalid) { return; }
    this.todoService.addTodo(this.todoForm.value as Todo)
      .subscribe(_ => console.log(this.todoForm.value as Todo, 'Added'));
  }

  private buildForm() {
    this.todoForm = this.formBuilder.group({
      text: [ '', Validators.required ]
    });
  }

}

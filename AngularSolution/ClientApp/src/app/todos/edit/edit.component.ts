import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../todos.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  @Input() todo?: Todo;
  @Input() show = false;
  @Output() todosUpdated: EventEmitter<any> = new EventEmitter(); 
  @Output() toggleShow = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

  }

  createTodo(todo: Todo)
  {
    this.todoService.createTodo(todo).subscribe(() => {
      this.todosUpdated.emit(null);
      this.toggleShow.emit();
    });
  }

  updateTodo(todo: Todo)
  {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.todosUpdated.emit(null);
      this.toggleShow.emit();
    });
  }

  deleteTodo(id: number)
  {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todosUpdated.emit(null);
      this.toggleShow.emit();
    });
  }

}

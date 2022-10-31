import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoService } from './todos.service';

@Component({
	selector: 'app-todos',
	templateUrl: './todos.component.html',
})

export class TodosComponent implements OnInit {

	constructor(private todoService: TodoService) { }

	todoList: Todo[] = [];
	todoToEdit?: Todo;
	showEditComponent = false;

	title = '';
	dueDate = '';
	
	ngOnInit(): void {
		this.getTodoList();
	}

	getTodoList()
	{
		this.todoService
			.getTodos()
			.subscribe((results: Todo[]) => this.todoList = results);
	}

	createNewTodo()
	{
		this.showEditComponent = true;
		this.todoToEdit = new Todo();
	}

	editTodo(todo: Todo)
	{
		this.showEditComponent = true;
		this.todoToEdit = todo;
	}

	toggleShowEditComponent() 
	{
		this.showEditComponent = !this.showEditComponent;
	}
}

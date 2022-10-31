import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Todo } from "../models/Todo";

@Injectable ({
    providedIn: 'root'
})

export class TodoService {
    url = 'Todo';

    constructor(private httpClient: HttpClient) {}

    public getTodos() : Observable<Todo[]> {
        return this.httpClient.get<Todo[]>(`${environment.apiUrl}/${this.url}`);
    }

    public updateTodo(todo: Todo) {
        return this.httpClient.put(`${environment.apiUrl}/${this.url}`, todo);
    }

    public createTodo(todo: Todo) {
        return this.httpClient.post(`${environment.apiUrl}/${this.url}`, todo);
    }

    public deleteTodo(id: number) {
        return this.httpClient.delete(`${environment.apiUrl}/${this.url}/${id}`);
    }
}


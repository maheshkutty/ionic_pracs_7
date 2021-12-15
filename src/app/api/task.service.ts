import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }

  getTasks() {
    return this.http.get<any>("http://localhost:8080/todos", {
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    });
  }

  addTask(todo) {
    return this.http.post<any>("http://localhost:8080/add", todo, {
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
  }

  deleteTask(id) {
    return this.http.delete<any>(`http://localhost:8080/todo/delete/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "json"
    })
  }
}

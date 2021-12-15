import { Component } from '@angular/core';
import { TaskService } from '../api/task.service';
import { ToastController } from '@ionic/angular'
import * as moment from 'moment';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  actionTodo = "none";
  tasks = []
  todoInput = "";
  currDate = moment().toISOString();

  constructor(public taskApi: TaskService, private toastController: ToastController) {
    this.getTasks();
    console.log(moment().format("DD-MM-YYYY HH:mm"))
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    toast.present();
  }

  getTasks() {
    this.taskApi.getTasks().subscribe((data) => {
      this.tasks = data.map(item => {
        return {
          ...item,
          "displayTodo":"none"
        }
      });
      
    })
  }

  deleteTask(id) {
    this.taskApi.deleteTask(id).subscribe(data => {
      this.showToast("Data sucessfully deleted");
      this.getTasks();
    })
  }

  addTask(){
    let todo = {
      "name": this.todoInput,
      "tdate":moment().format("DD-MM-YYYY HH:mm")
    }
    console.log(todo);
    this.taskApi.addTask(todo).subscribe(data => {
      this.getTasks();
      this.showToast("Todo added successfully");
    })
  }

  itemMouseEnter(i){
    console.log("Hovering");
    this.tasks[i]["displayTodo"] = "block"; 
  }

  itemMouseLeave(i){
    console.log("Hovering");
    this.tasks[i]["displayTodo"] = "none"; 
  }
}

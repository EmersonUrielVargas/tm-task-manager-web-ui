import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { IEditableTask, ITask } from '@app/interfaces/ITask';
import { TaskComponent } from '@app/components/task/task.component';
import { ETaskStatus } from '@app/enum/ETaskStatus';
import { AddNewTaskComponent } from '@app/components/add-new-task/add-new-task.component';
import { Observable } from 'rxjs';
import { TasksService } from '@app/services/tasks/tasks.service';

@Component({
  selector: 'app-home',
  imports: [TaskComponent, AddNewTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  title = 'Bienvenido a tu administrador de Tareas'
  tasks = signal<ITask[]>([] as ITask[]);

  constructor(
    private taskService: TasksService
  ){

  }
  
  ngOnInit(): void {
    this.tasks = this.taskService.tasksList;
  }

  registerNewTask(newTask: IEditableTask){
    this.taskService.addNewTask(newTask);
  }

  removeOneTask(id: ITask['id']){
    this.taskService.removeTask(id);
  }

  updateTask(taskUpdated: ITask){
    this.taskService.editTask(taskUpdated.id, taskUpdated as IEditableTask);
  }





}

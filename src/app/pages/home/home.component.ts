import { Component, computed, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { IEditableTask, ITask } from '@app/interfaces/ITask';
import { TaskComponent } from '@app/components/task/task.component';
import { ETaskStatus } from '@app/enum/ETaskStatus';
import { AddNewTaskComponent } from '@app/components/add-new-task/add-new-task.component';
import { TasksService } from '@app/services/tasks/tasks.service';

@Component({
  selector: 'app-home',
  imports: [TaskComponent, AddNewTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  title = 'Bienvenido a tu administrador de Tareas'
  tasks!:Signal<ITask[]>;
  statusTask = Object.values(ETaskStatus);

  constructor(
    private taskService: TasksService
  ){

  }
  
  ngOnInit(): void {
    this.tasks = this.taskService.taskFiltered;
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

  filterTask(event: any){
    const statusFilter = event as HTMLSelectElement;
    this.taskService.filterTask(statusFilter.value);
  }
}

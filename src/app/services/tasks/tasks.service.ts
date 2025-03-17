import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { IEditableTask, ITask } from '@app/interfaces/ITask';
import { Observable, of } from 'rxjs';
import { environments } from '@envs/environments';
import { v4 as uuidv4 } from 'uuid';
import { ETaskStatus } from '@app/enum/ETaskStatus';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  
  private tasksList: WritableSignal<ITask[]> = signal([] as ITask[]);
  private currentFilter = signal<string>('');
  taskFiltered = computed(()=>{
    if(!this.currentFilter()){
      return this.tasksList();
    }else{
      return this.tasksList().filter((task) =>{
        return (task.status === this.currentFilter());
    });
    }

  });
  isLoading = signal(false);

  constructor(
    private global: GlobalService
  ) {
    this.getAllTask();
  }

  private getAllTask(){
    this.isLoading.set(true);
    this.global.get(environments.URL_TASKS).subscribe((tasks)=>{
      this.isLoading.set(false);
      this.setTasks(tasks);
    })
  }

  private mockGlobal(): Observable<any>{
    return of({
      statusCode: '200',
      description: 'Updated SucessFull'
    })
  }

  private setTasks(tasks: ITask[]){
    this.tasksList.set(tasks);
  }

  editTask(id: ITask['id'], taskUpdated: IEditableTask){
    this.isLoading.set(true);
    this.mockGlobal().subscribe({
      next:(result) =>{
        this.isLoading.set(false);
        if(!result.error)
        this.tasksList.update((tasks) => {
          return tasks.map((task) =>{
            return (task.id === id)?
              {
                ...task,
                ...taskUpdated
              }:task
          })
        });
      },
      error:(error: any)=>{
        console.log('Fail Updating task')
      }
    });
  }

  filterTask(filter: ETaskStatus| string){
    this.isLoading.set(true);
    this.currentFilter.set(filter);
  }

  addNewTask(newTask: IEditableTask){
    const newTaskRegister = {
      id: uuidv4(),
      ...newTask
    } as ITask;
    this.isLoading.set(true);
    this.mockGlobal().subscribe({
      next:(result) =>{
        this.isLoading.set(false);
        if(!result.error)
        this.tasksList.update((tasks) => {
          tasks.push(newTaskRegister);
          return tasks;
        });
      },
      error:(error: any)=>{
        console.log('Fail Inserting task')
      }
    });
  }

  removeTask(id: ITask['id']){
    this.isLoading.set(true);
    this.mockGlobal().subscribe({
      next:(result) =>{
        this.isLoading.set(false);
        if(!result.error)
        this.tasksList.update((tasks) => {
          return tasks.filter(task => task.id !== id);
        });
      },
      error:(error: any)=>{
        console.log('Fail Removing task')
      }
    });
  }
}

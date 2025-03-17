import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { IEditableTask, ITask } from '@app/interfaces/ITask';
import { environments } from '@envs/environments';
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

  private setTasks(tasks: ITask[]){
    this.tasksList.set(tasks);
  }

  editTask(id: ITask['id'], taskUpdated: IEditableTask){
    this.isLoading.set(true);
    this.global.put(`${environments.URL_TASKS}/${id}`, taskUpdated).subscribe({
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
    this.isLoading.set(true);
    this.global.post(environments.URL_TASKS, newTask).subscribe({
      next:(result) =>{
        this.isLoading.set(false);
        if(!result.error)
        this.tasksList.update((tasks) => {
          tasks.push(result);
          return [...tasks];
        });
      },
      error:(error: any)=>{
        console.log('Fail Inserting task')
      }
    });
  }

  removeTask(id: ITask['id']){
    this.isLoading.set(true);
    this.global.delete(`${environments.URL_TASKS}/${id}`).subscribe({
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

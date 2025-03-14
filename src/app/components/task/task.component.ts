import { Component, Input, OnInit, signal, SimpleChanges} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ETaskStatus } from '@app/enum/ETaskStatus';
import { ITask } from '@app/interfaces/ITask';

@Component({
  selector: 'task',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit{
  @Input() task!: ITask;
  taskEnum = ETaskStatus;
  taskEditable = signal<ITask>({} as ITask);
  taskForm!: FormGroup;
  taskChecked = signal(false);

  constructor(){
    this.taskForm = new FormBuilder().group({
      description: [],
      status: [],
      title: []
    });

  }

  ngOnInit(): void {
    this.updateTaskState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      this.updateTaskState();
    }
  }

  private updateTaskState() {
    if(this.task){
      this.taskEditable.set({ ...this.task });
      this.taskForm.patchValue(this.task);
    }
      
  }

  onChangeStatus(event: Event){
    const target = event.target as HTMLInputElement;
    let statusChange = ETaskStatus.PENDING;
    if (target.checked) {
      statusChange = ETaskStatus.COMPLETE;
    }
    this.taskEditable.update(task => ({ ...task, status: statusChange }));
  }
}

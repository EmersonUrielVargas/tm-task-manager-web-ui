import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ETaskStatus } from '@app/enum/ETaskStatus';
import { IEditableTask, ITask } from '@app/interfaces/ITask';
import { FormTaskComponent } from '../form-task/form-task.component';

@Component({
  selector: 'task',
  imports: [ReactiveFormsModule, FormTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  @Input() task!: ITask;
  @Output() updateTask = new EventEmitter<ITask>();
  @Output() removeTask = new EventEmitter<ITask['id']>();
  taskEnum = ETaskStatus;
  taskEditable = signal<ITask>({} as ITask);
  taskChecked = signal(false);
  showEditView = signal(false);

  constructor() {}

  ngOnInit(): void {
    this.updateTaskState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && changes['task'].currentValue) {
      this.updateTaskState();
    }
  }

  private updateTaskState() {
    if (this.task) {
      this.taskEditable.set({ ...this.task });
    }
  }

  isCheckedTask(): boolean {
    return this.taskEditable().status === ETaskStatus.COMPLETE;
  }

  onChangeStatus(event: Event) {
    const target = event.target as HTMLInputElement;
    let statusChange = ETaskStatus.PENDING;
    if (target.checked) {
      statusChange = ETaskStatus.COMPLETE;
    }
    this.updateTask.emit(this.taskEditable());
    this.taskEditable.update((task) => ({ ...task, status: statusChange }));
  }

  changeEditView(show: boolean = true) {
    this.showEditView.set(show);
  }

  deleteTask() {
    this.removeTask.emit(this.task.id);
  }

  updateDataTask(newData: IEditableTask) {
    this.updateTask.emit({
      id: this.task.id,
      status: this.task.status,
      ...newData,
    } as ITask);
    this.changeEditView(false);
  }
}

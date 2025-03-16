import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormTaskComponent } from "../form-task/form-task.component";
import { IEditableTask } from '@app/interfaces/ITask';

@Component({
  selector: 'add-new-task',
  imports: [FormTaskComponent],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.css'
})
export class AddNewTaskComponent {

  showFormRegister = signal(false);
  @Output() taskNew = new EventEmitter<IEditableTask>();

  constructor(){

  }

  enableFormRegister(showForm = true){
    this.showFormRegister.set(showForm);
  }

  saveNewTask(event: IEditableTask){
    this.taskNew.emit(event);
    this.enableFormRegister(false);
  }
}

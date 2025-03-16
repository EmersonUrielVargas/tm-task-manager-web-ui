import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ETaskStatus } from '@app/enum/ETaskStatus';
import { IEditableTask, ITask } from '@app/interfaces/ITask';

@Component({
  selector: 'form-task',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent implements OnInit, OnChanges {

  @Input() taskInput: IEditableTask = {} as ITask;
  @Output() taskChange = new EventEmitter<IEditableTask>();
  @Output() cancel = new EventEmitter<boolean>();
  taskForm: FormGroup = new FormGroup({});

  constructor(){
    
  }
 
  ngOnInit(): void {
    this.taskForm = new FormBuilder().group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['',[Validators.required, Validators.minLength(5)]],
      status: [ETaskStatus.PENDING]
    });
    this.taskForm.patchValue(this.taskInput);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskInput'] && changes['taskInput'].currentValue) {
      this.taskForm.patchValue(this.taskInput);
    }
  }


  saveTask(){
    this.taskChange.emit(this.taskForm.value)
  }

  cancelEdition(){
    this.cancel.emit(true);
  }
}

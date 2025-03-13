import { Component, input} from '@angular/core';
import { ITask } from '@app/interfaces/ITask';

@Component({
  selector: 'task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task = input.required<ITask>()
}

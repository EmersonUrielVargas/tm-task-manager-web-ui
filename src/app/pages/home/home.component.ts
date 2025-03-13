import { Component, signal } from '@angular/core';
import { ITask } from '@app/interfaces/ITask';
import { TaskComponent } from "../../components/task/task.component";

@Component({
  selector: 'app-home',
  imports: [TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Bienvenido a tu administrador de Tareas'
  tasks = signal<ITask[]>([
    {
      id: 'b6815961-a84a-4d2e-ae14-1c153d3c2c5a',
      description: 'Hacer el curso de Astro',
      status: 'Pendiente',
      title: 'Curso Astro'
    },
    {
      id: 'b6815961-a84a-4d2e-ae14-1c153d3c2c5b',
      description: 'Hacer el curso de azure',
      status: 'En Curso',
      title: 'Curso Azure'
    },
    {
      id: 'b6815961-a84a-4d2e-ae14-1c153d3c2c5c',
      description: 'Hacer el curso de AWS architect',
      status: 'En Curso',
      title: 'Curso AWS'
    }
  ])

}

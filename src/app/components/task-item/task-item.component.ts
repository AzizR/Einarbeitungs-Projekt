import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/types/task';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  faEllipsisVertical = faEllipsisVertical
}

/* Angular imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

/* Angular Material Modules */
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';

/* Component imports */
import { TaskComponent } from './components/task/task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { LineThroughDirective } from './directives/line-through.directive';
import { DialogDirective as GenericDialogDirective } from './directives/generic-dialog/dialog.directive';
import { TaskControlsComponent } from './components/task-controls/task-controls.component';
import { SortMenuComponent } from './components/sort-menu/sort-menu.component';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';

@NgModule({
  declarations: [
    TaskComponent,
    TasksListComponent,
    TaskItemComponent,
    TaskFormComponent,
    LineThroughDirective,
    TaskControlsComponent,
    SortMenuComponent,
    GenericDialogComponent,
    GenericDialogDirective
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    DragDropModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'de-DE'
  }],
})
export class TaskModule { }

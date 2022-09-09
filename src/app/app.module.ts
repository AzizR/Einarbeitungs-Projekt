/* Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

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


/* Component imports */
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { LineThroughDirective } from './directives/line-through.directive';
import { DialogDirective } from './directives/dynamic-components/dialog.directive';
import { TaskControlsComponent } from './components/task-controls/task-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TasksListComponent,
    TaskItemComponent,
    TaskFormComponent,
    TaskDialogComponent,
    LineThroughDirective,
    DialogDirective,
    TaskControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatCheckboxModule,
    MatTooltipModule,
    DragDropModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'de-DE'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

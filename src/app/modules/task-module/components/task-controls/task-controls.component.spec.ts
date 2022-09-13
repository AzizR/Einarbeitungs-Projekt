import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskControlsComponent } from './task-controls.component';

describe('TaskControlsComponent', () => {
  let component: TaskControlsComponent;
  let fixture: ComponentFixture<TaskControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

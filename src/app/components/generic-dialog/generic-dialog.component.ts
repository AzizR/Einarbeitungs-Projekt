import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProperties } from 'src/app/types/dialog-properties';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      template: TemplateRef<unknown>,
      title: string
    },
    public dialogRef: MatDialogRef<GenericDialogComponent>
  ) { }

  ngOnInit(): void {
  }

}

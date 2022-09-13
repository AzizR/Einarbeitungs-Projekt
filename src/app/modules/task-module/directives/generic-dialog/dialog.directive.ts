import { Directive, Input, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../components/generic-dialog/generic-dialog.component';
import { DialogProperties } from '../../types/dialog-properties';

@Directive({
  selector: '[dialog]'
})
export class DialogDirective {
  @Input() set dialog(options: DialogProperties) {
    console.log('directive',options);
    
    if (options) {
      this.openDialog(options)
    }
  }

  dialogRef!: MatDialogRef<GenericDialogComponent>;

  constructor(private matDialog: MatDialog, private templateRef: TemplateRef<any>) {}

  openDialog(options: DialogProperties) {
    const data: any = {
      template: this.templateRef,
      title: options.title,
      saveBtnText: options.saveBtnText
    };

    this.dialogRef = this.matDialog.open(GenericDialogComponent, {
      width: '600px',
      data
    })
  }

}

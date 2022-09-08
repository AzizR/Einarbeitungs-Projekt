import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLineThrough]'
})
export class LineThroughDirective {
  @Input() set isDone(isDone: boolean) {
      this.el.nativeElement.style.textDecoration = isDone ? 'line-through' : 'none'
  }

  constructor(private el: ElementRef) {}

}

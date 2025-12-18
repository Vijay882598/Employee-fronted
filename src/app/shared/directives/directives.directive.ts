import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class DirectivesDirective implements OnInit {
  @Input() appStatusHighlight: boolean = false;
  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    if (this.appStatusHighlight) {
      this.el.nativeElement.style.backgroundColor = '#c8e6c9';
      this.el.nativeElement.style.color = '#256029';
    } else {
      this.el.nativeElement.style.backgroundColor = '#ffcdd2';
      this.el.nativeElement.style.color = '#b71c1c';
    }
  }
}

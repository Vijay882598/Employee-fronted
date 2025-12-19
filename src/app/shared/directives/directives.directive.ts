import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatusHighlight]',
  standalone: true
})
export class DirectivesDirective implements OnInit, OnChanges {
  @Input() appStatusHighlight!: string;
  constructor(private el: ElementRef) { }
  ngOnChanges(): void {
    const element = this.el.nativeElement;
    element.style.padding = '8px 18px';
    element.style.borderRadius = '30px';
    element.style.fontWeight = '700';
    element.style.fontSize = '13px';
    element.style.display = 'inline-block';

    if (this.appStatusHighlight === 'true') {
      element.style.backgroundColor = '#c8e6c9';
      element.style.color = '#256029';
    } else {
      element.style.backgroundColor = '#ffcdd2';
      element.style.color = '#b71c1c';
    }
  }
  
  ngOnInit(): void {

  }
}

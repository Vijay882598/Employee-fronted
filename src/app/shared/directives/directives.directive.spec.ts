// import { DirectivesDirective } from './directives.directive';

// describe('DirectivesDirective', () => {
//   it('should create an instance', () => {
//     const directive = new DirectivesDirective();
//     expect(directive).toBeTruthy();
//   });
// });
import { DirectivesDirective } from './directives.directive';
import { ElementRef } from '@angular/core';

describe('DirectivesDirective', () => {
  let directive: DirectivesDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Mock ElementRef
    mockElementRef = {
      nativeElement: {
        style: {}
      }
    } as ElementRef;

    // Manually instantiate directive with mock
    directive = new DirectivesDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set backgroundColor to lightgreen when appStatusHighlight is true', () => {
    directive.appStatusHighlight = true;
    directive.ngOnInit();

    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('lightgreen');
  });

  it('should not set backgroundColor when appStatusHighlight is false', () => {
    directive.appStatusHighlight = false;
    directive.ngOnInit();

    expect(mockElementRef.nativeElement.style.backgroundColor).toBe('');
  });
});
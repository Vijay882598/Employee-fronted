import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'RoleColorPipe',
  standalone: true
})
export class PipesPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: string): SafeHtml {
    if (!value) return '';
    let color = 'black';
    let text = value;
    if (value === 'Admin') {
      text = 'Administrator';
      color = 'blue';
    } else if (value === 'User') {
      text = 'Regular User';
      color = 'grey';
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      `<span style="padding:2px 6px; border-radius:4px; background-color:${color}; color:white; font-weight:600;">${text}</span>`
    );
  }
}
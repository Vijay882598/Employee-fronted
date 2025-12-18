import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'RoleColorPipe',
  standalone: true
})
export class PipesPipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'Admin') return 'Administrator';
    if (value === 'User') return 'Regular User';
    return value;
  }
}
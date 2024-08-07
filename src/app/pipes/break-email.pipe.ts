import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakEmail',
  standalone: true,
})
export class BreakEmailPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace('@', '@&#8203;');
  }
}

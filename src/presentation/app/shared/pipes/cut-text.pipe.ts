import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
})
export class CutTextPipe implements PipeTransform {
  transform(value: string, cuantityCharacters: number): string {
    if (value.length < cuantityCharacters) return value;

    return `${value.slice(0, cuantityCharacters)}...`;
  }
}

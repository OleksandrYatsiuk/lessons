import { SelectItems } from './../../core/interfaces/select';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'extract'
})
export class ExtractPipe implements PipeTransform {
    transform(value: string | number, items: SelectItems[]): string {
        if (items.length > 0) {
            const result = items.find((el: SelectItems) => el.value === value);
            return result.label;
        }
    }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumber',
    standalone: true
})
export class PhoneNumberPipe implements PipeTransform {
    transform(value: string | number | null | undefined): string {
        if (!value) return '';
        const digits = value.toString().replace(/\D/g, '');

        if (digits.length === 12 && digits.startsWith('91')) {
            return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
        }

        if (digits.length === 10) {
            return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
        }

        return value.toString();
    }
}

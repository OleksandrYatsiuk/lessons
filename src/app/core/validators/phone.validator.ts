import { FormControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
    const pattern = new RegExp('^[+]*[0-9]{10,12}$');

    return (control: FormControl) => {
        const value: string = control.value;
        if (value == null || value === '') {
            return null;
        }
        const isValid = pattern.test(value);
        if (!isValid) {
            return { phone: true };
        }

        return null;
    };
}

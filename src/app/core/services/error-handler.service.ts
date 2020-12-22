import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    private msg = new BehaviorSubject<any>(null);
    errorMessage = this.msg.asObservable();
    constructor() { }

    hasError(error: object): void {
        this.msg.next(error);
    }

    validation(error, form: FormGroup | FormControl): void {
        if (error && error.code === 422 && Array.isArray(error.result)) {
            error.result.forEach(({ field, message }: any) => {
                if (form instanceof FormGroup) {
                    const control = form.get(field);
                    if (control) {
                        control.markAsDirty();
                        control.setErrors({ backendErr: message });
                    }
                } else {
                    form.markAsDirty();
                    form.setErrors({ backendErr: message });
                }
            });
            return;
        }
    }
}

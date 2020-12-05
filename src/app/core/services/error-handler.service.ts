import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    private msg = new BehaviorSubject<any>(null);
    errorMessage = this.msg.asObservable();
    constructor() { }
    public hasError(error: object): void {
        this.msg.next(error);
    }
    public validation(error, form: FormGroup): void {
        if (error && error.code === 422 && Array.isArray(error.result)) {
            error.result.forEach(({ field, message }: any) => {
                const control = form.get(field);
                if (control) {
                    control.markAsDirty();
                    control.setErrors({ backendErr: message });
                }
            });
            return;
        }
    }
}

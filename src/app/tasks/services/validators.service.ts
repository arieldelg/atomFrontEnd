import { Injectable } from "@angular/core";
import {
    AbstractControl, FormGroup, ValidationErrors, ValidatorFn
} from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ValidatorsService {


    public static isValidForm(value: string, form: FormGroup) {
        return (
            form.controls[value].errors && form.controls[value].touched
        );
    }

    public static readonly noWhiteSpaceValue: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const isWhiteSpace = (control.value || "").trim().length === 0;

        return isWhiteSpace ? { whiteSpace: true } : null;
    };



}

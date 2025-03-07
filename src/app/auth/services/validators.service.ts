import { Injectable } from "@angular/core";
import {
    AbstractControl, FormGroup, ValidationErrors, ValidatorFn
} from "@angular/forms";

@Injectable({
    providedIn: "root",
})
export class ValidatorsService {
    public firstNameAndLastNamePattern: string = "([a-zA-Z]+) ([a-zA-Z]+)";
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public isValidForm(value: string, form: FormGroup) {
        return (
            form.controls[value].errors && form.controls[value].touched
        );
    }

    public readonly noWhiteSpaceValue: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const isWhiteSpace = (control.value || "").trim().length === 0;

        return isWhiteSpace ? { whiteSpace: true } : null;
    };

    public getErrors(fieldName: string, formGroup: FormGroup){
      const errors = formGroup.controls[fieldName].errors

      if(!errors) return null
      return this.getMessage(errors, fieldName)
    }

    private getMessage(error: ValidationErrors, fieldName?: string){
      for (const key of Object.keys(error)) {
        switch (key) {
          case 'required':
            return `${fieldName !== 'displayName' ? fieldName  : 'User'} is required`
          case 'minlength':
            return `Need to be at least ${error[key].requiredLength} characters, actual: ${error[key].actualLength} characters`
          default:
            return null
        }
      }

      return null
    }

}

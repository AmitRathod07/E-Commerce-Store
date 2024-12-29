import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null; // Don't validate empty value.
        }

        const hasUpdateCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumeric = /[0-9]/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const isValidLength = value.length >= 8;

        const passwordValid = hasUpdateCase && hasLowerCase && hasNumeric && hasSpecialCharacter && isValidLength;

        return !passwordValid ? { strongPassword: true } : null;
    };
}
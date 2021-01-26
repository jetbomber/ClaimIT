import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static phoneNumber(validateTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            const PHONE_REGEXP = /^(1-)?\d{3}-\d{3}-\d{4}$/;
            return PHONE_REGEXP.test(control?.parent?.controls[validateTo].value) ? null : {isValidPhoneNumber: true};
        }
    }

    static postalCode(validateTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            const POSTAL_CODE_REGEXP = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]-?[0-9][A-Z][0-9]$/;
            return POSTAL_CODE_REGEXP.test(control?.parent?.controls[validateTo].value) ? null : {isValidPostalCode: true};
        }
    }

    static isNumeric(validateTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            const NUMERIC_REGEXP = /[0-9]\.*$/;
            return NUMERIC_REGEXP.test(control?.parent?.controls[validateTo].value) ? null : {isNumeric: true};
        }
    }

}

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const name: string = control.value;

        // Check if name is empty
        if (!name) {
            return { required: true };
        }

        // Check length
        if (name.length < 2 || name.length > 20) {
            return { invalidLength: true };
        }

        // Check for numbers or special symbols
        const regex = /^[a-zA-Z]+$/; // Regex to match only letters
        if (!regex.test(name)) {
            return { invalidCharacters: true };
        }

        return null;
    };
}

export function validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email: string = control.value;

        // Check if email is empty
        if (!email) {
            return { required: true };
        }

        // Regular expression to validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if email matches the regular expression
        if (!emailRegex.test(email)) {
            return { invalidEmail: true };
        }

        return null;
    };
}


export function validateStudentId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const studentId: string = control.value;

        // Check if studentId is empty
        if (!studentId) {
            return { required: true };
        }

        // Check length
        if (studentId.length !== 8) {
            return { invalidLength: true };
        }

        // Regular expression to match only alphanumeric characters
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        // Check if studentId contains only alphanumeric characters
        if (!alphanumericRegex.test(studentId)) {
            return { invalidCharacters: true };
        }

        return null;
    }
}
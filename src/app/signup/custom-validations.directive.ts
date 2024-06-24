
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


export function validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.value;
        if (!password) return { required: true };
        if (password.length < 8) return { invalidLength: true };
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) return { weakPassword: true };
        return null;
    };
}

export function validatePhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const phoneNumber: string = control.value;
        if (!phoneNumber) return { required: true };
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) return { invalidPhoneNumber: true };
        return null;
    };
}

export function validateDateOfBirth(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const dob: string = control.value;
        if (!dob) return { required: true };
        const age = Math.floor((Date.now() - new Date(dob).getTime()) / (1000 * 3600 * 24 * 365.25));
        if (age < 5 || age > 100) return { invalidAge: true };
        return null;
    };
}
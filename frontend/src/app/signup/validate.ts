
  import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

  export function createPasswordStrengthValidator(): ValidatorFn {
      return (control:AbstractControl) : ValidationErrors | null => {
  
          const value = control.value;
  
          if (!value) {
              return null;
          }
  
          const hasUpperCase = /[A-Z]+/.test(value);
  
          const hasLowerCase = /[a-z]+/.test(value);
  
          const hasNumeric = /[0-9]+/.test(value);
  
          const spclChar =/[!@#$%^&*.-]/.test(value)
  
          const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && spclChar ;
  
          return !passwordValid ? {
            passwordStrength: {
              hasUpperCase: true,
              hasLowerCase: true,
              hasNumeric: true,
              spclChar :true
            }
        }: null;
      }
  }
import { AbstractControl } from '@angular/forms';

export const PasswordMatchValidators = (
  passwordControlName: string,
  confirmPasswordControlName: string
) => {
  const validators = (form: AbstractControl) => {
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl = form.get(confirmPasswordControlName);
    // console.log(confirmPasswordControl);
    // console.log(passwordControl);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
    } else {
      const errors = confirmPasswordControl.errors;
      if (!errors) return;

      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);
    }
  };
  return validators;
};

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function edadValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value >= 18 && value <= 99) {
    return null; // Válido
  }
  return { edad: 'La edad debe estar entre 18 y 99 años.' };
}
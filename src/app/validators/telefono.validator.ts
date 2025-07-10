import { AbstractControl, ValidationErrors } from '@angular/forms';

export function telefonoValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const pattern = /^\d+$/; // Solo números
  if (value && pattern.test(value) && value.length <= 10) {
    return null; // Válido
  }
  return { telefono: 'El teléfono debe contener solo números y no más de 10 caracteres.' };
}
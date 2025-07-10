import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nombreApellidoValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const pattern = /^[a-zA-Z\s]+$/; // Solo letras y espacios
  if (!value || pattern.test(value)) {
    return null; // Válido
  }
  return { nombreApellido: 'El nombre y apellido solo pueden contener letras y espacios.' };
}
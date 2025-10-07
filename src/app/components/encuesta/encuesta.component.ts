
// import { Component,OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { EncuestasService } from '../../services/encuestas.service';
// @Component({
//   selector: 'app-encuesta',
//   templateUrl: './encuesta.component.html',
//   styleUrls: ['./encuesta.component.css'],
//   imports: [ReactiveFormsModule, CommonModule]
// })
// export class EncuestaComponent implements OnInit {
//   encuestaForm!: FormGroup;

//   juegos=['Ahorcado', 'Mayor Menor', 'Preguntados', 'Anagrama'];
//   constructor(private fb: FormBuilder, private encuestaService: EncuestasService) {}

//   ngOnInit(): void {
//      this.encuestaForm = this.fb.group({
//       nombreApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras y espacios
//       edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]], // Edad entre 18 y 99 años
//       telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]], // Solo números y máximo 10 caracteres
//       juegoFavorito: ['', Validators.required], // Selección de juego favorito
//       juegoFaltante: ['', [Validators.maxLength(100)]], // Comentarios opcionales con máximo
//       sugerencias: ['', [Validators.maxLength(200)]], // Sugerencias opcionales con máximo 200 caracteres
//       confirmacion: [false, Validators.requiredTrue] // Checkbox de confirmación
//     });
//   }

//   async onSubmit(): Promise<void> {
//   if (this.encuestaForm.valid) {
//     const formData = {
//       nombre_apellido: this.encuestaForm.value.nombreApellido,
//       edad: this.encuestaForm.value.edad,
//       telefono: this.encuestaForm.value.telefono,
//       juego_favorito: this.encuestaForm.value.juegoFavorito,
//       juego_faltante: this.encuestaForm.value.juegoFaltante,
//       sugerencias: this.encuestaForm.value.sugerencias,
//     };

//     try {
//       await this.encuestaService.insertEncuesta(formData);
//       alert('Encuesta enviada con éxito');
//       // Reset con checkbox en false
//       this.encuestaForm.reset({
//         confirmacion: false
//       });
//     } catch (error) {
//       console.error(' Error al enviar la encuesta:', error);
//       alert('Error al enviar la encuesta');
//     }
//   } else {
//     this.encuestaForm.markAllAsTouched();
//     console.error('Formulario inválido');
//   }
// }
  
// }
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncuestasService } from '../../services/encuestas.service';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EncuestaComponent implements OnInit {
  encuestaForm!: FormGroup;

  juegos=['Ahorcado', 'Mayor Menor', 'Preguntados', 'Anagrama'];
  constructor(private fb: FormBuilder, private encuestaService: EncuestasService) {}

  ngOnInit(): void {
     this.encuestaForm = this.fb.group({
      nombreApellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras y espacios
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]], // Edad entre 18 y 99 años
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]], // Solo números y máximo 10 caracteres
      juegoFavorito: ['', Validators.required], // Selección de juego favorito
      juegoFaltante: ['', [Validators.maxLength(100)]], // Comentarios opcionales con máximo
      sugerencias: ['', [Validators.maxLength(200)]], // Sugerencias opcionales con máximo 200 caracteres
      confirmacion: [false, Validators.requiredTrue] // Checkbox de confirmación
    });
  }

  async onSubmit(): Promise<void> {
    if (this.encuestaForm.valid) {
      const formData = {
        nombre_apellido: this.encuestaForm.value.nombreApellido,
        edad: this.encuestaForm.value.edad,
        telefono: this.encuestaForm.value.telefono,
        juego_favorito: this.encuestaForm.value.juegoFavorito,
        juego_faltante: this.encuestaForm.value.juegoFaltante,
        sugerencias: this.encuestaForm.value.sugerencias,
      };

      try {
        await this.encuestaService.insertEncuesta(formData);
        this.mostrarToast('Encuesta enviada con éxito', 'success');
        // Reset con checkbox en false
        this.encuestaForm.reset({
          confirmacion: false
        });
      } catch (error) {
        console.error('Error al enviar la encuesta:', error);
        this.mostrarToast('Error al enviar la encuesta', 'error');
      }
    } else {
      this.encuestaForm.markAllAsTouched();
      console.error('Formulario inválido');
    }
  }

mostrarToast(mensaje: string, tipo: 'success' | 'error') {
  const toast = document.createElement('div');
  toast.textContent = mensaje;
  toast.className = `toast ${tipo}`;

  // Estilos flotantes abajo, centrado
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.background = tipo === 'success' ? 'rgba(0,128,0,0.9)' : 'rgba(220,53,69,0.9)';
  toast.style.color = '#fff';
  toast.style.fontFamily = `'Fredoka One', 'Comic Sans MS', cursive, sans-serif`;
  toast.style.zIndex = '99999';
  toast.style.pointerEvents = 'none';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.5s ease, bottom 0.5s ease';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  toast.style.transform += ' translateZ(0)';

  document.body.appendChild(toast);

  // Animación entrada
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.bottom = '50px';
  }, 10);

  // Desaparece automáticamente
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.bottom = '30px';
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 3000);
}


}

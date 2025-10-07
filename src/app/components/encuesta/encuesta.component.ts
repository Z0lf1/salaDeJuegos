
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

  // async onSubmit(): Promise<void> {
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
  //       this.encuestaForm.reset();
  //     } catch (error) {
  //       console.error(' Error al enviar la encuesta:', error);
  //       alert('Error al enviar la encuesta');
  //     }
  //   } else {
  //     this.encuestaForm.markAllAsTouched();
  //     console.error('Formulario inválido');
  //   }
  // }
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
      alert('Encuesta enviada con éxito');
      // Reset con checkbox en false
      this.encuestaForm.reset({
        confirmacion: false
      });
    } catch (error) {
      console.error(' Error al enviar la encuesta:', error);
      alert('Error al enviar la encuesta');
    }
  } else {
    this.encuestaForm.markAllAsTouched();
    console.error('Formulario inválido');
  }
}
  
}

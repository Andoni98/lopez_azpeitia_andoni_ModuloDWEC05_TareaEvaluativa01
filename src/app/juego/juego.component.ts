import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuracion } from '../models/configuracion'; 

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  standalone: false,
})
export class JuegoComponent implements OnInit {

  // Variables de estado y formulario (Ejercicio 1)
  configuracionForm!: FormGroup;
  configuracion!: Configuracion;
  juegoIniciado: boolean = false; 

  // Variables de partida (Ejercicio 2)
  numeroObjetivo!: number;
  intentosRestantes!: number;
  mensajeJuego: string = 'Introduce tu primer número.';
  numeroUsuario!: number;
  juegoTerminado: boolean = false; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Inicialización del Formulario Reactivo (Ejercicio 1)
    this.configuracionForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rango: [5, [Validators.required, Validators.min(4)]], // Rango mínimo 4
      intentos: [10, [Validators.required, Validators.min(1)]],
    });
  }

  // --- Lógica de Configuración (Ejercicio 1) ---

  recogerDatosYComenzarJuego(): void {
    if (this.configuracionForm.valid) {
      this.configuracion = this.configuracionForm.value as Configuracion;
      this.configuracionForm.disable();
      this.iniciarPartida();
      this.juegoIniciado = true;
    }
  }

  iniciarPartida(): void {
    this.numeroObjetivo = Math.floor(Math.random() * this.configuracion.rango);
    this.intentosRestantes = this.configuracion.intentos;
    this.juegoTerminado = false; 
    
    this.mensajeJuego = `Ongi Etorri ${this.configuracion.nombre} ${this.configuracion.apellido}. ¡Adivina un número entre 0 y ${this.configuracion.rango - 1}! Tienes ${this.intentosRestantes} intentos.`;
  }

  // --- Lógica del Juego (Ejercicio 2) ---

  comprobarNumero(): void {
    if (this.numeroUsuario === undefined || this.numeroUsuario === null) {
      this.mensajeJuego = 'Por favor, introduce un número válido.';
      return;
    }

    if (this.intentosRestantes <= 0 && !this.juegoTerminado) {
      this.mensajeJuego = `¡El juego ha terminado! El número era ${this.numeroObjetivo}.`;
      this.juegoTerminado = true;
      return;
    }

    const diferencia = this.numeroUsuario - this.numeroObjetivo;

    if (diferencia === 0) {
      this.mensajeJuego = `¡Has Ganado! 🎉 El número era ${this.numeroObjetivo}.`;
      this.intentosRestantes = 0; 
      this.juegoTerminado = true; 
      return;
    }

    // Retroalimentación (Te pasaste / Caliente / Templado / Frío)
    if (diferencia > 0) {
      this.mensajeJuego = 'Te pasaste';
    } else {
      const diffAbs = Math.abs(diferencia);
      if (diffAbs === 1) {
        this.mensajeJuego = 'Caliente'; 
      } else if (diffAbs === 2) {
        this.mensajeJuego = 'Templado'; 
      } else {
        this.mensajeJuego = 'Frío'; 
      }
    }
    
    // Decrementar intentos si fue fallido
    this.intentosRestantes--;
    
    if (this.intentosRestantes === 0) {
        this.mensajeJuego += ` ¡Se acabaron los intentos! 😥 El número era ${this.numeroObjetivo}.`;
        this.juegoTerminado = true; // Finaliza si los intentos llegan a 0
    }

    // Limpiar el input para el siguiente intento
    this.numeroUsuario = null as unknown as number;
  }

  getControl(controlName: string) {
    return this.configuracionForm.get(controlName);
  }
}
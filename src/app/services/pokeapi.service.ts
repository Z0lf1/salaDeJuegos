import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Obtener los primeros 151 pokémon
  getPrimeros151(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=151&offset=0`);
  }

  // Obtener detalles de un pokémon por número
  getPokemonPorNumero(numero: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon/${numero}/`);
  }
}

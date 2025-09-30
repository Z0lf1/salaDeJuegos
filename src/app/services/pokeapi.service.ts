import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) {}

  // Obtener los primeros 151 pokémon
  getPrimeros151(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/pokemon?limit=151&offset=0`);
  }

  // Obtener detalles de un pokémon por número
  getPokemonPorNumero(numero: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/pokemon/${numero}/`);
  }
}

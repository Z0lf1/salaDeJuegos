import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  private apiUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {}

  /** 🃏 Crea una nueva baraja */
  crearMazo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/new/shuffle/?deck_count=1`);
  }

  /** 🔄 Baraja un mazo existente */
  barajarMazo(deckId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${deckId}/shuffle/`);
  }

  /** 🂡 Roba una o más cartas del mazo */
  robarCartas(deckId: string, cantidad: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/${deckId}/draw/?count=${cantidad}`);
  }

  /** ♻️ Reinicia el mazo (vuelve todas las cartas) */
  reiniciarMazo(deckId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${deckId}/return/`);
  }
}

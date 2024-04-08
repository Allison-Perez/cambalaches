import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private apiUrl = 'https://localohost:3000/api/usuarios'; // URL de la API para enviar correos electrónicos

  constructor(private http: HttpClient) {}

  enviarComprobantePago(productos: any[], total: number): Observable<any> {
    // Construye el cuerpo del correo electrónico
    const correo = {
      destinatario: 'destinatario@example.com', // Dirección de correo del destinatario
      asunto: 'Comprobante de Pago', // Asunto del correo
      cuerpo: `
        Gracias por su compra. Aquí está su comprobante de pago:

        Productos:
        ${productos.map(producto => `- ${producto.titulo}: $${producto.precio}`).join('\n')}
        
        Total: $${total}
        
        ¡Gracias por comprar con nosotros!
      `
    };

    // Envía el correo electrónico simulado
    return this.http.post<any>(this.apiUrl, correo);
  }
}

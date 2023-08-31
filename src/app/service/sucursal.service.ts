import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constans } from '../utils/constans';
import { Sucursal } from '../model/sucursal';


@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }

  createSucursal(sucursal: any): Observable<any>{
    return this.http.post(`${Constans.dominio}${Constans.context}`, sucursal);
  }
updateSucursal(sucursal: any): Observable<any>{
  return this.http.patch(`${Constans.dominio}${Constans.context}`, sucursal);
  }
getSucursal(): Observable<any>{
  return this.http.get(`${Constans.dominio}${Constans.context}`);
  }
deleteSucursal(sucursal: Sucursal): Observable<any>{
  return this.http.delete(`${Constans.dominio}${Constans.context}`, {body: JSON.stringify(sucursal), headers: {'Content-Type': 'application/json'}});
  }
}

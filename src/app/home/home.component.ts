import { Sucursal } from './../model/sucursal';
import { SucursalService } from './../service/sucursal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listSucursales: Array<Sucursal> = [];
  mensaje = null;
  createBool = false;
  item : any;

  constructor(private sucursalService: SucursalService){}
  ngOnInit(): void{
    this.getSucursal();
  }

  getSucursal(){

     this.sucursalService.getSucursal().subscribe(data => {
      this.listSucursales = data;
    });
  }
  deleteSucursal(sucursal: any){
     this.sucursalService.deleteSucursal(sucursal).subscribe(data => {
      this.getSucursal();
    });

  }

  orquestadorModal(bool: boolean, item? : Sucursal){
    this.createBool = bool;
    this.item = item;
  }
  recibirEvent(event: any){
    this.getSucursal();
  }
}

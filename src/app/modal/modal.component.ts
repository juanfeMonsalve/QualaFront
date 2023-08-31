
import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SucursalService } from '../service/sucursal.service';
import { Sucursal } from '../model/sucursal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() save: EventEmitter<string> = new EventEmitter();
  sucursal: FormGroup ;
  @Input() createBool = false;
  @Input() item: Sucursal;
  mensaje='';

  constructor( private formBuilder:FormBuilder,private sucursalService: SucursalService){}
  ngOnInit(): void{
    this.iniciarForm();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.createBool){
      this.mensaje = 'Crear Sucursal'
    }
    else{
      this.mensaje = 'Actualiza Sucursal'
      console.log(this.item);
      if(this.item){
        this.updateForm();
      }
    }
  }
  iniciarForm(){
    this.sucursal = this.formBuilder.group({
      direccion: new FormControl(''),
      identificacion: new FormControl(''),
      descripcion: new FormControl(''),
      moneda: new FormControl('')
    });
  }
  updateForm(){
    this.sucursal = this.formBuilder.group({
      direccion: new FormControl(this.item.direccion),
      identificacion: new FormControl(this.item.identificacion),
      descripcion: new FormControl(this.item.descripcion),
      moneda: new FormControl(this.item.moneda)
    });
  }
  createSucursal(){

    this.sucursalService.createSucursal(this.generarRequest()).subscribe(data => {
      console.log(data);

    });
  }
  generarRequest(): Sucursal{
    var request: Sucursal = new Sucursal();
    request.descripcion = this.sucursal.value.descripcion;
    request.direccion = this.sucursal.value.direccion;
    request.identificacion = this.sucursal.value.identificacion;
    request.moneda = this.sucursal.value.moneda;
    request.id = 0;
    request.fechaCreacion = new Date();
    console.log(request);

    return request;
  }
  orquestador(){
    if (!this.createBool){
      this.updateSucursal();
    }else{
      this.createSucursal();
    }
  }
  updateSucursal(){
    var resquest = this.generarRequest();
    resquest.id = this.item.id;
    this.sucursalService.updateSucursal(resquest).subscribe(data => {
      if(data){
        this.sendInfo();
      }

    });
  }
  sendInfo(){
    this.save.emit("");
  }
}

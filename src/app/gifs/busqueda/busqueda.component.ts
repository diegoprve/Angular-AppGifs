import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private serviceGifs: GifsService) { }

  buscar() {
    const valorBuscar = this.txtBuscar.nativeElement.value;
        //Control que si hay vacio no haga nada
    if (valorBuscar.trim().length === 0) {
      return;
    }
    //console.log(valorBuscar);
    this.serviceGifs.buscarGifs(valorBuscar);
    this.txtBuscar.nativeElement.value = "";
  }
}

import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { 

  constructor( private serviceGifs: GifsService ){};

  get historialGifs(){
    return this.serviceGifs.historial;
  }

  buscarOtravez(valor: string){
    console.log(valor);
    this.serviceGifs.buscarGifs(valor);
  }

}

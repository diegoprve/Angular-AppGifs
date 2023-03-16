import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'tPPVVAer5kHZ2pL9h9mY4YeD82cWGyTm';
  private _historial: string[] = [];

  public resultado: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    //Llamar al localstorage
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultado = JSON.parse(localStorage.getItem('imagenes')!);
    }
  };

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      //console.log(this._historial);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //parametros para el consumo http
    const params = new HttpParams()
                    .set('api_key', this.apiKey)
                    .set('limit', '10')
                    .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params}) // tambien se puede {params : params}
      .subscribe((resp: any) => {
        //console.log(resp.data);
        this.resultado = resp.data;
        localStorage.setItem('imagenes', JSON.stringify(this.resultado));
      });
    
    

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Local } from './today/geolocationAPIModel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url='https://api.openweathermap.org/data/2.5/weather'
  apiKey='8936d0d271d0cf84e638ed11455e3cfd'
 
  constructor(private http: HttpClient) { }

  //retorna os parametros de latitude e longitude da API
  getWeatherDataByCoords(lat: any, lon: any){
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metrics') //metrics pq queremos usar medidas no sistema métrico
      .set('appid', this.apiKey)

    return this.http.get<Local>(this.url, {params})  //retorna um observable com a resposta do servidor em um objeto JSON (com a resposta da API)
  }
}

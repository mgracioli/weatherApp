import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import { Local } from './geolocationAPIModel';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  lat: any;
  lon: any;
  weather!: Local;

  ngOnInit(): void {
    this.getLocation();
  }
  
  //retorna as coordenadas baseado na geolocalização do browser
  getLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.watchPosition(dados => {
        this.lat = dados.coords.latitude;
        this.lon = dados.coords.longitude;

        //O serviço getWeatherDataByCoords retorna um observable com os dados retornados pelo servidor
        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      })
    }
  }
}

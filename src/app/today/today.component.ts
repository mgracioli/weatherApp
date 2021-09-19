import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  data: number = Date.now();
  lat: any;
  lon: any;
  weather!: any;
  ico!: string;

  ngOnInit(): void {
    this.getLocation();  //false quer dizer que é para executar o getLocation, eu mudo para 
  }
  
  //retorna as coordenadas baseado na geolocalização do browser
  getLocation(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition(dados => { //poderia usar o watchPosition, nesse caso, o browser ficaria atualizando as informações com a localização atual de tempos em tempos
        this.lat = dados.coords.latitude;
        this.lon = dados.coords.longitude;

        //O serviço getWeatherDataByCoords retorna um observable com os dados do clima retornados pelo servidor
        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      })
    }
  }

  //retorna a cidade baseado no que o usuário digitar na input
  getCity(city: string){
    this.weatherService.getWeatherDataByCityName(city).subscribe(data => {
      this.weather = data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {TruckStandsService} from "../../services/truck-stands.service";
import {Loader} from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-truck-stands',
  templateUrl: './truck-stands.component.html',
  styleUrls: ['./truck-stands.component.scss']
})
export class TruckStandsComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  mapType = 'satellite';
  constructor(private truckStandsService: TruckStandsService) { }

  ngOnInit(): void {
    this.getTruckStands();
    let loader = new Loader({
      apiKey: 'AIzaSyB5rbSnFPSFIzBcQqmqWWpAUiiEXENA5BQ'
    })
    loader.load().then(() => {
      new google.maps.Map(<HTMLElement>document.getElementById("map"), {
        center: {lat: 51.233334, lng: 6.783333},
        zoom: 6
      });
    })
  }


  getTruckStands(){
    this.truckStandsService.getTruckStands().subscribe((stands: any) => {
      console.log(stands);
    });
  }

}

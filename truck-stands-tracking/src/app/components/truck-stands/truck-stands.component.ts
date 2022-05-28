import {Component, OnInit, ViewChild} from '@angular/core';
import {TruckStandsService} from "../../services/truck-stands.service";
import {Locations} from "./models/locations";
import {Ilocation} from "./models/ilocation";

@Component({
  selector: 'app-truck-stands',
  templateUrl: './truck-stands.component.html',
  styleUrls: ['./truck-stands.component.scss']
})
export class TruckStandsComponent implements OnInit {
  map: any;
  @ViewChild('map') mapElement: any;
  latitude = 23.8423489;
  longitude = 90.3590594;
  truckStands: Locations = {data:[]};

  constructor(private truckStandsService: TruckStandsService) { }

  ngOnInit(): void {
    this.getTruckStands();
  }

  getTruckStands(){
    this.truckStandsService.getTruckStands().subscribe((stands: Locations) => {
      this.truckStands = stands;
      this.setLocationToMap();
    });
  }


  setLocationToMap(): void {
    const mapProperties = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.truckStands.data.forEach((location:Ilocation) => {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.latitude, location.longitude),
        map: this.map,
        title: location.name
      });

      // Add click event to open info window on marker
      marker.addListener("click", (mapsMouseEvent: any) => {
        const infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
          content: marker.getTitle() + ', ' + JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        });
        // infoWindow.setContent(
        //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        // );
         infoWindow.open(marker.getMap(), marker);
      });
    });
  }
}

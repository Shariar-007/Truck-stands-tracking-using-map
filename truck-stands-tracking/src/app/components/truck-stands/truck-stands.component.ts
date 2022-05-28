import {Component, OnInit, ViewChild} from '@angular/core';
import {TruckStandsService} from "../../services/truck-stands.service";
import {Loader} from "@googlemaps/js-api-loader";

@Component({
  selector: 'app-truck-stands',
  templateUrl: './truck-stands.component.html',
  styleUrls: ['./truck-stands.component.scss']
})
export class TruckStandsComponent implements OnInit {
  map: any;
  @ViewChild('map') mapElement: any;
  latitude = 43.879078;
  longitude = -103.4615581;
  markers = [
    { latitude: 23.8423489, longitude: 90.3590594, name: 'Dhaka,Mirpur Kalshi'},
    { latitude: 7.92658, longitude: -12.05228, name: 'Dhaka,Dhanmondi 15'},
    { latitude: 48.75606, longitude: -118.859, name: 'Dhaka,Mohammadpur'},
    { latitude: 5.19334, longitude: -67.03352, name: 'Dhaka,Gabhtoli'},
    { latitude: 12.09407, longitude: 26.31618, name: 'Dhaka,Motijhil'},
    { latitude: 47.92393, longitude: 78.58339, name: 'Dhaka,Malibagh'}
  ];

  constructor(private truckStandsService: TruckStandsService) { }

  ngOnInit(): void {
    this.getTruckStands();
  }

  getTruckStands(){
    this.truckStandsService.getTruckStands().subscribe((stands: any) => {
      console.log(stands);
    });
  }


  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.markers.forEach(location => {
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

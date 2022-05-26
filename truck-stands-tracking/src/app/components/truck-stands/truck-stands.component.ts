import { Component, OnInit } from '@angular/core';
import {TruckStandsService} from "../../services/truck-stands.service";

@Component({
  selector: 'app-truck-stands',
  templateUrl: './truck-stands.component.html',
  styleUrls: ['./truck-stands.component.scss']
})
export class TruckStandsComponent implements OnInit {

  constructor(private truckStandsService: TruckStandsService) { }

  ngOnInit(): void {
    this.getTruckStands();
  }


  getTruckStands(){
    this.truckStandsService.getTruckStands().subscribe((stands: any) => {
      console.log(stands);
    });
  }

}

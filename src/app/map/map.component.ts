import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GeocodeService } from '../services/map/geocode.service';
import { Coords } from '../models/coords.interface';
import { tap } from 'rxjs/operators';
import { MDCTextField } from '@material/textfield';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  zoom: number = 15;
  mapTypeId: string = 'hybrid';
  iconMarker: string = 'http://localhost/rental-std/images/marker.png';
  map: any;
  location = { lat: 44.997762, lng: -1.201141 };
  loading: boolean;
  originCoords: Coords = { lat: 0, lng: 0 };
  destinationCoords: Coords = { lat: 0, lng: 0 };
  openMenu: boolean = false;
  renderOptions: any = {
    polylineOptions: { strokeColor: '#FFFFFF' }
  }
  originGeocode = '';
  destinationGeocode = '';
  public txtDepart;
  public txtArrivee;
  placeholderDepart = '';
  placeholderArrivee = '';

  constructor(private geocodeService: GeocodeService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.txtDepart = new MDCTextField(document.querySelector('.txtDepart'));
    this.txtArrivee = new MDCTextField(document.querySelector('.txtArrivee'));
    this.placeholderDepart = 'DEPART';
    this.placeholderArrivee = 'ARRIVEE';
  }

  showLocation(form) {

    this.originGeocode = form.origin.value;
    this.destinationGeocode = form.destination.value;

    if (this.originGeocode == '') { this.originGeocode = 'Paris'; form.origin.value = 'Paris'; }
    if (this.destinationGeocode == '') {
      this.destinationGeocode = '19 résidence horizon marin, 33680 Lacanau';
      form.destination.value = this.destinationGeocode;
    }
    this.initDatasMap(0, 0, 0);

    this.geocodeService.geocodeAddress(this.originGeocode).pipe(
      tap((x) => console.log(x))
    )
      .subscribe(
        location => {
          this.originCoords = location;
          this.ref.detectChanges();
        }
      );

    this.geocodeService.geocodeAddress(this.destinationGeocode)
      .subscribe(
        location => {
          this.destinationCoords = location;
          this.ref.detectChanges();
        }
      );
  }

  showPlace() {
    this.originGeocode = '';
    this.destinationGeocode = '';
    this.initDatasMap(44.997762, -1.201141, 18);
  }

  private initDatasMap(lat: number, lng: number, zoom: number) {
    this.location = { lat: lat, lng: lng };
    this.zoom = zoom;
  }

}

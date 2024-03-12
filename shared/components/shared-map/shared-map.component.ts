import { InputFieldComponent } from './../forms/input-field/input-field.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  NgZone,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild,
  Input,
} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Loader } from '@googlemaps/js-api-loader';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ChangeDirService } from '../../services/change-dir.service';

@Component({
  selector: 'app-shared-map',
  templateUrl: './shared-map.component.html',
  styleUrls: ['./shared-map.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    TranslateModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    InputFieldComponent,
  ],
  providers: [ChangeDirService],
})
export class SharedMapComponent  {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  @ViewChild('search', { static: false })
  public searchElementRef!: ElementRef;

  @ViewChild(GoogleMap)
  public map!: GoogleMap;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() label: string = '';
  @Input() error: string = '';
  @Output()
  getLocationEvent: EventEmitter<any> = new EventEmitter<any>();

  display: any;
  zoom = 4;

  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  currentAddress: any;
  latitude!: any;
  longitude!: any;

  ssrLoad = false;
  isGoogleMapsApiLoaded: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private langService: ChangeDirService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['core', 'places'],
      language: this.langService.langStorage,
    });
    if (isPlatformBrowser(this.platformId)) {
      this.ssrLoad = true;
      loader.load().then(() => {
        this.isGoogleMapsApiLoaded = true;

        this.initializeAutocomplete();

        this.getUserLocation();

        this.isGoogleMapsApiLoaded = true;
      });
    }
  }

  ngAfterViewInit(): void {}

  initializeAutocomplete(): void {
    if (this.searchElementRef) {
      // Binding autocomplete to search input control
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );

      // Align search box to center

      // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      //   this.searchElementRef.nativeElement
      // );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(async () => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (
            place.geometry === undefined ||
            place.geometry.location === null
          ) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location?.lat();
          this.longitude = place.geometry.location?.lng();
          this.center = {
            lat: this.latitude,
            lng: this.longitude,
          };

          this.markerPositions = [this.center];

          const address = await this.reverseGeocode(this.center);

          this.getLocaleDirection(this.center.lat, this.center.lat, address);
        });
      });
    }
  }

  // Google Maps

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.zoom = 12;
          // Set an appropriate zoom level

          this.markerPositions = [];
          this.markerPositions = [this.center];

          const address = await this.reverseGeocode(this.center);

          this.getLocaleDirection(this.center.lat, this.center.lat, address);
        },
        (error) => {
          console.error('Error getting the user location:', error);
          // You can handle errors here, e.g., by setting a default location
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle the case where geolocation is not supported
    }
  }

  async addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [];
    this.markerPositions.push(event.latLng!.toJSON());

    this.center = {
      lat: event.latLng?.lat()!,
      lng: event.latLng?.lng()!,
    };
    const address = await this.reverseGeocode(this.center);

    this.getLocaleDirection(event.latLng?.lat(), event.latLng?.lng(), address);
  }

  private reverseGeocode(position: google.maps.LatLngLiteral): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: position /*language: this.langService.langStorage*/ },
        (results, status) => {
          if (status === 'OK') {
            if (results && results[0]) {
              // console.log(results);
              resolve(results[0]);
            } else {
              reject('No results found');
            }
          } else {
            reject('Geocoder failed due to: ' + status);
          }
        }
      );
    });
  }
  openInfoWindow(marker: MapMarker) {
    if (marker.getPosition()) {
      this.center = {
        lat: marker.getPosition()?.lat()!,
        lng: marker.getPosition()?.lng()!,
      };
      this.reverseGeocode(this.center).then((address) => {
        this.currentAddress = address;
        if (this.infoWindow) {
          this.infoWindow.open(marker);
        }
      });
    }
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }

  getLocaleDirection(lat: any, long: any, address: string) {
    const addressObject = {
      lat,
      long,
      address,
    };
    this.getLocationEvent.emit(addressObject);
  }
}

import { Component, input, output } from '@angular/core';
import { PlacesService } from './places.service';
import { Place } from './place.model';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent {
  places = input.required<Place[]>();
  selectPlace = output<Place>();

  constructor(private placesSerivce: PlacesService){}



  onSelectPlace(place: Place) {
   this.placesSerivce.addPlaceToUserPlaces(place).subscribe();
  }
}

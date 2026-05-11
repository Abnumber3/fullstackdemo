import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';



export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();




  loadAvailablePlaces() {
  
  }

  loadUserPlaces() {
  
  }

  addPlaceToUserPlaces(places: Place) {
 


  }

  removeUserPlace(place: Place) {

}

}

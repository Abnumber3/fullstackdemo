import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  constructor(private httpClient: HttpClient){}


  loadAvailablePlaces() {
    return this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').pipe(
      tap((data)=>{
        console.log(data.places);
      })
    )
  }

  loadUserPlaces() {
    return this.httpClient.get<{places: Place[]}>('http://localhost:3000/user-places').pipe(
      tap((data)=>{
        console.log('User places: ', data.places);
        this.userPlaces.set(data.places)
      })
    )
  }

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}
}

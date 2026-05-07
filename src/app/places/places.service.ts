import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { filter, tap } from 'rxjs';

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

  addPlaceToUserPlaces(places: Place) {
  return this.httpClient.put<{userPlaces: Place[]}>('http://localhost:3000/user-places', {
    placeId: places.id
  }).pipe(
    tap((data)=>{
      this.userPlaces.set(data.userPlaces)
    })
  )


  }

  removeUserPlace(place: Place) {

  this.userPlaces.update((currentItems) => {
    return currentItems.filter((item) => {
      return item.id !== place.id;
    });
  });

  return this.httpClient.delete(
    `http://localhost:3000/user-places/${place.id}`
  );
}
}

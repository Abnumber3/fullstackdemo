import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();


  constructor(private httpClient: HttpClient){}




  loadAvailablePlaces() {
  return   this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').pipe(
      tap((data)=>{
        console.log('places ' + data.places)
      })
    )

  
  }

  loadUserPlaces() {
  
  }

  addPlaceToUserPlaces(places: Place) {
    return this.httpClient.put<{place: Place}>('http://localhost:3000/places',{
      placeId : places.id
    }).pipe(
      tap((data)=>{
        this.userPlaces.update((currentData)=>{
          return [...currentData, places]
        })
        console.log('added place: ', places )
      })
    )


  }

  removeUserPlace(place: Place) {

}

}

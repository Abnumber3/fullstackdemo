import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';


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
  return this.httpClient
    .get< {places: Place[] }>('http://localhost:3000/user-places')
    .pipe(
      tap((data) => {
        this.userPlaces.set(data.places);
      }),

      catchError((error) => {
        console.error('Failed to load user places:', error);

        // Optional fallback
        this.userPlaces.set([]);

        // Re-throw the error so components can react too
        return throwError(() => error);
      })
    );
}

  addPlaceToUserPlaces(places: Place) {
    return this.httpClient.put<{place: Place}>('http://localhost:3000/user-places',{
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
    this.httpClient.delete(`http://localhost:3000/user-places/:${place.id}`).pipe(
      tap(()=>{
        this.userPlaces.update((currentData)=>{
          return this.userPlaces().filter((placesData)=>{
            return placesData.id !== place.id
          })
        })
      })
    )


}

}

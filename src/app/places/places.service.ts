import { signal } from '@angular/core';
import { Place } from './place.model';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();


 constructor(private http: HttpClient){}



  loadAvailablePlaces() {
    return this.http.get<{places: Place[]}>('http://localhost:3000/places').pipe(
      tap((data)=>{
        console.log(data.places[0].id +' places from db')
      })
    )

  }

  loadUserPlaces() {
  return this.http.get<{places: Place[]}>('http://localhost:3000/user-places').pipe(
    tap((data)=>{
      this.userPlaces.set(data.places); 
    })
  )
}

  addPlaceToUserPlaces(place: Place) {
  return this.http.put('http://localhost:3000/user-places',
    {placeId: place.id}
  ).pipe(
    tap(()=>{
      this.userPlaces.update((currentUserPlace)=>{
        if(!currentUserPlace.some((p)=>{
          return p.id === place.id;
        })){
          return [...currentUserPlace, place];
        }
        console.log('Place already exists in user places.');
        return currentUserPlace;
      })
    })
  )
}


removeUserPlace(place: Place) {
  return this.http.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
    tap(()=>{
      this.userPlaces.update((currentPlaces)=>{
        return currentPlaces.filter((currentData)=>{
          return currentData.id !== place.id;
        })
      })
    })
  )
}


}
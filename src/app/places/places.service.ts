import { signal } from '@angular/core';
import { Place } from './place.model';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';




@Injectable({
  providedIn: 'root'
})


export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();




//  apiUrl = 'http://localhost:3000/places';

constructor(
  private http: HttpClient,
  private errorService: ErrorService

){}



  loadAvailablePlaces() {
    return this.http.get<{places: Place[]}>('http://localhost:3000/places').pipe(
      tap((data)=>{
        console.log('Fetched places:', data.places);
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
      this.userPlaces.update((currentPlaces)=>{
       if(!currentPlaces.some((p)=>{
        return p.id === place.id;
      })){
        return [...currentPlaces, place];
      }
      this.errorService.showError('This place is already in your list of places.');
      console.log('Place already exists in user places:', place);
      return currentPlaces;
        
      })
    }),

  ) 
}


removeUserPlace(place: Place){ {
  return this.http.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
    tap(()=>{
      this.userPlaces.update((currentPlaces)=>{
        return currentPlaces.filter((p)=>{
          return p.id !== place.id;
        })
      })
    })
  )

}
}

}
import { Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';


@Injectable({
  providedIn: 'root'
})



export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();


  constructor(
    private httpClient: HttpClient,
    private errorService: ErrorService
  
  ){}




  loadAvailablePlaces() {
  return   this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').pipe(
      tap((data)=>{
        console.log('places ' + data)
      }),
      catchError((error)=>{
        console.error(error)
        this.errorService.showError('Unable To load available places.')
        return throwError(()=>{
          return error
        })
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

  addPlaceToUserPlaces(newPlace: Place) {
  return this.httpClient.put<{ userPlaces: Place[] }>('http://localhost:3000/user-places', {
    placeId: newPlace.id
  }).pipe(
    tap(() => {
      this.userPlaces.update((currentData) => {
        // 1. Check if the place is already in the list
        const exists = currentData.some((p)=>{
          return p.id === newPlace.id
        })

        // 2. If it exists, return the current data unchanged
        if (exists) {
          return currentData;
        }

        // 3. If it's new, add it to the array
        return [...currentData, newPlace];
      });
    })
  );
}


removeUserPlace(place: Place) {
  return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
    tap(() => {
      this.userPlaces.update((currentData) => 
        currentData.filter((p) => p.id !== place.id)
      );
    }),
    catchError((error) => {
      // Logic to handle the error (e.g., showing a notification)
      console.error('Could not delete place', error);
      return throwError(() => new Error('Failed to delete the place.'));
    })
  );
}
}

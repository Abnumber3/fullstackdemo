import { Component, signal, OnInit, DestroyRef } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {


  places = signal<Place[] | undefined>(undefined);
  isFetching = signal<boolean>(false);


  constructor(
    private placesService: PlacesService,
    private httpClient: HttpClient,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.isFetching.set(true);
    const placeSubscription = this.placesService.loadAvailablePlaces().pipe(
      finalize(()=>{
        this.isFetching.set(false);
      })
    ).subscribe({
      next: ((data)=>{
        this.places.set(data.places);
      }),
      error: ((err)=>{
        console.log('Error fetching places.: ', err);
        this.isFetching.set(false);
      }),
    })
    this.destroyRef.onDestroy(()=>{
      placeSubscription.unsubscribe();
    })
  }

  receivedPlaces(place: Place)  {
 console.log('hello')

}
}
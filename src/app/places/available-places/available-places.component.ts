import { Component, signal, OnInit, DestroyRef } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';



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
    private destroyRef: DestroyRef
  ) {}




  ngOnInit(): void {
    this.isFetching.set(true)
    const loadPlace = this.placesService.loadAvailablePlaces().pipe(
      finalize(()=>{
        this.isFetching.set(false)
      })
    ).subscribe({
      next: ((data)=>{
        this.places.set(data.places)
        console.log(data.places + 'places')
      }),

      error: ((err)=>{
        console.log('unable to fetch available places ', err)
      })
    })
    this.destroyRef.onDestroy(()=>{
      loadPlace.unsubscribe();
      
    })
  }

  addToUser(place: Place){
    this.placesService.addPlaceToUserPlaces(place).subscribe()
  }




}
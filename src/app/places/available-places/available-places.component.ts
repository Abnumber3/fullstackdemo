import { Component, signal, OnInit, DestroyRef } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';
import {finalize} from 'rxjs/operators';






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
    this.isFetching.set(true);
   const subscription = this.placesService.loadAvailablePlaces().pipe(
      finalize(()=>{
        this.isFetching.set(false);
      })
    ).subscribe({
      next: ((data)=>{
        this.places.set(data.places);
        console.log('Available places loaded:', data);
      }),
      error: (error)=>{
        console.error('Error fetching places:', error);
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
    
  }

  addToUser(place: Place){
    this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: ()=>{
        console.log(`Place with id ${place.id} added to user places.`);
      }
    })
    
  }




}
import { Component, OnInit, DestroyRef } from '@angular/core';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { signal } from '@angular/core';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

places = this.placesService.loadedUserPlaces;

  
  constructor(
    private placesService: PlacesService,
    private destroyRef: DestroyRef
  
  ){}

  ngOnInit(): void {
   this.placesService.loadUserPlaces().subscribe();
  }

  deleteUserPlace(place: Place){
   const subscription =  this.placesService.removeUserPlace(place).subscribe();

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
}


}
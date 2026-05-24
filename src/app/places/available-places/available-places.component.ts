import { Component, signal, OnInit, DestroyRef } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
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
   
  ) {}




  ngOnInit(): void {
 
  }

  addToUser(place: Place){
    
  }




}
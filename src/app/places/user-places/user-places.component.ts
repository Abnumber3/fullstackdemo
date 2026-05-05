import { Component, OnInit } from '@angular/core';
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
places = signal<Place[] | undefined>(undefined);



constructor(
  private placeService: PlacesService,
  private httpClient: HttpClient,
  private destroyRef: DestroyRef
) {}
  


  ngOnInit(): void {
   const
  }
}

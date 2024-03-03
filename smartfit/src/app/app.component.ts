import { Component } from '@angular/core';
import { Location } from './types/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smartfit';
  units: Location[] = [];

  onSubmit(event: Location[]){
    this.units = event;
  }
}

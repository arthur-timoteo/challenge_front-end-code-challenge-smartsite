import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from '../../services/units.service';
import { Location } from '../../types/location';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formGroup!: FormGroup;
  unitsBase: Location[] = [];
  units: Location[] = [];
  firstSearch: boolean = true;
  filteredUnits1: Location[] = [];

  constructor(private formBuilder: FormBuilder, private unitService: UnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      period: '',
      showClosedUnits: true
    })
  }

  onSubmit(): void {
    if(this.firstSearch) {
      this.unitService.getAllUnits()
        .subscribe(data => {
          this.unitsBase = data.locations;
          
          this.units = this.filterUnits();
        });

      this.firstSearch = false;
    } else {
      this.units = this.filterUnits();
    }
  }

  onClean(): void {
    this.formGroup.reset();
  }

  filterUnits(): Location[] {
    if(this.formGroup.value.showClosedUnits){
      return this.unitsBase;
    } else {
      return this.unitsBase.filter(unit => unit.opened === true);
    }
  }
}

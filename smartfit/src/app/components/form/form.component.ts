import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from '../../services/units.service';
import { Location } from '../../types/location';

const PERIODS_HOUR = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type PERIODS_INDEXES = 'morning' | 'afternoon' | 'night';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Output() sharedUnits: EventEmitter<Location[]> = new EventEmitter();
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
          this.sharedUnits.emit(this.units);
        });

      this.firstSearch = false;
    } else {
      this.units = this.filterUnits();
      this.sharedUnits.emit(this.units);
    }
  }

  filterUnits(): Location[] {
    let { period } = this.formGroup.value;

    if(this.formGroup.value.showClosedUnits){
      return period == '' ? this.unitsBase : this.filterUnitsByHour(this.unitsBase, period);
    } else {
      return period == '' ? this.unitsBase.filter(unit => unit.opened === true) : this.filterUnitsByHour(this.unitsBase.filter(unit => unit.opened === true), period);
    }
  }

  transformWeekday(weekday: number){
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnitsByHour(filteredUnits: Location[], period: string): Location[] {
    let openHour = parseInt(PERIODS_HOUR[period as PERIODS_INDEXES].first);
    let closeHour = parseInt(PERIODS_HOUR[period as PERIODS_INDEXES].last);

    return filteredUnits.filter((unit) => { 
      if(!unit.schedules) return true;

      let weekday_now = this.transformWeekday(new Date().getDay());

      for(let i = 0; i < unit.schedules.length; i++){
        let schedule_hour = unit.schedules[i].hour;
        let schedule_weekday = unit.schedules[i].weekdays;

        if(weekday_now === schedule_weekday){
          if(schedule_hour !== 'Fechada'){
            let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');
            let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
            let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);
  
            if(unit_open_hour_int <= openHour && unit_close_hour_int >= closeHour) return true
            else return false
          }
        }
      }

      return false;
     });
  }

  onClean(): void {
    this.formGroup.reset();
  }
}

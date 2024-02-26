import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private unitService: UnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      period: '',
      showClosedUnits: false
    })
  }

  onSubmit(): void {
    this.unitService.getAllUnits()
      .subscribe(data => console.log(data));
  }

  onClean(): void {
    this.formGroup.reset();
  }
}

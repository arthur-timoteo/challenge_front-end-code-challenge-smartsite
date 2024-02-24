import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      period: '',
      showClosedUnits: false
    })
  }

  onSubmit(): void {
    console.log("Submit");
  }

  onClean(): void {
    this.formGroup.reset();
  }
}

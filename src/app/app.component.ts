import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validate();
  }

  /********BUILD FORM-GROUP START*******/
  public validate(): void {
    this.formGroup = this.fb.group({
      formArray1: this.fb.array([this.initX()]),
    });
    this.formGroup.valueChanges.subscribe((data) => console.log(data));
  }

  get f(): any {
    return this.formGroup.controls;
  }

  public initX(): FormGroup {
    return this.fb.group({
      X: ['X1', [Validators.required, Validators.pattern('[0-9]{3}')]],
      formArray2: this.fb.array([this.initY()]),
    });
  }

  public initY(): FormGroup {
    return this.fb.group({
      Y1: ['Y1', [Validators.required, Validators.pattern('[0-9]{3}')]],
      Y2: ['Y2', [Validators.required, Validators.pattern('[0-9]{3}')]],
      formArray3: this.fb.array([this.initZ()]),
    });
  }

  public initZ(): FormGroup {
    return this.fb.group({
      Z: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
    });
  }
  /********BUILD FORM-GROUP END*******/

  /********EVENT CLICKZ START*******/
  public addX(): void {
    const control = this.f.formArray1 as FormArray;
    control.push(this.initX());
  }

  public addY(ix: number): void {
    const control = this.f.formArray1.at(ix).get('formArray2') as FormArray;
    control.push(this.initY());
  }

  public addZ(ix: number, iy: number): void {
    const control = this.f.formArray1.at(ix).get('formArray2').at(iy).get('formArray3') as FormArray;
    control.push(this.initZ());
  }

  public onSubmit(formGroup: FormGroup): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      alert('Summit success!');
      console.log(formGroup.value);
    }
  }

  public onRemoveZIndex(ix: number, iy: number, iz: number): void {
    this.f.formArray1['controls'][ix]['controls'].formArray2['controls'][iy]['controls'].formArray3.removeAt(iz);
  }

  public onRemoveZ(ix: number, iy: number, Z: FormGroup): void {
    let formArray3 = this.f.formArray1['controls'][ix]['controls'].formArray2['controls'][iy]['controls'].formArray3;
    let constrols3 = formArray3['controls'];
    constrols3 = constrols3.filter((control: FormGroup) => control.value['Z'] === Z['controls']['Z']?.value);
    console.log('constrols3',constrols3)
    formArray3.setControl(constrols3);
  }

  public onUpdate(): void {
    this.f.formArray1['controls'][0]['controls'].formArray2['controls'][0]['controls'].formArray3['controls'][0]?.patchValue({
      Z: 'ZZ',
    });
  }
  /********EVENT CLICKZ END*******/
}

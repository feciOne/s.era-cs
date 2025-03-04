import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngxs/store';
import { SetPersonalInfoData } from '../../../store/application-form/states/personal-info/personal-info.actions';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import {
  PersonalInfoStateModel,
  maritalStatuses,
  cities,
} from '../../../shared/models';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-personal-info-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoFormComponent implements OnInit, OnDestroy {
  @Input() readonly = false;
  #store = inject(Store);
  form!: FormGroup;

  maritalStatuses = maritalStatuses;
  cities = cities;

  personalInfo$: Observable<PersonalInfoStateModel> = this.#store.select(
    (state) => state.personalInfo
  );

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.personalInfo$.subscribe((data) => {
      this.form.patchValue(data);
      this.form.updateValueAndValidity();
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: [{ value: '', disabled: this.readonly }, Validators.required],
      lastName: [{ value: '', disabled: this.readonly }, Validators.required],
      dateOfBirth: [
        { value: null, disabled: this.readonly },
        Validators.required,
      ],
      identityNumber: [
        { value: '', disabled: this.readonly },
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      maritalStatus: [
        { value: null, disabled: this.readonly },
        Validators.required,
      ],
      email: [
        { value: '', disabled: this.readonly },
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        { value: '', disabled: this.readonly },
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      address: [
        { value: '', disabled: this.readonly },
        [Validators.required, Validators.minLength(10)],
      ],
      city: [{ value: null, disabled: this.readonly }, Validators.required],
      zipCode: [
        { value: '', disabled: this.readonly },
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  ngOnDestroy(): void {
    this.#store.dispatch(new SetPersonalInfoData(this.form.value)).subscribe();
    this.form.reset();
  }
}

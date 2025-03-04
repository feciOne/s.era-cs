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
import { SetRegularIncomeInfoData } from '../../../store/application-form/states/regular-income-info/regular-income-info.actions';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import {
  RegularIncomeInfoStateModel,
  employmentStatuses,
} from '../../../shared/models';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-regular-income-info-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './regular-income-info-form.component.html',
  styleUrl: './regular-income-info-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegularIncomeInfoFormComponent implements OnInit, OnDestroy {
  @Input() readonly = false;
  #store = inject(Store);
  form!: FormGroup;

  employmentStatuses = employmentStatuses;

  regularIncomeInfo$: Observable<RegularIncomeInfoStateModel> =
    this.#store.select((state) => state.regularIncomeInfo);

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.regularIncomeInfo$.subscribe((data) => {
      this.form.patchValue(data);
      this.form.updateValueAndValidity();
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      employmentStatus: [
        { value: null, disabled: this.readonly },
        Validators.required,
      ],
      employerName: [{ value: '', disabled: this.readonly }],
      monthlyIncome: [
        { value: '', disabled: this.readonly },
        Validators.required,
      ],
    });
  }

  ngOnDestroy(): void {
    this.#store
      .dispatch(new SetRegularIncomeInfoData(this.form.value))
      .subscribe();
    this.form.reset();
  }
}

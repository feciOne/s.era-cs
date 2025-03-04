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
import { SetLoanInfoData } from '../../../store/application-form/states/loan-info/loan-info.actions';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';

import {
  LoanInfoStateModel,
  loanPurposes,
  loanTypes,
} from '../../../shared/models';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-info-form',
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
    SelectModule,
  ],
  templateUrl: './loan-info-form.component.html',
  styleUrl: './loan-info-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanInfoFormComponent implements OnInit, OnDestroy {
  @Input() readonly = false;
  #store = inject(Store);
  form!: FormGroup;

  loanTypes = loanTypes;
  loanPurposes = loanPurposes;
  
  loanInfo$: Observable<LoanInfoStateModel> = this.#store.select((state) => state.loanInfo);

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.loanInfo$.subscribe((data) => {
      this.form.patchValue(data);
      this.form.updateValueAndValidity();
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      loanAmount: [{ value: '', disabled: this.readonly }, Validators.required],
      loanTerm: [{ value: '', disabled: this.readonly }, Validators.required],
      interestRate: [{ value: '', disabled: this.readonly }, Validators.required],
      loanType: [{ value: null, disabled: this.readonly }, Validators.required],
      loanPurpose: [{ value: null, disabled: this.readonly }, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.#store.dispatch(new SetLoanInfoData(this.form.value)).subscribe();
    this.form.reset();
  }
}

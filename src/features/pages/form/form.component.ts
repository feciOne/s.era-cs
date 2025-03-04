import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { LoanInfoReset } from '../../../store/application-form/states/loan-info/loan-info.actions';
import { PersonalInfoReset } from '../../../store/application-form/states/personal-info/personal-info.actions';
import { RegularIncomeInfoReset } from '../../../store/application-form/states/regular-income-info/regular-income-info.actions';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

import { LoanInfoFormComponent } from '../../components/loan-info-form/loan-info-form.component';
import { PersonalInfoFormComponent } from '../../components/personal-info-form/personal-info-form.component';
import { RegularIncomeInfoFormComponent } from '../../components/regular-income-info-form/regular-income-info-form.component';

import type { IApplication } from '../../../shared/models';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    StepperModule,
    ButtonModule,
    LoanInfoFormComponent,
    PersonalInfoFormComponent,
    RegularIncomeInfoFormComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnDestroy {
  #store = inject(Store);
  #http = inject(HttpClient);
  #router = inject(Router);
  summary = false;

  showSummary(): void {
    this.summary = true;
  }

  applyLoan(): void {
    const applicationFormData: IApplication = {
      loanInfo: this.#store.selectSnapshot((state) => state.loanInfo),
      personalInfo: this.#store.selectSnapshot((state) => state.personalInfo),
      regularIncomeInfo: this.#store.selectSnapshot(
        (state) => state.regularIncomeInfo
      ),
    };

    this.#http
      .post('http://localhost:3000/applications', applicationFormData)
      .subscribe(() => {
        this.#store.dispatch([
          new LoanInfoReset(),
          new PersonalInfoReset(),
          new RegularIncomeInfoReset(),
        ]);
        localStorage.clear();
        this.summary = false;
        this.#router.navigate(['/list']);
      });
  }

  ngOnDestroy(): void {
    this.#store.dispatch([
      new LoanInfoReset(),
      new PersonalInfoReset(),
      new RegularIncomeInfoReset(),
    ]);
    localStorage.clear();
  }
}

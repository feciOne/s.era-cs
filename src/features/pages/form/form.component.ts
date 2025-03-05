import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../../core/guards/you-will-lost-your-progress.guard';

import { Store } from '@ngxs/store';
import { LoanInfoReset } from '../../../store/application-form/states/loan-info/loan-info.actions';
import { PersonalInfoReset } from '../../../store/application-form/states/personal-info/personal-info.actions';
import { RegularIncomeInfoReset } from '../../../store/application-form/states/regular-income-info/regular-income-info.actions';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ConfirmDialogModule,
    LoanInfoFormComponent,
    PersonalInfoFormComponent,
    RegularIncomeInfoFormComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements CanComponentDeactivate, OnDestroy {
  #store = inject(Store);
  #http = inject(HttpClient);
  #router = inject(Router);

  formValidtyMatrix = [false, false, false];
  summary = false;

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

  updateFormValidity(index: number, isValid: boolean): void {
    this.formValidtyMatrix[index] = isValid;
  }

  showSummary(): void {
    this.summary = !this.summary;
  }

  canDeactivate(): boolean {
    return confirm('You will lost your progress. Are you sure?');
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

import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoanInfoReset, SetLoanInfoData } from './loan-info.actions';
import { LoanInfoStateModel } from '../../../../shared/models';

export const loanInfoDefaults: LoanInfoStateModel = {
  loanAmount: 50000,
  loanTerm: 12,
  interestRate: 5,
  loanPurpose: 'Debt Consolidation',
  loanType: 'Personal'
};

@State<LoanInfoStateModel>({
  name: 'loanInfo',
  defaults: loanInfoDefaults
})
@Injectable()
export class LoanInfoState {
  @Selector()
  static getInfoState(state: LoanInfoStateModel): LoanInfoStateModel {
    return LoanInfoState.getInstanceState(state);
  }

  private static setInstanceState(state: LoanInfoStateModel): LoanInfoStateModel {
    return { ...state };
  }

  private static getInstanceState(state: LoanInfoStateModel): LoanInfoStateModel {
    return { ...state };
  }

  @Action(SetLoanInfoData)
  setTasks(
    { setState }: StateContext<LoanInfoStateModel>,
    { payload }: SetLoanInfoData
  ) {
    setState(LoanInfoState.setInstanceState(payload));
  }

  @Action(LoanInfoReset)
  resetTasks({ setState }: StateContext<LoanInfoStateModel>) {
    setState(loanInfoDefaults);
  }
}

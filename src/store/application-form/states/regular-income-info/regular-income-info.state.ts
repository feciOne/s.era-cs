import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { RegularIncomeInfoReset, SetRegularIncomeInfoData } from './regular-income-info.actions';
import { RegularIncomeInfoStateModel } from '../../../../shared/models';

export const regularIncomeInfoDefaults: RegularIncomeInfoStateModel = {
  employmentStatus: 'Employed',
  employerName: '',
  monthlyIncome: 5000
};

@State<RegularIncomeInfoStateModel>({
  name: 'regularIncomeInfo',
  defaults: regularIncomeInfoDefaults
})
@Injectable()
export class RegularIncomeInfoState {
  @Selector()
  static getInfoState(state: RegularIncomeInfoStateModel): RegularIncomeInfoStateModel {
    return RegularIncomeInfoState.getInstanceState(state);
  }

  private static setInstanceState(state: RegularIncomeInfoStateModel): RegularIncomeInfoStateModel {
    return { ...state };
  }

  private static getInstanceState(state: RegularIncomeInfoStateModel): RegularIncomeInfoStateModel {
    return { ...state };
  }

  @Action(SetRegularIncomeInfoData)
  setTasks(
    { setState }: StateContext<RegularIncomeInfoStateModel>,
    { payload }: SetRegularIncomeInfoData
  ) {
    setState(RegularIncomeInfoState.setInstanceState(payload));
  }

  @Action(RegularIncomeInfoReset)
  resetTasks({ setState }: StateContext<RegularIncomeInfoStateModel>) {
    setState(regularIncomeInfoDefaults);
  }
}

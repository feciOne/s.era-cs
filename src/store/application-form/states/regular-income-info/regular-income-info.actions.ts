import { RegularIncomeInfoStateModel } from '../../../../shared/models';

export class SetRegularIncomeInfoData {
  static readonly type = '[RegularIncomeInfo] Set regular income info data action';
  constructor(readonly payload: RegularIncomeInfoStateModel) {}
}

export class RegularIncomeInfoReset {
  static readonly type = '[RegularIncomeInfo] Reset regular income info action';
}

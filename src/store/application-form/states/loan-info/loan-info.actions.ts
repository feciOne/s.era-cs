import { LoanInfoStateModel } from '../../../../shared/models';

export class SetLoanInfoData {
  static readonly type = '[LoanInfo] Set loan info data action';
  constructor(readonly payload: LoanInfoStateModel) {}
}

export class LoanInfoReset {
  static readonly type = '[LoanInfo] Reset loan info action';
}

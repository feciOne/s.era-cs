import { PersonalInfoStateModel } from '../../../../shared/models';

export class SetPersonalInfoData {
  static readonly type = '[PersonalInfo] Set personal info data action';
  constructor(readonly payload: PersonalInfoStateModel) {}
}

export class PersonalInfoReset {
  static readonly type = '[PersonalInfo] Reset personal info action';
}

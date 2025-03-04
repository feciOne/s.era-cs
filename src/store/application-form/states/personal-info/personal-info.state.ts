import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PersonalInfoReset, SetPersonalInfoData } from './personal-info.actions';
import { PersonalInfoStateModel } from '../../../../shared/models';

export const personalInfoDefaults: PersonalInfoStateModel = {
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  identityNumber: '',
  maritalStatus: 'Single',
  email: '',
  phoneNumber: '',
  address: '',
  city: 'Adana',
  zipCode: ''
};

@State<PersonalInfoStateModel>({
  name: 'personalInfo',
  defaults: personalInfoDefaults
})
@Injectable()
export class PersonalInfoState {
  @Selector()
  static getPersonalInfoState(state: PersonalInfoStateModel): PersonalInfoStateModel {
    return PersonalInfoState.getInstanceState(state);
  }

  private static setInstanceState(state: PersonalInfoStateModel): PersonalInfoStateModel {
    return { ...state };
  }

  private static getInstanceState(state: PersonalInfoStateModel): PersonalInfoStateModel {
    return { ...state };
  }

  @Action(SetPersonalInfoData)
  setTasks(
    { setState }: StateContext<PersonalInfoStateModel>,
    { payload }: SetPersonalInfoData
  ) {
    setState(PersonalInfoState.setInstanceState(payload));
  }

  @Action(PersonalInfoReset)
  resetTasks({ setState }: StateContext<PersonalInfoStateModel>) {
    setState(personalInfoDefaults);
  }
}

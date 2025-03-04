export interface IApplication {
  loanInfo: LoanInfoStateModel;
  personalInfo: PersonalInfoStateModel;
  regularIncomeInfo: RegularIncomeInfoStateModel;
  id?: number;
};

export interface LoanInfoStateModel {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  loanPurpose: LoanPurpose;
  loanType: LoanType;
};

export interface PersonalInfoStateModel {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  identityNumber: string;
  maritalStatus: MaritalStatus;
  email: string;
  phoneNumber: string;
  address: string;
  city: City;
  zipCode: string;
};

export interface RegularIncomeInfoStateModel {
  employmentStatus: EmploymentStatus;
  employerName: string;
  monthlyIncome: number;
};
  
export type LoanType = 'Personal' | 'Vehicle' | 'Mortgage';
export const loanTypes = ['Personal', 'Vehicle', 'Mortgage'];
export type LoanPurpose = 'Home Improvement' | 'Debt Consolidation' | 'Medical Expenses' | 'Other';
export const loanPurposes = ['Home Improvement', 'Debt Consolidation', 'Medical Expenses', 'Other'];
export type EmploymentStatus = 'Employed' | 'Self-Employed' | 'Unemployed';
export const employmentStatuses = ['Employed', 'Self-Employed', 'Unemployed'];
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
export type City = 'Adana' | 'Ankara' | 'Antalya' | 'Bursa' | 'Denizli' | 'Diyarbakır' | 'Erzurum' | 'Eskişehir' | 'Gaziantep' | 'Hatay' | 'Isparta' | 'İstanbul' | 'İzmir' | 'Kahramanmaraş' | 'Kayseri' | 'Kocaeli' | 'Konya' | 'Malatya' | 'Manisa' | 'Mardin' | 'Mersin' | 'Muğla' | 'Nevşehir' | 'Ordu' | 'Sakarya' | 'Samsun' | 'Şanlıurfa' | 'Tekirdağ' | 'Trabzon' | 'Van' | 'Zonguldak';
export const cities = ['Adana', 'Ankara', 'Antalya', 'Bursa', 'Denizli', 'Diyarbakır', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Hatay', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Kayseri', 'Kocaeli', 'Konya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Nevşehir', 'Ordu', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Tekirdağ', 'Trabzon', 'Van', 'Zonguldak'];

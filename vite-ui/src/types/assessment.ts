export interface AssessmentData {
  // Step 1: รายรับ-รายจ่าย
  mainIncome: string;
  additionalIncome: string;
  incomeFrequency: string;
  livingCosts: string;
  otherDebts: string;

  // Step 2: ภาระหนี้สิน
  existingLoans: string;
  loanAmount: string;

  // Step 3: พฤติกรรมการออม
  savingFrequency: string;
  dailySavingAmount?: string;
  weeklySavingAmount?: string;
  monthlySavingAmount?: string;
  multiSavingAmount?: string;
  timesPerMonth?: string;
  timesPerWeek?: string;
  timesPerDay?: string;
  savingAccount: string;
  numberOfAccounts: string;

  // Step 4: ข้อมูลส่วนบุคคล
  age: string;
  education: string;
  occupation: string;
  coBorrower: string;

  // Step 5: เป้าหมาย
  targetAmount: string;
  loanPeriod: string;
  interest: string;
  location: string;
}

export interface AssessmentResult {
  passed: boolean;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ActionPlan {
  behaviorPlan: string[];
  debtPlans: {
    label: string;
    description: string;
    benefits: string[];
  }[];
}



export interface FormStep {
  title: string;
  subtitle: string;
  fields: FormField[];
}

export interface FormField {
  name: keyof AssessmentData;
  label: string;
  type: 'text' | 'number' | 'select' | 'radio' | 'checkbox-group';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  subFields?: {
    [option: string]: FormField[];
  };
}

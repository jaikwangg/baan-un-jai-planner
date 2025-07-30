import { AssessmentData, AssessmentResult, ActionPlan } from '../types/assessment';

// Mock assessment logic
export const evaluateAssessment = (data: AssessmentData): AssessmentResult => {
  let score = 0;
  
  // Simple scoring logic based on financial health indicators
  const mainIncome = parseFloat(data.mainIncome) || 0;
  const livingCosts = parseFloat(data.livingCosts) || 0;
  const otherDebts = parseFloat(data.otherDebts) || 0;
  const savingAmount = parseFloat(data.savingAmount) || 0;
  
  // Income vs expenses ratio
  if (mainIncome > livingCosts + otherDebts) score += 30;
  else if (mainIncome > livingCosts) score += 15;
  
  // Saving behavior
  if (savingAmount > 0) score += 25;
  if (data.savingFrequency === 'monthly') score += 15;
  
  // Age factor
  const age = parseInt(data.age) || 0;
  if (age >= 25 && age <= 55) score += 20;
  else if (age > 18) score += 10;
  
  // Education
  if (data.education.includes('ปริญญา')) score += 10;
  else if (data.education.includes('มัธยม')) score += 5;
  
  const passed = score >= 60;
  const riskLevel = score >= 80 ? 'low' : score >= 60 ? 'medium' : 'high';
  
  return { passed, score, riskLevel };
};

export const getActionPlan = (result: AssessmentResult, data: AssessmentData): ActionPlan => {
  const behaviorPlan: string[] = [];

  if (!result.passed) {
    behaviorPlan.push(
      'ลดค่าใช้จ่ายรายวัน 10%',
      'ออมขั้นต่ำ 1,500 บาท/เดือน',
      'กันเงินฉุกเฉิน 2,000 บาท',
      'เพิ่มรายได้เสริม'
    );
  } else {
    behaviorPlan.push(
      'รักษาระเบียบวินัยทางการเงินต่อไป',
      'วางแผนการลงทุนระยะยาว',
      'สร้างกองทุนฉุกเฉิน',
      'ทบทวนแผนการเงินอย่างสม่ำเสมอ'
    );
  }

  const debtPlans = [
    {
      label: 'แผน A',
      description: 'เพิ่มชำระขั้นต่ำ 1,500 บาท/เดือน',
      benefits: [
        'โอกาสขอสินเชื่อมีโอกาสผ่านมากขึ้น',
        'เหลือเงินใช้จ่ายรายเดือนสูง',
      ],
    },
    {
      label: 'แผน B',
      description: 'เพิ่มชำระขั้นต่ำ 2,500 บาท/เดือน',
      benefits: [
        'โอกาสขอสินเชื่อมีโอกาสผ่านมากขึ้น',
        'เหลือเงินใช้ 4,500 บาท/เดือน',
      ],
    },
    {
      label: 'แผน C',
      description: 'เพิ่มชำระขั้นต่ำ 3,500 บาท/เดือน',
      benefits: [
        'โอกาสขอสินเชื่อมีโอกาสผ่านมากขึ้น',
        'เหลือเงินใช้จ่ายต่ำ อาจกระทบฉุกเฉิน',
      ],
    },
  ];

  return { behaviorPlan, debtPlans };
};


// Local storage helpers
export const saveAssessment = (data: Partial<AssessmentData>) => {
  localStorage.setItem('assessment_draft', JSON.stringify(data));
};

export const loadAssessment = (): Partial<AssessmentData> => {
  const saved = localStorage.getItem('assessment_draft');
  return saved ? JSON.parse(saved) : {};
};

export const clearAssessment = () => {
  localStorage.removeItem('assessment_draft');
};

export const savePDPAConsent = (consent: boolean) => {
  localStorage.setItem('pdpa_consent', JSON.stringify(consent));
};

export const loadPDPAConsent = (): boolean => {
  const saved = localStorage.getItem('pdpa_consent');
  return saved ? JSON.parse(saved) : false;
};
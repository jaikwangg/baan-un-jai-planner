import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AssessmentData } from '../types/assessment';
import { loadAssessment, saveAssessment, loadPDPAConsent, savePDPAConsent } from '../services/assessmentService';

interface AssessmentState {
  data: Partial<AssessmentData>;
  currentStep: number;
  hasConsented: boolean;
}

type AssessmentAction = 
  | { type: 'UPDATE_DATA'; payload: Partial<AssessmentData> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_CONSENT'; payload: boolean }
  | { type: 'RESET' }
  | { type: 'LOAD_SAVED_DATA'; payload: { data: Partial<AssessmentData>; hasConsented: boolean } };

const initialState: AssessmentState = {
  data: {},
  currentStep: 0,
  hasConsented: false,
};

const assessmentReducer = (state: AssessmentState, action: AssessmentAction): AssessmentState => {
  switch (action.type) {
    case 'UPDATE_DATA':
      const newData = { ...state.data, ...action.payload };
      saveAssessment(newData);
      return { ...state, data: newData };
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_CONSENT':
      savePDPAConsent(action.payload);
      return { ...state, hasConsented: action.payload };
    case 'RESET':
      return initialState;
    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        data: action.payload.data,
        hasConsented: action.payload.hasConsented,
      };
    default:
      return state;
  }
};

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

export const AssessmentProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  useEffect(() => {
    // Load saved data on mount
    const savedData = loadAssessment();
    const hasConsented = loadPDPAConsent();
    dispatch({
      type: 'LOAD_SAVED_DATA',
      payload: { data: savedData, hasConsented }
    });
  }, []);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};
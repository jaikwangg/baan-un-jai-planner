import { useState } from 'react';
import { SplashScreen } from '../components/screens/SplashScreen';
import { PDPAScreen } from '../components/screens/PDPAScreen';
import { AssessmentForm } from '../components/screens/AssessmentForm';
import { ResultScreen } from '../components/screens/ResultScreen';
import { ActionPlanScreen } from '../components/screens/ActionPlanScreen';
import { useAssessment } from '../contexts/AssessmentContext';
import { evaluateAssessment, getActionPlan, clearAssessment } from '../services/assessmentService';
import { AssessmentData, AssessmentResult, ActionPlan } from '../types/assessment';
import { mockActionPlan } from '../data/mockData';

type AppState = 'splash' | 'pdpa' | 'assessment' | 'result' | 'plan';

const Index = () => {
  const { state, dispatch } = useAssessment();
  const [appState, setAppState] = useState<AppState>('splash');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);

  const handleSplashComplete = () => {
    console.log('Splash complete, hasConsented:', state.hasConsented);
    if (state.hasConsented) {
      setAppState('assessment');
    } else {
      setAppState('pdpa');
    }
  };

  const handlePDPAConsent = (consented: boolean) => {
    console.log('PDPA consent:', consented);
    dispatch({ type: 'SET_CONSENT', payload: consented });
    if (consented) {
      console.log('Setting app state to assessment');
      setAppState('assessment');
    } else {
      // User declined, redirect to splash or show decline message
      setAppState('splash');
    }
  };

  const handleAssessmentComplete = (data: AssessmentData) => {
    const result = evaluateAssessment(data);
    const plan = getActionPlan(result, data);
    
    setAssessmentResult(result);
    setActionPlan(plan);
    setAppState('result');
  };

  const handleProceedToPlan = () => {
    setAppState('plan');
  };

  const handleGetAdvice = () => {
    setAppState('plan');
  };

  const handleBackToResult = () => {
    setAppState('result');
  };

  const handleRestart = () => {
    clearAssessment();
    dispatch({ type: 'RESET' });
    dispatch({ type: 'SET_STEP', payload: 0 });
    setAssessmentResult(null);
    setActionPlan(null);
    setAppState('assessment');
  };

  // Responsive container
  const containerClass =
    "max-w-md md:max-w-2xl lg:max-w-4xl mx-auto min-h-screen bg-background p-4 md:p-8";

  console.log('Current app state:', appState, 'Assessment state:', state);
  switch (appState) {
    case 'splash':
      return (
        <div className={containerClass}>
          <SplashScreen onComplete={handleSplashComplete} />
        </div>
      );

    case 'pdpa':
      return (
        <div className={containerClass}>
          <PDPAScreen onConsent={handlePDPAConsent} />
        </div>
      );

    case 'assessment':
      return (
        <div className={containerClass}>
          <AssessmentForm onComplete={handleAssessmentComplete} />
        </div>
      );

    case 'result':
      return (
        <div className={containerClass}>
          <ResultScreen
            result={assessmentResult!}
            onProceed={handleProceedToPlan}
            onGetAdvice={handleGetAdvice}
          />
        </div>
      );

      case 'plan':
        return (
          <div className={containerClass}>
            <ActionPlanScreen
              actionPlan={actionPlan || mockActionPlan}
              onBack={handleBackToResult}
              onRestart={handleRestart}
            />
          </div>
        );

    default:
      return null;
  }
};

export default Index;

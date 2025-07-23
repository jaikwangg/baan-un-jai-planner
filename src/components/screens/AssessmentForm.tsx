import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { ProgressHeader } from '../ProgressHeader';
import { FormField } from '../FormField';
import { formSteps } from '../../data/formSteps';
import { useAssessment } from '../../contexts/AssessmentContext';
import { AssessmentData } from '../../types/assessment';

interface AssessmentFormProps {
  onComplete: (data: AssessmentData) => void;
}

export const AssessmentForm = ({ onComplete }: AssessmentFormProps) => {
  const { state, dispatch } = useAssessment();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const currentStepData = formSteps[state.currentStep];
  const totalSteps = formSteps.length;

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    currentStepData.fields.forEach(field => {
      if (field.required && !state.data[field.name]) {
        newErrors[field.name] = `กรุณากรอก${field.label}`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    
    if (state.currentStep < totalSteps - 1) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    } else {
      // Complete assessment
      onComplete(state.data as AssessmentData);
    }
  };

  const handleBack = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  };

  const handleFieldChange = (fieldName: keyof AssessmentData, value: string) => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: { [fieldName]: value }
    });
    
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const isNextDisabled = currentStepData.fields
    .filter(field => field.required)
    .some(field => !state.data[field.name]);

  return (
    <div className="min-h-screen bg-background">
      <ProgressHeader
        currentStep={state.currentStep + 1}
        totalSteps={totalSteps}
        title={currentStepData.title}
        onBack={handleBack}
        canGoBack={state.currentStep > 0}
      />
      
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {currentStepData.fields.map(field => (
                <FormField
                  key={field.name}
                  field={field}
                  value={state.data[field.name] || ''}
                  onChange={(value) => handleFieldChange(field.name, value)}
                  error={errors[field.name]}
                />
              ))}
            </div>
            
            <div className="flex gap-2 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={state.currentStep === 0}
                className="flex-1"
              >
                ย้อนกลับ
              </Button>
              <Button
                onClick={handleNext}
                disabled={isNextDisabled}
                className="flex-1"
              >
                {state.currentStep === totalSteps - 1 ? 'ประเมินผล' : 'ถัดไป'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
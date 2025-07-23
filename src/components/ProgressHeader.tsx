import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const ProgressHeader = ({ 
  currentStep, 
  totalSteps, 
  title, 
  onBack, 
  canGoBack = true 
}: ProgressHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-primary text-primary-foreground p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={!canGoBack}
          className="text-primary-foreground hover:bg-white/10 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {currentStep}/{totalSteps}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
};
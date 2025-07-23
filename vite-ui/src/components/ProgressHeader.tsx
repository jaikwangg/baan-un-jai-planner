import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { AppLogo } from './AppLogo';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  onBack: () => void;
  canGoBack: boolean;
}

export const ProgressHeader = ({ 
  currentStep, 
  totalSteps, 
  title, 
  subtitle,
  onBack, 
  canGoBack 
}: ProgressHeaderProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-primary p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={!canGoBack}
          className="text-primary-foreground hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <AppLogo showText={false} />
        <div className="w-8" />
      </div>
      
      <div className="text-center text-primary-foreground mb-4">
        <h1 className="text-lg font-bold">ประเมินความเสี่ยง</h1>
        <h2 className="text-lg font-bold">การขอสินเชื่อ</h2>
        <div className="mt-2 p-2 bg-white/10 rounded-lg">
          <p className="text-sm">โปรดระบุข้อมูลตามความเป็นจริง</p>
          <p className="text-sm">เพื่อที่จะได้การประเมินที่ถูกต้องที่สุด</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24">
          {/* Background circle */}
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${progressPercentage * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>
        
        <div className="ml-4 text-primary-foreground">
          <h3 className="text-lg font-bold text-teal-300">{title}</h3>
          <h4 className="text-lg font-bold text-teal-300">{subtitle}</h4>
          <p className="text-sm opacity-90">รายละเอียดเพิ่มเติม</p>
        </div>
      </div>
    </div>
  );
};
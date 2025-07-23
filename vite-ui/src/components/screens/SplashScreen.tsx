import { useEffect } from 'react';
import { AppLogo } from '../AppLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4">
      <div className="animate-pulse">
        <AppLogo size="lg" />
      </div>
      <p className="text-primary-foreground/80 text-sm mt-4 text-center">
        ประเมินความพร้อมทางการเงิน
      </p>
    </div>
  );
};
import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#F27030] flex flex-col items-center justify-center px-4">
      <div className="animate-pulse">
        <img
          src="/baan-un-jai-planner/splash2.png"
          alt="Splash Logo"
          className="w-70 h-auto"
        />
      </div>
      <p className="text-primary-foreground/80 text-sm mt-4 text-center">
        ประเมินความพร้อมทางการเงิน
      </p>
    </div>
  );
};

import { Home, Heart } from 'lucide-react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AppLogo = ({ size = 'md', showText = true }: AppLogoProps) => {
  const iconSize = size === 'lg' ? 40 : size === 'md' ? 32 : 24;
  const textSize = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg';

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Home 
          className="text-primary-foreground" 
          size={iconSize}
          fill="currentColor"
        />
        <Heart 
          className="absolute -top-1 -right-1 text-primary-foreground" 
          size={iconSize * 0.4}
          fill="currentColor"
        />
      </div>
      {showText && (
        <span className={`font-bold text-primary-foreground ${textSize}`}>
          บ้านอุ่นใจ
        </span>
      )}
    </div>
  );
};
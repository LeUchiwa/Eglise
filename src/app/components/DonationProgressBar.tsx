import { TrendingUp } from "lucide-react";

interface DonationProgressBarProps {
  current: number;
  goal: number;
  currency?: string;
  className?: string;
}

export function DonationProgressBar({ 
  current, 
  goal, 
  currency = "FCFA",
  className = "" 
}: DonationProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const formattedCurrent = new Intl.NumberFormat('fr-FR').format(current);
  const formattedGoal = new Intl.NumberFormat('fr-FR').format(goal);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 text-green-700 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{percentage.toFixed(0)}%</span>
        </div>
        <div className="text-gray-600">
          <span className="font-semibold text-green-700">{formattedCurrent}</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500">{formattedGoal} {currency}</span>
        </div>
      </div>
    </div>
  );
}

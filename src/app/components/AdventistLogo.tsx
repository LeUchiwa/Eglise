const adventistLogo = "/assets/93bc27a9d5e76f70e76a70b8aad5e920e580452c.png";

interface AdventistLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AdventistLogo({ size = 'md', className = '' }: AdventistLogoProps) {
  const sizeClasses = {
    sm: 'w-[31px] h-[31px] p-0.5',
    md: 'w-[44px] h-[44px] p-1',
    lg: 'w-[53px] h-[53px] p-1',
    xl: 'w-[62px] h-[62px] p-1.5',
  };

  return (
    <div className={`rounded-full bg-white shadow-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <img 
        src={adventistLogo} 
        alt="Logo Église Adventiste du Septième Jour" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
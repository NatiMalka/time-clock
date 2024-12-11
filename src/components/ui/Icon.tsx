import React from 'react';
import { User } from 'lucide-react'; // Import a safe fallback icon

interface IconProps {
  icon: React.ComponentType<any>;
  fallback?: React.ComponentType<any>;
  className?: string;
}

export function Icon({ icon: IconComponent, fallback = User, className = '' }: IconProps) {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [IconComponent]);

  if (hasError) {
    const FallbackIcon = fallback;
    return <FallbackIcon className={className} />;
  }

  try {
    return <IconComponent className={className} />;
  } catch (error) {
    setHasError(true);
    return <User className={className} />;
  }
} 
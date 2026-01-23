import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  className = '',
}: ButtonProps) {
  const baseClasses = 'rounded-xl flex-row items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-gray-200',
    outline: 'bg-transparent border border-primary-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const textColor = variant === 'outline' ? 'text-primary-600' : 
                   variant === 'secondary' ? 'text-gray-800' : 'text-white';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#0ea5e9' : '#ffffff'} 
          size="small" 
        />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`font-semibold ${textColor} ${textSize[size]}`}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
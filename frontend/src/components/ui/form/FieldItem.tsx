import type { ReactNode } from 'react';

interface FieldItemProps {
  id?: string;
  label?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function FieldItem({ id, label, error, children, className }: FieldItemProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className='mb-1 block text-sm font-medium text-gray-800'
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className='mt-1 text-xs text-red-500'>{error}</p>
      )}
    </div>
  );
}

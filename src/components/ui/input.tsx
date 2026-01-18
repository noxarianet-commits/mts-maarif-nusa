import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, ...props }, ref) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition-all duration-200',
                        'placeholder:text-gray-400',
                        'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
                        'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
                        'dark:focus:border-sky-400 dark:focus:ring-sky-400/20',
                        icon && 'pl-10',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, options, placeholder, ...props }, ref) => {
        return (
            <div className="relative">
                <select
                    className={cn(
                        'flex h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm transition-all duration-200',
                        'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
                        'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
                        'dark:focus:border-sky-400 dark:focus:ring-sky-400/20',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);
Select.displayName = 'Select';

export { Select };

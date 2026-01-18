import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div>
                <textarea
                    className={cn(
                        'flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200',
                        'placeholder:text-gray-400',
                        'focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20',
                        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
                        'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100',
                        'dark:focus:border-sky-400 dark:focus:ring-sky-400/20',
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
Textarea.displayName = 'Textarea';

export { Textarea };

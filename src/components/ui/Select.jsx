import { cn } from '../../lib/utils';

export function Select({ className, ...props }) {
  return (
    <select
      className={cn(
        'p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        className
      )}
      {...props}
    />
  );
}
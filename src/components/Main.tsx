import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Main({
  className,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'min-h-screen flex justify-center items-center bg-background',
        className
      )}
      {...props}
    />
  );
}

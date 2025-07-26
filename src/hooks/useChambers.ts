import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchChamberRows } from '@/lib/api';

export function useChambers() {
  const query = useSuspenseQuery({
    queryKey: ['chambers'],
    queryFn: fetchChamberRows,
  });

  return { query };
}

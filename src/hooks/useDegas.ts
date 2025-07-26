import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchDegasRows } from '@/lib/api';

export function useDegas() {
  const query = useSuspenseQuery({
    queryKey: ['degas'],
    queryFn: fetchDegasRows,
  });

  return { query };
}

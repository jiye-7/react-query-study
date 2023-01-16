import { useQuery } from '@tanstack/react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
export const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};

export function useTreatments(): Treatment[] {
  // TODO: get data from server via useQuery
  const { data } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });

  return data;
}

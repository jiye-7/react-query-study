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
  // toast
  const toast = useCustomToast();

  // /treatments 요청에 대한 응답값으로 cache가 비어있는 경우 아무것도 표시하지 않도록 처리할 것이다.
  const fallback = [];
  // 구조분해 된 data에 대해 기본값을 fallback으로 지정
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    onError: (error) => {
      // error가 JS Error class의 인스턴스라면
      const title =
        error instanceof Error
          ? error.message
          : 'error connecting to the server';

      toast({ title, status: 'error' });
    },
  });

  return data;
}

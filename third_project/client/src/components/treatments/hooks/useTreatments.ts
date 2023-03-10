import { useQuery } from '@tanstack/react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

export const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};

export function useTreatments(): Treatment[] {
  // /treatments 요청에 대한 응답값으로 cache가 비어있는 경우 아무것도 표시하지 않도록 처리할 것이다.
  const fallback = [];
  // 구조분해 된 data에 대해 기본값을 fallback으로 지정
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });

  return data;
}

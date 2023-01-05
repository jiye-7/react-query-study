import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import Person from './Person';

const initialUrl = `https://swapi.dev/api/people/`;

/**
 * fetchUrl: URL인 pageParam을 가져와서 response를 반환해 준다.
 */
const fetchUrl = async ({ pageParam = initialUrl }) => {
  const response = await axios(pageParam);
  return response;
};

/**
 * useInfiniteQuery 반환 값
 *
 * data: InfiniteScroll을 작성할 때 사용할 수 있는 data(페이지를 계속 로드할 때 data에 data의 페이지가 포함된다.)
 * fetchNextPage: 데이터가 더 많이 필요할 때 어느 함수를 실행할지를 InfiniteScroll에 지시하는 역할을 한다.
 * hasNextPage: 수집할 데이터가 더 있는지를 결정하는 boolean 값
 *
 */

/**
 * useInfiniteQuery의 arguments(인자)들
 * - queryKey
 * - queryFn: 객체 매개변수를 받고, property 중 하나로 pageParam을 가지고 있다.
 * - pageParam: fetchNextPage가 어떻게 보일지 결정하고, 다음 페이지가 있는 지 결정한다. pageParam은 기본값을 주면된다.
 *              useInfiniteQuery를 처음 실행할 땐 pageParam이 설정되어있지 않고, 기본값이 initialUrl이기 때문
 *              useInfiniteQuery의 모든 것이 pageParam에 달려있다!
 * - getNextPageParam: lastPage를 가진 함수, 필요에 따라 allPage를 두 번째 인자로 넣을 수 있다.
 *                     lastPage는 queryFn를 마지막으로 실행한 시점의 data이면 충분하다.
 *
 * data에는 next가 있는데 결과의 다음 페이지로 가는 데 필요한 URL이 뭔지 알려준다.
 *
 * */

/**
 * useInfiniteScroll component
 * - loadMore: 데이터가 더 필요할 때 불러와 useInfiniteQuery에서 나온 fetchNextPage 함숫값을 이용한다.
 * - hasMore: useInfiniteQuery에서 나온 객체를 해체한 값인 hasNextPage를 이용한다.
 *
 * 무한 스크롤 컴포넌트는 스스로 페이지의 끝에 도달했음을 인식하고 fetchNextPage를 불러오는 기능이다.
 * data property에서 data에 접근할 수 있는데 useInfiniteQuery 컴포넌트에서 나온 객체를 이용한다.
 * -> 배열인 pages property를 이용해서 (data.pages[x].results) 그 페이지 배열의 map을 만들어 데이터를 표시할 수 있게 해준다.
 */
const InfinitePeople = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: () => fetchUrl,
    // fetchNextPage를 실행하면 next property가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다.
    // hasNextPage는 아래의 함수가 undefined를 반환하는것에 따라 결정된다. lastPage.next가 거짓이면 undefined를 반환하도록 설정
    // swapi에서 페이지가 없는 경우 (previous) null을 반환한다.
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });
  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {!data?.pages && <></>}
      {data?.pages &&
        data?.pages?.map((pageData) =>
          pageData?.results?.map((person) => (
            <Person
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          ))
        )}
    </InfiniteScroll>
  );
};

export default InfinitePeople;

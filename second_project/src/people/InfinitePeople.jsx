import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import Person from './Person';

const initialUrl = `https://swapi.dev/api/people/`;

const fetchUrl = async ({ pageParam = initialUrl }) => {
  const response = await axios(pageParam);
  return response;
};

/**
 * isLoading(불러오는 중)을 사용해서 cached된 데이터가 없을 때 데이터를 가져 온다.
 * isError: error가 있을 때
 */
const InfinitePeople = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['sw-people'],
      queryFn: fetchUrl,
      getNextPageParam: (lastPage) => lastPage.data.next || undefined,
    });

  if (isLoading) <div className='loading'>Loading...</div>;
  if (isError) <div>Error! error Message: {error.toString()}</div>;

  return (
    <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
      {isLoading && <div className='loading'>Loading...</div>}
      {isError && <div>Error! error Message: {error.toString()}</div>}
      {data?.pages?.map((pageData) =>
        pageData?.data?.results?.map((person) => (
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

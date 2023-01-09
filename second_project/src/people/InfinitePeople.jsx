import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import Person from './Person';

const initialUrl = `https://swapi.dev/api/people/`;

const fetchUrl = async ({ pageParam = initialUrl }) => {
  const response = await axios(pageParam);
  return response;
};

const InfinitePeople = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: fetchUrl,
    getNextPageParam: (lastPage) => lastPage.data.next || undefined,
  });

  return (
    <>
      {isFetching && <div className='fetching'>Loading....</div>}
      {isLoading && <div className='loading'>Loading...</div>}
      {isError && <div>Error! error Message: {error.toString()}</div>}
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
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
    </>
  );
};

export default InfinitePeople;

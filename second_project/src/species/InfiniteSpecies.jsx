import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import Species from './Species';

const initialUrl = `https://swapi.dev/api/species/`;

const fetchUrl = async ({ pageParam = initialUrl }) => {
  const response = await axios(pageParam);
  return response;
};

const InfiniteSpecies = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: fetchUrl,
    getNextPageParam: (lastPage) => lastPage.data.next || undefined,
  });

  return (
    <>
      {isFetching && <div className='fetching'>Loading...</div>}
      {isLoading && <div className='loading'>Loading...</div>}
      {isError && <div className='loading'>{error.toString()}</div>}
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        {data?.pages?.map((dataPage) =>
          dataPage?.data?.results?.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteSpecies;

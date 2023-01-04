import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import Person from './Person';

const initialUrl = `https://swapi.dev/api/people/`;

const fetchCurl = async (url) => {
  const response = await axios(url);
  return response;
};

const InfinitePeople = () => {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
};

export default InfinitePeople;

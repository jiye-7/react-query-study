import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import Species from './Species';

const initialUrl = `https://swapi.dev/api/species/`;

const fetchUrl = async (url) => {
  const response = await axios(url);
  return response;
};

const InfiniteSpecies = () => {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
};

export default InfiniteSpecies;

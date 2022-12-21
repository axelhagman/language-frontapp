import useSWR from 'swr';

import { fetcher } from 'utils/fetcher';

const useDeck = (id) => {
  const { data, error, isLoading } = useSWR(`/api/deck/${id}`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export default useDeck;

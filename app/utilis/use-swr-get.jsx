import axios from "axios";
import useSWR, { mutate } from "swr";

export const useSwrGet = (apiKey, url, swrProps = {}) => {
  let config = {
    headers: {},
  };
  const fetcher = () => axios.get(url, config).then((res) => res.data);
  const { data, error, mutate } = useSWR(apiKey, fetcher, {
    revalidateOnFocus: false,
    ...swrProps,
  });
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

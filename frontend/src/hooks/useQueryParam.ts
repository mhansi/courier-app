import { useSearchParams } from 'react-router-dom';

const useQueryParam = (key: string): string | null => {
  const [searchParams] = useSearchParams();
  return searchParams.get(key);
};

export default useQueryParam;

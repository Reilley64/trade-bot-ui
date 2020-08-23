import { useCallback, useEffect, useState } from 'react';

const useAPI = (api, immediate = true, initialParams) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [lastParams, setLastParams] = useState(null);

  const fetch = useCallback((params = {}, data = null, headers = {}) => {
    setLoading(true);
    setError(null);

    if (data) {
      return api({ headers: { ...headers }, params }, data)
        .then((resp) => setResponse(resp))
        .catch((err) => setError(err))
        .finally(() => {
          setLoading(false);
          setLastParams(params);
        });
    }

    return api({ headers: { ...headers }, params })
      .then((resp) => setResponse(resp))
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
        setLastParams(params);
      });
  }, [api]);

  const reset = () => {
    setLoading(false);
    setResponse(null);
    setError(null);
  };

  useEffect(() => {
    if (immediate) fetch(initialParams);
  }, [immediate]);

  return {
    error, fetch, immediate, lastParams, loading, reset, response,
  };
};

export default useAPI;

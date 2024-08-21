import { useEffect, useState } from 'react';
import { useInterval } from './useInterval';

export const usePleaseStay = (titles: string[]) => {
  const [shouldIterateTitles, setShouldIterateTitles] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  const handleVisibilityChange = () => {
    setShouldIterateTitles(document.visibilityState !== 'visible');
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useInterval(
    () => {
      const nextIndex = titleIndex + 1;
      nextIndex === titles.length ? setTitleIndex(0) : setTitleIndex(nextIndex);
      console.log('index' + nextIndex);
    },
    500,
    shouldIterateTitles
  );

  useEffect(() => {
    document.title = titles[titleIndex];
  }, [titles, titleIndex]);
};

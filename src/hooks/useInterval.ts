import { useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  interval: number,
  shouldRun: boolean
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!shouldRun) {
      return;
    }
    const id = setInterval(() => callbackRef.current(), interval);
    console.log('intervalId ' + id);
    return () => clearInterval(id);
  }, [interval, shouldRun]);
};

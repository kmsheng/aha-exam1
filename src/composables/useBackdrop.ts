import React, {useEffect, useCallback} from 'react';

function useBackdrop(ref: React.RefObject<HTMLDivElement>, fn: () => void) {
  const cb = useCallback((event: MouseEvent) => {
    if (ref.current && (ref.current === event.target)) {
      return;
    }
    fn();
  }, []);
  useEffect(() => {
    document.addEventListener('click', cb);
    return () => document.removeEventListener('click', cb);
  }, []);
}

export default useBackdrop;

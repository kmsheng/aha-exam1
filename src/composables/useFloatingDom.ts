import {useEffect, useCallback} from 'react';
import px from '@/utils/px';

function useFloatingDom(el: HTMLElement | null, active: boolean) {
  const style: React.CSSProperties = {display: 'none'};
  const setPos = (el: HTMLElement) => {
    const {top, left} = el.getBoundingClientRect();
    style.top = px(el.offsetHeight + top);
    style.left = px(left);
    style.marginTop = '1rem';
    style.display = 'block';
    style.position = 'absolute';
  };
  const handleResize = useCallback(() => el && setPos(el), []);
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  }, []);
  if (! el) {
    return style;
  }
  if (active) {
    setPos(el);
  }
  return style;
}

export default useFloatingDom;

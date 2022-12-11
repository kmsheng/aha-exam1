import {useState, useEffect, useCallback, CSSProperties} from 'react';
import isEqual from 'lodash.isequal';
import px from '@/utils/px';

function useFloatingDom(el: HTMLElement | null, active: boolean) {
  const [style, setStyle] = useState({display: 'none'} as CSSProperties);
  const setPos = (el: HTMLElement, active: boolean) => {
    const nextStyle: CSSProperties = {display: 'none'};
    if (active) {
      const {top, left} = el.getBoundingClientRect();
      nextStyle.top = px(el.offsetHeight + top);
      nextStyle.left = px(left);
      nextStyle.marginTop = '1rem';
      nextStyle.display = 'block';
      nextStyle.position = 'absolute';
    }
    if (! isEqual(style, nextStyle)) {
      setStyle(nextStyle);
    }
  };
  useEffect(() => {
    const handleResize = () => el && setPos(el, active);
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  }, []);
  el && setPos(el, active);
  return style;
}

export default useFloatingDom;

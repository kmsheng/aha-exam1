import {useState, useEffect, useCallback,
  CSSProperties, MutableRefObject} from 'react';
import isEqual from 'lodash.isequal';
import px from '@/utils/px';

function useFloatingDom(
    ref: MutableRefObject<HTMLInputElement | null>, active: boolean) {
  const [style, setStyle] = useState({display: 'none'} as CSSProperties);
  const setPos = (ref: MutableRefObject<HTMLInputElement | null>,
      active: boolean) => {
    const el = ref.current;
    if (el === null) {
      return;
    }
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
  const handleResize = () => setPos(ref, active);
  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  });
  setPos(ref, active);
  return style;
}

export default useFloatingDom;

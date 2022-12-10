import px from '@/utils/px';

function useFloatingDom(el: HTMLElement | null, active: boolean) {
  const style: React.CSSProperties = {display: 'none'};
  if (! el) {
    return style;
  }
  if (active) {
    const {top, left} = el.getBoundingClientRect();
    style.top = px(el.offsetHeight + top);
    style.left = px(left);
    style.marginTop = '1rem';
    style.display = 'block';
  }
  return style;
}

export default useFloatingDom;

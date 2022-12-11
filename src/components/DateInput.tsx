import React from 'react';
import Modal from '@/components/Modal';
import DateMenu from '@/components/DateMenu';
import {useState, useRef} from 'react';
import useFloatingDom from '@/composables/useFloatingDom';
import useBackdrop from '@/composables/useBackdrop';
import {format} from 'date-fns';

type Props = {
  className?: string,
  value?: string,
  onChange: (value: string) => void,
}

function DateInput({className = '', value = '', onChange}: Props) {

  const [active, setActive] = useState(false);
  const handleFocus = () => setActive(true);
  const input = useRef(null);
  const style = useFloatingDom(input.current, active);
  const onInputChange =
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value);
  const onDateConfirm = (date: Date) => {
    onChange(format(date, 'MM/dd/yyyy'));
    setActive(false);
  };
  const onDateCancel = () => setActive(false);
  const blockClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  useBackdrop(input, () => setActive(false));

  return (
    <div className={className}>
      <input
        ref={input}
        type="text"
        className="input"
        placeholder="mm/dd/yyyy"
        value={value}
        onChange={onInputChange}
        onFocus={handleFocus}
      />
      <Modal>
        <div onClick={blockClick}>
          <DateMenu
            style={style}
            onConfirm={onDateConfirm}
            onCancel={onDateCancel}
          />
        </div>
      </Modal>
    </div>
  );
}

export default DateInput;

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
  const handleBlur = () => setActive(false);
  const inputEl = useRef(null);
  const style = useFloatingDom(inputEl.current, active);
  const onInputChange =
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value);
  const onDateConfirm = (date: Date) => onChange(format(date, 'MM/dd/yyyy'));
  const onDateCancel = () => setActive(false);

  return (
    <div className={className}>
      <input
        ref={inputEl}
        type="text"
        className="input"
        placeholder="mm/dd/yyyy"
        value={value}
        onChange={onInputChange}
        onFocus={handleFocus}
      />
      <Modal>
        <DateMenu
          style={style}
          onConfirm={onDateConfirm}
          onCancel={onDateCancel}
        />
      </Modal>
    </div>
  );
}

export default DateInput;

import {useState, useRef} from 'react';
import PasswordHintMenu from '@/components/PasswordHintMenu';
import Modal from '@/components/Modal';
import {PasswordValidationResult} from '@/consts/password';
import './PasswordInput.css';

type PasswordInputProps = {
  value: string,
  validations: PasswordValidationResult,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function PasswordInput({value, validations, onChange}: PasswordInputProps) {

  const [active, setActive] = useState(false);
  const handleFocus = () => setActive(true);
  const handleBlur = () => setActive(false);
  const inputEl = useRef(null);
  let style = {};
  if (active && inputEl.current) {
    const el = inputEl.current as HTMLElement;
    const {top, left} = el.getBoundingClientRect();
    style = {
      top: (el.offsetHeight + top) + 'px',
      left: left + 'px',
      marginTop: '1rem',
    };
  }

  return (
    <div className="password-input">
      <input
        ref={inputEl}
        type="password"
        className="input"
        placeholder="password"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Modal>
        <PasswordHintMenu style={style} validations={validations} />
      </Modal>
    </div>
  );
}

export default PasswordInput;

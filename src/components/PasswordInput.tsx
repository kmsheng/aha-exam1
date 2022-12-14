import {useState, useRef} from 'react';
import PasswordHintMenu from '@/components/PasswordHintMenu';
import Modal from '@/components/Modal';
import {PasswordValidationResult} from '@/consts/password';
import useFloatingDom from '@/composables/useFloatingDom';
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
  const style = useFloatingDom(inputEl, active);

  return (
    <div className="border-label border-label-password">
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

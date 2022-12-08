import React from 'react'
import './PasswordInput.css';

type PasswordInputProps = {
  value: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function PasswordInput({ value, onChange }: PasswordInputProps) {
  return (
    <div className="password-input">
      <input
        type="text"
        className="input"
        placeholder="password"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default PasswordInput;

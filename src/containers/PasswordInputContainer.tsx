import React, { useState } from 'react'
import PasswordInput from '@/components/PasswordInput';
import PasswordHintMenu from '@/components/PasswordHintMenu';

function PasswordInputContainer() {
  const [password, setPassword] = useState('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  return (
    <div>
      <PasswordInput value={password} onChange={handleInputChange} />
      <PasswordHintMenu className="mt-5" />
    </div>
  );
}

export default PasswordInputContainer;

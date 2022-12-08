import PasswordInput from '@/components/PasswordInput';
import PasswordHintMenu from '@/components/PasswordHintMenu';

function PasswordInputContainer() {
  return (
    <div>
      <PasswordInput />
      <PasswordHintMenu className="mt-5" />
    </div>
  );
}

export default PasswordInputContainer;

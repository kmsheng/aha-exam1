import {ruleItems, PasswordRuleItem,
  PasswordValidationResult} from '@/consts/password';
import IconSolidCheckmark from '@/icons/IconSolidCheckmark';
import IconHollowCheckmark from '@/icons/IconHollowCheckmark';
import './PasswordHintMenu.css';

function renderItems(items: PasswordRuleItem[],
    validations: PasswordValidationResult) {
  return items.map((item: PasswordRuleItem) => {
    return (
      <div className="flex items-center px-4 py-[8px]" key={item.type}>
        { validations[item.type] ?
          <IconSolidCheckmark className="w-[20px] h-[20px]" /> :
          <IconHollowCheckmark className="w-[20px] h-[20px]" /> }
        <div className="ml-3 text-sm">{item.text}</div>
      </div>
    );
  });
}

interface PasswordHintMenuProps {
  className?: string,
  validations: PasswordValidationResult,
}

function PasswordHintMenu({className, validations}: PasswordHintMenuProps) {
  return (
    <div className={className + 'password-hint-menu ' +
      'bg-menu rounded-lg py-[8px]'}>{renderItems(ruleItems, validations)}</div>
  );
}

export default PasswordHintMenu;

import { ruleItems, RuleItem, PasswordValidations } from '@/consts/password'
import IconSolidCheckmark from '@/icons/IconSolidCheckmark';
import IconHollowCheckmark from '@/icons/IconHollowCheckmark';

function renderItems(items: RuleItem[], validations: PasswordValidations) {
  return items.map((item: RuleItem) => {
    return (
      <div className="flex items-center px-4 py-3">
        { validations[item.type] ?
          <IconSolidCheckmark className="w-[18px] h-[18px]" /> : <IconHollowCheckmark className="w-[18px] h-[18px]" /> }
        <div className="ml-3 text-sm">{item.text}</div>
      </div>
    );
  });
}

interface PasswordHintMenuProps {
  className?: string,
  validations: PasswordValidations,
}

function PasswordHintMenu({ className, validations }: PasswordHintMenuProps) {
  return (
    <div className={className + ' bg-menu rounded-lg py-2'}>{renderItems(ruleItems, validations)}</div>
  );
}

export default PasswordHintMenu;

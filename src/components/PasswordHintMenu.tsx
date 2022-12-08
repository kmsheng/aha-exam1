import { ruleItems, RuleItem } from '@/consts/password'
import IconSolidCheckmark from '@/icons/IconSolidCheckmark';

function renderItems(items: RuleItem[]) {
  return items.map((item: RuleItem) => {
    return (
      <div className="flex items-center px-4 py-3">
        <IconSolidCheckmark />
        <div className="ml-3 text-sm">{item.text}</div>
      </div>
    );
  });
}

interface PasswordHintMenuProps {
  className?: string
}

function PasswordHintMenu({ className }: PasswordHintMenuProps) {
  return (
    <div className={className + ' bg-menu rounded-lg py-2'}>{renderItems(ruleItems)}</div>
  );
}

export default PasswordHintMenu;

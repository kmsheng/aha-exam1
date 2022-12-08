export enum PasswordRules {
  UPPERCASE_REQUIRED,
  LOWERCASE_REQUIRED,
  NUMNER_REQUIRED,
  SPECIAL_CHAR_REQUIRED,
  LONGER_THAN_EIGHT_CHARS
}

export type RuleItem = {
  text: string;
  type: PasswordRules
}

export const ruleItems: RuleItem[] = [
  {
    type: PasswordRules.UPPERCASE_REQUIRED,
    text: 'Have at least one uppercase letter'
  },
  {
    type: PasswordRules.LOWERCASE_REQUIRED,
    text: 'Have at least one lowercase letter'
  },
  {
    type: PasswordRules.NUMNER_REQUIRED,
    text: 'Have at least one number'
  },
  {
    type: PasswordRules.SPECIAL_CHAR_REQUIRED,
    text: 'Have at least one special character (!@#$...etc)'
  },
  {
    type: PasswordRules.LONGER_THAN_EIGHT_CHARS,
    text: 'Longer than 8 characters'
  },
]

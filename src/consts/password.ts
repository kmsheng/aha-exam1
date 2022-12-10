export enum PasswordRule {
  UPPERCASE_REQUIRED,
  LOWERCASE_REQUIRED,
  NUMNER_REQUIRED,
  SPECIAL_CHAR_REQUIRED,
  LONGER_THAN_EIGHT_CHARS
}

export type PasswordValidationResult = {
  [PasswordRule.UPPERCASE_REQUIRED]: boolean,
  [PasswordRule.LOWERCASE_REQUIRED]: boolean,
  [PasswordRule.NUMNER_REQUIRED]: boolean,
  [PasswordRule.SPECIAL_CHAR_REQUIRED]: boolean,
  [PasswordRule.LONGER_THAN_EIGHT_CHARS]: boolean,
}

export const getPasswordHints = (password: string) => {
  return {
    [PasswordRule.UPPERCASE_REQUIRED]: /[A-Z]/.test(password),
    [PasswordRule.LOWERCASE_REQUIRED]: /[a-z]/.test(password),
    [PasswordRule.NUMNER_REQUIRED]: /\d/.test(password),
    [PasswordRule.SPECIAL_CHAR_REQUIRED]: /[^a-zA-Z\d ]/.test(password),
    [PasswordRule.LONGER_THAN_EIGHT_CHARS]: password.length > 8,
  };
};

export type PasswordRuleItem = {
  text: string;
  type: PasswordRule
}

export const ruleItems: PasswordRuleItem[] = [
  {
    type: PasswordRule.UPPERCASE_REQUIRED,
    text: 'Have at least one uppercase letter',
  },
  {
    type: PasswordRule.LOWERCASE_REQUIRED,
    text: 'Have at least one lowercase letter',
  },
  {
    type: PasswordRule.NUMNER_REQUIRED,
    text: 'Have at least one number',
  },
  {
    type: PasswordRule.SPECIAL_CHAR_REQUIRED,
    text: 'Have at least one special character (!@#$...etc)',
  },
  {
    type: PasswordRule.LONGER_THAN_EIGHT_CHARS,
    text: 'Longer than 8 characters',
  },
];

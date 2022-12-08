export enum PasswordRules {
  UPPERCASE_REQUIRED,
  LOWERCASE_REQUIRED,
  NUMNER_REQUIRED,
  SPECIAL_CHAR_REQUIRED,
  LONGER_THAN_EIGHT_CHARS
}

export type PasswordValidations = {
  [PasswordRules.UPPERCASE_REQUIRED]: boolean,
  [PasswordRules.LOWERCASE_REQUIRED]: boolean,
  [PasswordRules.NUMNER_REQUIRED]: boolean,
  [PasswordRules.SPECIAL_CHAR_REQUIRED]: boolean,
  [PasswordRules.LONGER_THAN_EIGHT_CHARS]: boolean,
}

export const getPasswordHints = (password: string) => {
  return {
    [PasswordRules.UPPERCASE_REQUIRED]: /[A-Z]/.test(password),
    [PasswordRules.LOWERCASE_REQUIRED]: /[a-z]/.test(password),
    [PasswordRules.NUMNER_REQUIRED]: /\d/.test(password),
    [PasswordRules.SPECIAL_CHAR_REQUIRED]: /[^a-zA-Z\d ]/.test(password),
    [PasswordRules.LONGER_THAN_EIGHT_CHARS]: password.length > 8
  }
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

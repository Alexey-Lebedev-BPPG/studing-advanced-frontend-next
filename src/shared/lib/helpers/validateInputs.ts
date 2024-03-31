import { HTMLInputTypeAttribute } from 'react';
import { Validate } from '@/shared/const/Validate';
import { TFunction } from '@/shared/types/next-intl';

export interface IValidateInputsProps {
  type: HTMLInputTypeAttribute;
  required?: boolean;
  min?: number;
  max?: number;
  t: TFunction;
}

const checkFieldValidate = (
  iteratedString: string,
  options: IValidateInputsProps,
) => {
  const { type, required, min, max, t } = options;
  const errorField = '';
  const isNumber =
    typeof iteratedString === 'number' ? iteratedString : iteratedString.length;

  if (required && iteratedString.trim() === '') {
    if (type === 'email') return t('Enter your email');
    if (type === 'tel') return t('Please enter your number');
    if (type === 'url') return 'Please enter a valid url';
    if (type === 'password')
      return 'Please enter a valid password containing at least 8 characters with 1 uppercase letter and 1 number';
    if (type === 'text' || type === 'number') return t('Field cannot be empty');
  }

  if (min && isNumber < min) {
    if (type === 'email') return 'Please enter a valid email address';
    if (type === 'tel') return t('Please provide a valid value');
    if (type === 'url') return 'Please enter a valid url';
    if (type === 'password')
      return 'Please enter a valid password containing at least 8 characters with 1 uppercase letter and 1 number';
    if (type === 'text' || type === 'number')
      return 'Please enter a valid parameters';
  }

  if (max && isNumber > max) {
    if (type === 'email') return 'Please enter a valid email address';
    if (type === 'tel') return t('Please provide a valid value');
    if (type === 'url') return 'Please enter a valid url';
    if (type === 'password')
      return 'Please enter a valid password containing at least 8 characters with 1 uppercase letter and 1 number';
    if (type === 'text' || type === 'number')
      return 'Please enter a valid parameters';
  }

  return errorField;
};

const checkPartLengthString = (
  iteratedString: string,
  options: IValidateInputsProps,
) => {
  const { type, t } = options;
  let errorLength = '';
  const previousPart = iteratedString.split('@')[0];
  const nextPart = iteratedString.split('@')[1];

  if (previousPart && (previousPart.length === 0 || previousPart.length > 64)) {
    if (type === 'email') errorLength = t('Incorrect email');
    if (type === 'tel') errorLength = t('Incorrect number');
    if (type === 'url') errorLength = 'Please enter a valid url';
    if (type === 'password')
      errorLength =
        'Please enter a valid password containing at least 8 characters with 1 uppercase letter and 1 number';
    if (type === 'text' || type === 'number')
      errorLength = t('Please provide a valid value');
  }

  if (nextPart && (nextPart.length === 0 || nextPart.length > 255))
    errorLength = 'errorLength';

  return errorLength;
};

const checkForStringConditions = (
  iteratedString: string,
  lengthIteratedString: number,
  options: IValidateInputsProps,
) => {
  const { SPECIALS, UPPERCASE_LETTERS, DIGITS } = Validate;
  const { type, t } = options;
  let errorSymbol = '';
  let errorCountEmail = 0;
  let errorCountPasswordUpper = 0;
  let errorCountPasswordDigits = 0;

  if (type === 'email') {
    for (let i = 0; i < lengthIteratedString; i++)
      if (SPECIALS.includes(iteratedString[i])) errorCountEmail++;

    errorSymbol = errorCountEmail > 0 ? '' : t('Incorrect email');
  } else if (type === 'url') {
    // eslint-disable-next-line prefer-regex-literals
    const urlRegex = new RegExp(
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    );
    errorSymbol = urlRegex.test(iteratedString)
      ? ''
      : 'Please enter a valid url';
  } else if (type === 'password') {
    for (let i = 0; i < lengthIteratedString; i++) {
      if (UPPERCASE_LETTERS.includes(iteratedString[i]))
        errorCountPasswordUpper++;
      if (DIGITS.includes(iteratedString[i])) errorCountPasswordDigits++;
    }
    errorSymbol =
      errorCountPasswordUpper > 0 && errorCountPasswordDigits > 0
        ? ''
        : 'Please enter a valid password containing at least 8 characters with 1 uppercase letter and 1 number';
  }

  return errorSymbol;
};

export const validateInputs = (
  iteratedString: string,
  options: IValidateInputsProps,
) => {
  const lengthIteratedString = iteratedString.length;
  let error = '';

  error = checkFieldValidate(iteratedString, options);
  if (!error) error = checkPartLengthString(iteratedString, options);

  if (!error)
    error = checkForStringConditions(
      iteratedString,
      lengthIteratedString,
      options,
    );

  return error;
};

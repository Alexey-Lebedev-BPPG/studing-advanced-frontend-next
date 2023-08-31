import { ValidateProfileError } from '../../consts/consts';
import { Profile } from '@/entities/Profile';

export const validateProfileData = (profile?: Profile) => {
  if (!profile) return [ValidateProfileError.NO_DATA];

  const { age, country, first, lastname } = profile;

  const errors: ValidateProfileError[] = [];

  if (!first || !lastname)
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  if (!age || !Number.isInteger(age))
    errors.push(ValidateProfileError.INCORRECT_AGE);
  if (!country) errors.push(ValidateProfileError.INCORRECT_COUNTRY);

  return errors;
};

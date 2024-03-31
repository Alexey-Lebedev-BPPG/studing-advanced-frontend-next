import { Validate } from '@/shared/const/Validate';

export const passwordVerification = (testedString: string) => {
  const { STRING_LETTERS, UPPERCASE_LETTERS, DIGITS, SPECIALS } = Validate;

  let isStringLetters = false; // Are there any lowercase letters in the password
  let isUppercaseLetters = false; // Are there any uppercase letters in the password
  let isDigits = false; // Are there any numbers in the password
  let isSpecials = false; // Are there any special characters in the password

  // creating a difficulty rating
  let rating = 0;

  // Check each character of the password for its type and increase the difficulty rating depending on the condition
  for (let i = 0; i < testedString.length; i++)
    if (!isStringLetters && STRING_LETTERS.includes(testedString[i])) {
      isStringLetters = true;
      rating++;
    } else if (
      !isUppercaseLetters &&
      UPPERCASE_LETTERS.includes(testedString[i])
    ) {
      isUppercaseLetters = true;
      rating++;
    } else if (!isDigits && DIGITS.includes(testedString[i])) {
      isDigits = true;
      rating++;
    } else if (!isSpecials && SPECIALS.includes(testedString[i])) {
      isSpecials = true;
      rating++;
    }

  // Then the password length and the obtained rating are analyzed, and based on that the password complexity styles are prepared
  if (testedString.length === 0) return '#8F8F8F';
  if (testedString.length < 6 && rating < 3) return '#e7140d';
  if (testedString.length < 6 && rating >= 3) return '#ffdb00';
  if (testedString.length >= 8 && rating < 3) return '#ffdb00';
  if (testedString.length >= 8 && rating >= 3) return '#61ac27';
  if (testedString.length >= 6 && rating === 1) return '#e7140d';
  if (testedString.length >= 6 && rating > 1 && rating < 4) return '#ffdb00';
  if (testedString.length >= 6 && rating === 4) return '#61ac27';

  return '#8F8F8F';
};

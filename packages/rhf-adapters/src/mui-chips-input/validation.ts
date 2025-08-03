import { type MuiChipsInputProps } from 'mui-chips-input';

/**
 * Creates a validation function for chip values.
 *
 * @param validationFunc - A function used to validate each chip value.
 * The function should return `true` for valid values, `false` or an object indicating an error for invalid values.
 * @returns Returns a function that validates an array of chip values.
 * The function returns `true` if all values are valid, `false` if any value is invalid,
 * or an error message if an error is encountered.
 */
export function validateChipValues(
  validationFunc: Exclude<MuiChipsInputProps['validate'], undefined>,
) {
  return function validate(values: string[]) {
    const valuesArray = Array.isArray(values) ? values : [];
    let i = 0;
    const length = valuesArray.length;

    while (i < length) {
      const validationData = validationFunc(valuesArray[i++]);

      if (validationData === undefined) continue;

      if (typeof validationData === 'object') {
        if (validationData.isError) {
          return validationData.textError || false;
        }
        continue;
      }

      if (!validationData) {
        return false;
      }
    }
    return true;
  };
}

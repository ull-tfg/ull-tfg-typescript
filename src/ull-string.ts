// A constant containing all uppercase and lowercase alphabetic characters
export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
// A constant containing all uppercase, lowercase alphabetic characters and numeric characters
export const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// A constant containing numeric characters only
export const NUMERIC = '0123456789';
// A constant containing vowels
export const VOWELS = 'AEIOUaeiou';
export const REGULAR_EXPRESSION_CAMEL_CASE: RegExp = /^[a-z]+((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?$/;
export const REGULAR_EXPRESSION_KEBAB_CASE: RegExp = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const REGULAR_EXPRESSION_PASCAL_CASE: RegExp = /^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/;

/**
 * It checks if a string can be parsed to camelCase.
 * @param string  The string to check.
 * @returns  true if the string can be parsed to camelCase, false otherwise.
 */
export const canBeParsedToCamelCase = (string: string): boolean => {
    return REGULAR_EXPRESSION_CAMEL_CASE.test(string);
}

/**
 *  It checks if a string can be parsed to kebab-case.
 * @param string    The string to check.
 * @returns true if the string can be parsed to kebab-case, false otherwise.
 */
export const canBeParsedToKebabCase = (string: string): boolean => {
    return REGULAR_EXPRESSION_KEBAB_CASE.test(string);
}

/**
 *  It checks if a string can be parsed to PascalCase.
 * @param string   The string to check.
 * @returns  true if the string can be parsed to PascalCase, false otherwise.
 */
export const canBeParsedToPascalCase = (string: string): boolean => {
    return REGULAR_EXPRESSION_PASCAL_CASE.test(string);
}

/**
 * Converts the first letter of each word in the string to uppercase.
 * Words are defined as sequences of characters separated by spaces.
 * 
 * @param string - The input string.
 * @returns The string with the first letter of each word capitalized.
 */
export const capitalizeEachWord = (string: string) => {
    return string.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
};

/**
 * This function takes a string as input and returns the string with the first letter capitalized.
 * 
 * @param {string} string - The input string that needs to have its first letter capitalized.
 * @returns {string} - The input string with the first letter converted to uppercase.
 */
export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Function to count the number of vowels in a given string.
 * Vowels considered: 'a', 'e', 'i', 'o', 'u' (both uppercase and lowercase).
 * 
 * @param string - The input string to count vowels in.
 * @returns The number of vowels in the input string.
 */
export const countVowels = (string: string): number => {
    let count = 0;
    for (const char of string) {
        if (VOWELS.includes(char)) {
            count++;
        }
    }
    return count;
};

/**
 * Checks if a string contains only alphabetic characters (A-Z, a-z).
 * @param string - The string to check.
 * @returns true if the string contains only alphabetic characters, false otherwise.
 */
export function isAlphabetic(string: string): boolean {
    for (let i = 0; i < string.length; i++) {
        if (!ALPHABET.includes(string[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Converts a string from camelCase to kebab-case.
 * @param string - The string to convert.
 * @returns  The kebab-case version of the input string.
 */
export const pascalCaseToCamelCase = (string: string): string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

/**
 *  Converts a string from camelCase to kebab-case.
 * @param string - The string to convert.
 * @returns  The kebab-case version of the input string.
 */
export const pascalCaseToKebabCase = (string: string): string => {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generates a random string of alphabetic characters of a specified length.
 *
 * @param {number} length - The desired length of the generated string.
 * @return {string} - A string consisting of random alphabetic characters.
 */
export function randomAlphabetic(length: number): string {
    let result = '';
    const alphabetLength = ALPHABET.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabetLength);
        result += ALPHABET[randomIndex];
    }
    return result;
}

/**
 * Generates a random string of alphabetic characters between a specified minimum and maximum length.
 * 
 * @param {number} minLength - The minimum length of the random string to generate.
 * @param {number} maxLength - The maximum length of the random string to generate.
 * @returns {string} A random alphabetic string of a length between `minLength` and `maxLength`.
 */
export function randomAlphabeticLength(minLength: number, maxLength: number): string {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return randomAlphabetic(length);
}

/**
 * Generates a random string of the specified length composed of alphabetic characters only.
 * The case of the characters can be specified using the `caseType` parameter.
 * 
 * @param length - The length of the random string to generate.
 * @param caseType - The case of the characters in the string ('upper', 'lower', 'mixed'). Default is 'mixed'.
 * @returns A random alphabetic string of the specified length and case.
 */
export function randomAlphabeticWithCase(length: number, caseType: 'upper' | 'lower' | 'mixed' = 'mixed'): string {
    let result = '';
    let alphabet = ALPHABET;
    switch (caseType) {
        case 'upper':
            alphabet = ALPHABET.slice(0, 26);
            break;
        case 'lower':
            alphabet = ALPHABET.slice(26);
            break;
    }
    const alphabetLength = alphabet.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabetLength);
        result += alphabet[randomIndex];
    }
    return result;
}

/**
 * Generates a random alphanumeric string of the specified length.
 *
 * @param {number} length - The length of the generated string.
 * @return {string} A random alphanumeric string.
 */
export function randomAlphanumeric(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * ALPHANUMERIC.length);
        result += ALPHANUMERIC[randomIndex];
    }
    return result;
}

/**
 * Generates a random string of alphanumeric characters between a specified minimum and maximum length.
 * 
 * @param {number} minLength - The minimum length of the random string to generate.
 * @param {number} maxLength - The maximum length of the random string to generate.
 * @returns {string} A random alphanumeric string of a length between `minLength` and `maxLength`.
 */
export function randomAlphanumericLength(minLength: number, maxLength: number): string {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return randomAlphanumeric(length);
}

/**
 * Generates a random alphanumeric string of the specified length.
 * 
 * @param {number} length - The length of the generated string.
 * @param {'upper' | 'lower' | 'mixed'} [caseType='mixed'] - The case type of the characters in the string. 
 *   'upper' for uppercase letters and digits,
 *   'lower' for lowercase letters and digits,
 *   'mixed' for both uppercase and lowercase letters and digits.
 * @returns {string} - The generated random alphanumeric string.
 */
export function randomAlphanumericWithCase(length: number, caseType: 'upper' | 'lower' | 'mixed' = 'mixed'): string {
    let result = '';
    const ALPHANUMERIC_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const ALPHANUMERIC_LOWER = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const ALPHANUMERIC_MIXED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charset = ALPHANUMERIC_MIXED;
    switch (caseType) {
        case 'upper':
            charset = ALPHANUMERIC_UPPER;
            break;
        case 'lower':
            charset = ALPHANUMERIC_LOWER;
            break;
        case 'mixed':
            charset = ALPHANUMERIC_MIXED;
            break;
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

/**
 * Generates a random numeric string of a specified length.
 * 
 * @param length - The length of the random numeric string to be generated.
 * @returns A random numeric string of the specified length.
 */
export function randomNumeric(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * NUMERIC.length);
        result += NUMERIC[randomIndex];
    }
    return result;
}

/**
 * Generates a random string of numeric characters between a specified minimum and maximum length.
 * 
 * @param minLength - The minimum length of the random string to generate.
 * @param maxLength - The maximum length of the random string to generate.
 * @returns A random numeric string of a length between `minLength` and `maxLength`.
 */
export function randomNumericLength(minLength: number, maxLength: number): string {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    return randomNumeric(length);
}

/**
 * Reverses the input string.
 * 
 * @param string - The string to be reversed.
 * @returns The reversed string.
 */
export const reverseString = (string: string): string => {
    return string.split('').reverse().join('');
};

/**
 * Simplifies a string by replacing tabs with spaces, 
 * condensing multiple spaces into a single space, 
 * and trimming leading and trailing whitespace.
 * 
 * @param {string} string - The input string to be simplified.
 * @returns {string} - The simplified string.
 */
export const simplify = (string: string) => {
    return string
        .replace(/\t/g, " ")
        .replace(/ +/g, " ")
        .trim();
};

/**
 * Converts a string to camelCase.
 * 
 * This function takes a string as input and converts it to camelCase by 
 * removing spaces and non-alphanumeric characters, and capitalizing the first
 * letter of each word except the first word.
 * 
 * @param string - The input string to be converted to camelCase.
 * @returns The camelCase version of the input string.
 */
export const toCamelCase = (string: string): string => {
    return string
        .replace(/[^\w\s]/g, '')
        .toLowerCase()
        .split('_')
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join('');
};

/**
 * Converts a string to kebab-case.
 * 
 * This function takes a string as input and converts it to kebab-case by 
 * replacing spaces and non-alphanumeric characters with hyphens and
 * converting all characters to lowercase.
 * 
 * @param string - The input string to be converted to kebab-case.
 * @returns The kebab-case version of the input string.
 */
export const toKebabCase = (string: string): string => {
    return string
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/[^\w-]/g, '')    // Remove non-alphanumeric characters except hyphens
        .toLowerCase();            // Convert to lowercase
};

/**
 * Converts a string to snake_case.
 * 
 * This function takes a string as input and converts it to snake_case by 
 * replacing spaces and non-alphanumeric characters with underscores and
 * converting all characters to lowercase.
 * 
 * @param string - The input string to be converted to snake_case.
 * @returns The snake_case version of the input string.
 */
export const toSnakeCase = (string: string): string => {
    return string
        .replace(/\s+/g, '_')      // Replace spaces with underscores
        .replace(/[^\w_]/g, '')    // Remove non-alphanumeric characters except underscores
        .toLowerCase();            // Convert to lowercase
};
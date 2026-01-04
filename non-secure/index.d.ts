/**
 * By default, Nano ID uses hardware random bytes generation for security
 * and low collision probability. If you are not so concerned with security,
 * you can use it for environments without hardware random generators.
 *
 * ```js
 * import { nanoid } from 'nanoid/non-secure'
 * const id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqLJ"
 * ```
 *
 * @module
 */

/**
 * Options for generating a nanoid.
 */
export interface NanoidOptions {
  /**
   * Size of the ID. The default size is 21.
   */
  size?: number
  /**
   * An optional suffix to append to the generated ID.
   */
  suffix?: string
}

/**
 * Generate URL-friendly unique ID. This method uses the non-secure
 * predictable random generator with bigger collision probability.
 *
 * ```js
 * import { nanoid } from 'nanoid/non-secure'
 * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
 * model.id = nanoid({ suffix: '_dev' }) //=> "Uakgb_J5m9g-0JDMbcJqL_dev"
 * ```
 *
 * @param options Size of the ID or options object with size and suffix.
 * @typeparam Type The ID type to replace `string` with some opaque type.
 * @returns A random string.
 */
export function nanoid<Type extends string>(options?: number | NanoidOptions): Type

/**
 * Generate a unique ID based on a custom alphabet.
 * This method uses the non-secure predictable random generator
 * with bigger collision probability.
 *
 * @param alphabet Alphabet used to generate the ID.
 * @param defaultSize Size of the ID. The default size is 21.
 * @typeparam Type The ID type to replace `string` with some opaque type.
 * @returns A random string generator.
 *
 * ```js
 * import { customAlphabet } from 'nanoid/non-secure'
 * const nanoid = customAlphabet('0123456789абвгдеё', 5)
 * model.id = nanoid() //=> "8ё56а"
 * ```
 */
export function customAlphabet<Type extends string>(
  alphabet: string,
  defaultSize?: number
): (size?: number) => Type

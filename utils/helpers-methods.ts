export function sortAlphabeticallyAsc(array: Array<string>) {
    return array.sort();
}

export function sortAlphabeticallyDesc(array: Array<string>) {
    return array.sort((one, two) => (one > two ? -1 : 1));
}

export function compareStringArraysWithOrder(arr1: Array<string>, arr2: Array<string>) {
    return (arr1.join(',') === arr2.join(',') ? true : false);
}

/**
 * Sorts an array of numbers in ascending order.
 * @param arr - Array of numbers
 * @returns number[] - Sorted ascending
 */
export function sortArrayAsc(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

/**
 * Sorts an array of numbers in descending order.
 * @param arr - Array of numbers
 * @returns number[] - Sorted descending
 */
export function sortArrayDesc(arr: number[]): number[] {
  return [...arr].sort((a, b) => b - a);
}

export function compareNumArrays(arr1: Array<number>, arr2: Array<number>) {
    return arr1.toString() === arr2.toString();
}
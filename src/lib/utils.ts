import { PlayerProfile } from "./player";
import toastr from "toastr";

export function asciiStringToNumber(str: string): number {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i);
  }
  return num;
}

export function intersperse(arr: any[], sep: any): any[] {
  if (arr.length === 0) {
    return [];
  }
  return arr.slice(1).reduce((xs, x) => [...xs, sep, x], [arr[0]]);
}

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * For array like [1, 2, 3], return all combinations like
 * [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1,2,3]]
 * @param arr
 */
export function getPossibleArrayElementsCombinations<T>(arr: T[]): T[][] {
  const getCombinations = (arr: T[], size: number): T[][] => {
    const combinations: T[][] = [];
    const getCombination = (
      arr: T[],
      size: number,
      start: number,
      combination: T[]
    ) => {
      if (size === 0) {
        combinations.push(combination);
        return;
      }
      for (let i = start; i <= arr.length - size; i++) {
        getCombination(arr, size - 1, i + 1, [...combination, arr[i]]);
      }
    };
    getCombination(arr, size, 0, []);
    return combinations;
  };

  const result: T[][] = [];
  for (let i = 1; i <= arr.length; i++) {
    const combinations = getCombinations(arr, i);
    result.push(...combinations);
  }
  return result;
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

export function toastrMessage(message: string, from: PlayerProfile) {
  toastr.info(
    message,
    `<div class="flex flex-row items-center">
      <img style="height:32px" src="${from.avatar}" class="rounded-md mr-2">
      <div class="flex flex-col">
        <div><strong style="font-size:16px;">${from.username}</strong></div>
        <div style="font-size:12px;">${
          from.walletAddress.slice(0, 12) + "..."
        }</div>
      </div>
    </div>`
  );
}

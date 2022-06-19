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

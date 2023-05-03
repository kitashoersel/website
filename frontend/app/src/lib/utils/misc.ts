export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | undefined;
  // eslint-disable-next-line func-names
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

// @flow
import shallowEqual from "./shallowEqual";
// 过滤需要更新的值
export default function <T: { [string]: any }>(
  dest: T,
  src: T,
  previous: ?T,
  subscription: { [string]: boolean },
  keys: string[],
  shallowEqualKeys: string[],
): boolean {
  let different = false;
  keys.forEach((key) => {
    if (subscription[key]) {
      dest[key] = src[key];
      if (
        !previous ||
        (~shallowEqualKeys.indexOf(key)
          ? !shallowEqual(src[key], previous[key])
          : src[key] !== previous[key])
      ) {
        different = true;
      }
    }
  });
  return different;
}

// 判断一个对象是否为空（即不包含任何属性）或者判断对象中有多少个属性
export function isEmpty(obj) {
  return !!Object.keys(obj).length;
}
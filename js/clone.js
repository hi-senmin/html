const mapTag = "[object Map]";
const setTag = "[object Set]";

const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";
const funcTag = "[object Function]";
const regexpTag = "[object RegExp]";
const errorTag = "[object Error]";
const dateTag = "[object Date]";
const symbolTag = "[object Symbol]";

const stringTag = "[object String]";
const numberTag = "[object Number]";
const boolTag = "[object Boolean]";
const nullTag = "[object Null]";
const undefinedTag = "[object Undefined]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

const _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value);
}

function isObject(obj) {
  const type = typeof obj;
  return type !== "null" && type === "object";
}

function cloneOtherType(target, type) {
  if (type === nullTag) return target;

  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case stringTag:
    case numberTag:
    case errorTag:
    case dateTag:
      return new Ctor();

    case regexpTag:
    case symbolTag:
    case funcTag:
    case undefinedTag:
    case nullTag:
      return target;

    default:
      return null;
  }
}

function cloneSet(target, cloneTarget) {
  target.forEach((val) => {
    cloneTarget.add(val);
  });

  return cloneTarget;
}

function cloneMap(target, cloneTarget) {
  target.forEach((val, key) => {
    cloneTarget.set(key, clone(val));
  });
  return cloneTarget;
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function forEach(target, fn) {
  const keys = Object.keys.call(null, target);

  let index = -1;
  const len = keys.length;

  while (++index < len) {
    const key = keys[index];
    fn(target[key], key);
  }
  return keys;
}

function clone(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }

  const type = toRawType(target);

  if (!deepTag.includes(type)) {
    return cloneOtherType(target, type);
  }

  let cloneTarget = getInit(target);

  if (map.has(target)) return map.get(target);
  map.set(target, cloneTarget);

  if (type === setTag) {
    return cloneSet(target, cloneTarget);
  }
  if (type === mapTag) {
    return cloneMap(target, cloneTarget);
  }

  forEach(target, (value, key) => {
    cloneTarget[key] = clone(value, map);
  });

  return cloneTarget;
}

let myMap = new Map();
let keyObj = {};
let keyFunc = function () {};
let keyString = "a string";
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  fun() {
    console.log("this is functinons");
    return this.field4;
  },
  sym: Symbol("a"),
  reg: new RegExp("/a/g"),
  nullTag: null,

  set: new Set([1, 2, 3]),
  map: myMap,
};
target.target = target;

const b = clone(target);

target.map.set(keyObj, "6666");

console.log("b1", b);

// console.log("b2", target, b);

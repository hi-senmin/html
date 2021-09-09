

function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype)
  let result = fn.call(instance, ...args)
  typeof result === 'object' ? result : instance
}

/* instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。 */
function myInstanceOf(left, right) {
  let rProto = right.prototype
  let leftProto = Object.getPrototypeOf(left) // Object.getPrototypeOf(left) === left.__proto__
  while (true) {
    if (leftProto === null || leftProto === undefined) {
      return false
    }

    if (leftProto === rProto) {
      return true
    }

    leftProto = leftProto.__proto__
  }
}
Function.prototype.myCall = function (context) {
  context = context || window
  let fn = Symbol(fn)
  context[fn] = this

  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context[fn]
  return result
}

Function.prototype.myApply = function (context) {
  if (typeof context === "undefined" || context === null) {
    context = window
  }
  let fn = Symbol(fn)
  context[fn] = this
  let arg = arguments[1]
  let result = arg ? context[fn](...arg) : context[fn]()
  delete context[fn]
  return result
}


Function.prototype.myBind = function (context) {
  let context = context || window
  let _this = this
  let _args = [...arguments].slice(1)

  let fun =  function () {
    let args = arguments
    return _this.apply(context, [..._args, ...args])
  }

  fun.prototype = Object.create(_this.prototype)

  return fun
}

Function.prototype.myBind = function (argThis) {
  if (typeof this !== 'function') {
    throw new TypeError(this + 'must be a function')
  }
  let self = this
  let args = [].slice.call(arguments, 1)
  return function () {
    self.apply(argThis, [...args, ...arguments])
  }
}


// 防抖
function debounce(fn, wait = 1000) {
  let timer

  return function () {
    let _this = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, arguments)
    }, wait)
  }
}

// 节流
function throttle(fn, wait) {
  let timer
  return function () {
    let _this = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(_this, arguments)
        timer = null
      }, wait)
    }
  }
}

// 深拷贝
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}

    if (map.get(target)) {
      return target
    }

    map.set(target, cloneTarget)

    for (const key in target) {
      cloneTarget[key] = clone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

// es6 柯里化
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.call(null, fn, ...args)

}


// 通用的事件侦听器函数
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  addEvent: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler)
    }
  },

  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler)
    } else if (element.detachEven) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件的默认行为
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }



}



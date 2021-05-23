# Symbol

1. 概述
    1. 引入Symbol的原因：

    ES5的对象属性名都是字符串，容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

    2. 创建Symbol的方法
    ```js
    let sym=Symbol('ff');
    let sym2=Symbol();
    ```
    * 传入的参数为对象的时候，调用toString之后，将其转为字符串，然后才生成一个 Symbol 值。
    ```js
    const obj = {
                toString() {
                    return 'abc';
                }
            };
            const sym = Symbol(obj);
        console.log(sym);// Symbol(abc)
    ```
    * Symbol 值`不能与其他类型的值`进行`运算`，会报错;
    * Symbol 值 可以显式转为`字符串`。
        ```js
        let sym = Symbol('My symbol');

        String(sym) // 'Symbol(My symbol)'
        sym.toString() // 'Symbol(My symbol)'
        ```
    * Symbol 值也可以转为`布尔值`，但是不能转为数值。
        ```js
            let sym = Symbol();
            Boolean(sym) // true
            !sym  // false

            if (sym) {
            // ...
            }

            Number(sym) // TypeError
            sym + 2 // TypeError
        ```

2. Symbol.prototype.description
    * 创建 Symbol 的时候，可以添加一个`描述`。
    ```js
    const sym = Symbol('foo');
    //sym的描述就是字符串 foo
    ```

    * 但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。
    ```js
    const sym=Symbol('foo');
    String(sym);// "Symbol(foo)"
    sym.toString();// "Symbol(foo)"
    ```

    * ES2019 提供了一个`实例属性description`，直接返回 Symbol 的描述。
    ```js
    const sym = Symbol('foo');
    sym.description // "foo"

    //
    let s = Symbol();
    console.log(s.description);// undefined
    ```

3. 作为属性名的Symbol

每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以`作为标识符`，用于`对象的属性名`，就能保证不会出现同名的属性。对于一个对象由多个模块构成的情况非常有用，能`防止某一个键被不小心改写或覆盖`。

```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

4. Symbol 值作为对象属性名时，`不能用点运算符`。
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```
在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
```js
    let s = Symbol();

    let obj = {
        [s]: function (arg) { console.log(arg); }
    };

    obj[s](123);
```
5. Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的
```js
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

//或者
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
```

6. 消除`魔术字符串`
```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```
字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

* 常用的`消除魔术字符串的方法`
    1. 写成一个变量
    ```js
    const shapeType = {
    triangle: 'Triangle'
    };

    function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });
    ```
    2. 用 Symbol 值
    ```js
    const shapeType = {
    triangle: Symbol('triangle')
    };

    function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });
    ```

7. 属性名的遍历
* Symbol 作为属性名，遍历对象的时候，`该属性不会出现`在`for...in、for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。
* 它也不是私有属性，有一个`Object.getOwnPropertySymbols()方法`，`可以获取指定对象的所有 Symbol 属性名`,返回一个数组.
* `Reflect.ownKeys()方法`可以返回所有类型的键名，包括常规键名和 Symbol 键名。
```js
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

8. Symbol.for(),Symbol.keyFor()

希望重新使用同一个 Symbol 值，`注册到全局`。

```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

Symbol()和Symbol.for()这两种写法，都会生成新的Symbol，`Symbol.for()` 会被登记 在 `全局环境中供搜索`。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。

由于Symbol()写法`没有登记机制`，所以每次调用都会返回一个不同的值。

Symbol.keyFor()方法返回一个`已登记的 Symbol 类型值的key`。

```js
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

Symbol.for()的这个`全局登记特性`，可以`用在不同的 iframe` 或 `service worker 中取到同一个值`。


9. 内置的Symbol值
    ES6 还提供了 `11` 个`内置的 Symbol 值`，指向语言内部使用的方法。

   
    1. Symbol.hasInstance
    对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。

    ```js
    class MyClass{
        [Symbol.hasInstance](foo){
            return foo instance of Array;
        }
    }
    [1, 2, 3] instanceof new MyClass() // true
    ```

    2. Symbol.isConcatSpreadable
    对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
    数组的默认行为是可以展开
    
### 手写

##### Promise

##### Array.prototype.flat

##### 判断一个对象是否可迭代
`const isIterable = obj => obj !== null && typeof obj[Symbol.iterator] === 'function';`

##### 使得普通对象变成可迭代
```js
  const collection = {
            a: 1,
            b: 2,
            [Symbol.iterator]: function () {
                const keys = Object.keys(this);
                let i = 0;
                return {
                    next: () => ({
                        value: this[keys[i++]],
                        done: i > keys.length
                    })
                }
            }
        }
```
* 注意点：next使用箭头函数 是因为如果使用普通函数 this 不是指向外面iterator中的this;
* 使用generator改造

```js
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.iterator]: function * () {
    for (let key in this) {
      yield this[key];
    }
  }
};
```

* 普通迭代器：next()方法返回的是普通对象；
* 异步迭代:next()方法 返回的是promise

```js
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return Promise.resolve({
          value: this[values[i++]], 
          done: i > values.length
        });
      }
    };
  }
};


const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]: async function * () {
    for (let key in this) {
      yield this[key];
    }
  }
};

const iterator = collection[Symbol.asyncIterator]();

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 10, done: false}
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 20, done: false} 
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: 30, done: false} 
}));

console.log(iterator.next().then(result => {
  console.log(result);    // → {value: undefined, done: true} 
}));

// es2018
(async function () {
  for await (const x of collection) {
    console.log(x);
  }
})();

```




##### 手写Promise.prototype.finally
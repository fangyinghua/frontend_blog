### Array.from()
* 可以将那些类型转换为数组

1. 类数组
```js
const obj={
    0:2,
    1:3,
    length:2
}
```

2. 可迭代的对象
```js
const obj={
    * [Symbol.iterator](){
        yield 1;
        yield 2;
        yield 4;
    }
}
const str='abcde12';//字符串也是可迭代对象
```

3. 函数参数对象 arguments
```js
function test(){
    Array.from(arguments)
}
```
4. Set/Map对象


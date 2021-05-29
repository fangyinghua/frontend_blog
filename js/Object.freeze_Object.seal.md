### Object.freeze()
* 使用Object.freeze()冻结的对象中的现有属性值是不可变的。用Object.seal()密封的对象可以改变其现有属性值。

```js
 const obj = {
    prop: 42
};

Object.freeze(obj);//也可以任意数据类型
obj.prop = 33;
console.log(obj);//{prop:42} 不会报错，但是未修改成功
```

### [Object.seal()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
* Object.seal()方法封闭一个对象,不能新增、删除属性，只能修改现有属性。
* Object.seal()方法可以封闭任意类型数据。如果数据类型为`原始值类型，不能修改`。

```js
    var obj = {
        a: 2,
        2: 1
    }
    var o = Object.seal(obj);//封闭对象
    Object.defineProperty(obj, 'a', {
        value: '11'
    });
    Object.seal(1);//1 但是不能再重新赋值
```

### Object.freeze() 对比 Object.seal()
使用Object.freeze()冻结的对象中的`现有属性值是不可变的`。用Object.seal()密封的对象`可以改变其现有属性值`。
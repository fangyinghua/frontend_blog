# es6对象新增的方法

1. 简洁 -- 表示法
* 属性 
```js
const test='test';
const obj2={test}
// 等同 obj2={test:test}
```
* 方法
```js
const obj={
    method(){
        return 'dddd';
    }
}

//等同
const obj={
    method:function(){
        return 'dddd';
    }
}

```

2. 属性名`表达式`

```js
    //表达式作为属性名 -- 新
    //标识符作为属性名
    obj.f='aaa';

    obj['f']='aaaa';
    let a=''a;
    obj[a]='aaaa';
```


3. 方法的`name`属性
函数的name属性，返回函数名。`对象方法`也是函数，因此也有name属性。

```js
const test={
    say(){
        console.log('say`')
    }
}
console.log(test.say.name); // say
```
* 注意：如果对象的方法使用了 `取值函数（getter）和存值函数（setter）`，则`name`属性不是在该方法上面。是该`方法的属性的描述对象`的get和set属性上面.

```js
const obj={
    get foo(){

    },
    set foo(x){

    }
}

const descriptor=Object.getOwnPropertyDescriptor(obj,'foo');
descriptor.get.name;//get foo
descriptor.set.name;//set foo
```

4. 属性的`可枚举性和遍历`
* 可枚举性
`Object.getOwnpropertyDescriptor`方法可以获取 `属性的描述对象`。
描述对象的enumerable属性，称为“可枚举性”.

* 有四个操作会忽略enumerable为false的属性
    - for ... in 循环：只遍历对象自身和继承的 可枚举的属性；
    - Object.keys(): 返回对象 自身的所有可枚举属性的键名；
    - JSON.stringify(): 只串行化对象 自身的可枚举的属性；
    - Object.assign() : 拷贝对象自身的可枚举的属性   -- ES6新增的



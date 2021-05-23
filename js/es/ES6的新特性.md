# es6 新特性
1. 变量声明(const let ) 块级作用域
2. 对象的扩展
    1. * 对象的属性和方法 简写
    2. * 属性名 表达式
    3. * 对象方法的name属性 [`getter/setter`的方法name属性 需要通过属性描述符获取  Object.getOwnPropertyDescriptor(obj, 'foo');]
        ```js
        const obj = {
            get foo() {},
            set foo(x) {}
        };

        obj.foo.name
        // TypeError: Cannot read property 'name' of undefined

        const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

        descriptor.get.name // "get foo"
        descriptor.set.name // "set foo"
        ```
    * 属性的可枚举属性
    4. * 遍历对象的属性 (es6 5种)
        1. for... in 
            for...in循环遍历对象`自身的和继承`的可枚举属性（不含 Symbol 属性）。
        2. Object.keys(obj)
            Object.keys返回一个数组，包括对象`自身的（不含继承的）所有可枚举属性`（不含 Symbol 属性）的键名。
        3. Object.getOwnPropertyNames(obj)  -- 包括自身的所有属性（除  Symbol 属性）
        `Object.getOwnPropertyNames`返回`一个数组`，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名;
        ```js
        const obj = {
            A: 1,
            [Symbol('s')]: 22

        }
        Object.defineProperty(obj, 'cc', {
            configurable: false,
            enumerable: false,
            value: 222
        })
        const names = Object.getOwnPropertyNames(obj);
        console.log(names);// ["A", "cc"]
        ```
        4. Object.getOwnPropertySymbols(obj)
            Object.getOwnPropertySymbols返回一个数组，包含对象`自身的所有 Symbol 属性`的键名。
        5. Reflect.ownKeys(obj) -- 自身全部（不管Symbol/是否可枚举的）
        Reflect.ownKeys返回一个数组，包含`对象自身的（不含继承的）所有键名`，不管键名是 Symbol 或字符串，也不管是否可枚举。
    * 遍历顺序规则：
        1. 数组键 数组升序排列
        2. 字符串，添加顺序
        3. 最后Symbol键，添加顺序
    5. * super关键字
    6. * 对象的扩展运算符 ... -- 用于取出参数对象的`所有可遍历属性`;
        1. 
    7. * 结构赋值
        对象的解构赋值用于从一个对象取值
        1. 解构赋值要求 `等号右边是一个对象`
        2. 解构赋值必须`是最后一个参数`
        3. 解构赋值的拷贝是浅拷贝 --(自身的属性)
        4. 使用解构赋值，扩展运算符`后面必须是一个变量名`，而不能是一个解构赋值表达式;
        ```js
            let { ...z } = null; // 运行时错误
            let { ...z } = undefined; // 运行时错误
            let { ...x, y, z } = someObject; // 句法错误
            let { x, ...y, ...z } = someObject; // 句法错误
            let { x, ...{ y, z } } = o; //  SyntaxError: ... must be followed by an identifier in declaration contexts
        ```   
        5. 解构赋值的拷贝是`浅拷贝`
    8. 链式 判断运算符
        ES2020 引入了“链判断运算符”（optional chaining operator）`?.`;
        * 链判断运算符有三种用法。
            * obj?.prop // 对象属性
            * obj?.[expr] // 同上
            * func?.(...args) // 函数或对象方法的调用

                ```js
                a?.b
                // 等同于
                a == null ? undefined : a.b

                a?.[x]
                // 等同于
                a == null ? undefined : a[x]

                a?.b()
                // 等同于
                a == null ? undefined : a.b()

                a?.()
                // 等同于
                a == null ? undefined : a()
                ```
        * 注意点
        1. 短路机制
        ?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。
        
        2. delete 运算符
        ```js
        delete a?.b
        // 等同于
        a == null ? undefined : delete a.b
        ```
        3. 括号的影响 
        对圆`括号外部没有影响`，只对圆括号`内部有影响`。

        4. 报错场合
        ```js
        // 构造函数
        new a?.()
        new a?.b()

        // 链判断运算符的右侧有模板字符串
        a?.`{b}`
        a?.b`{c}`

        // 链判断运算符的左侧是 super
        super?.()
        super?.foo

        // 链运算符用于赋值运算符左侧
        a?.b = c
        ```

    9. Null 判断运算符
    * ES2020 引入了一个`新的 Null 判断运算符` `??`;运算符左侧的值为null或undefined时，才会返回右侧的值;
    * 这个运算符的一个目的，就是跟链判断运算符?.配合使用，为null或undefined的值设置默认值。
    `const animationDuration = response.settings?.animationDuration ?? 300;`

3. 对象的新增方法


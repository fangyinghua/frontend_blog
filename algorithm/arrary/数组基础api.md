# 数组基础api

* 属性
    * Array.prototype.length

    * Array.prototype[@@unscopables]
        * 语法：
        ```js
        arr[Symbol.unscopables]
        ```
        * with 绑定中未包含的数组默认属性有(8个)：
        ```js
            copyWithin()
            entries()
            keys()
            values()
            includes()

            fill()

            find()
            findIndex()      
        ```

* 方法 
    1.  (会改变原数组) [9个方法会改变数组]
        * Array.prototype.pop()
        * Array.prototype.push()
        * Array.prototype.shift() 删除第一个元素
        * Array.prototype.fill(value[, start[, end]])  -- 从start到end位置使用vaule填充
        * Array.prototype.unshift(element1, ..., elementN)  -- 要添加到数组开头的元素或多个元素 -- 返回其 length 属性值
        * Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]]) -- （第三个及后面的参数有就是添加元素）（第三个参数没有就是删除操作）
        * Array.prototype.reverse() -- 数组翻转会改变原数组
        * Array.prototype.sort() -- 返回数组
        * Array.prototype.copyWithin(target[, start[, end]]) -- 浅复制数组的一部分到同一数组中的另一个位置 -- 会改变原数组的长度
            * target 从什么位置开始替换 （原数组开始替换的位置）
            * start 需要复制的内容从哪里开始 （包含）
            * end 需要复制的内容从哪里结束 （不包括）
            ```js
            const array1 = ['a', 'b', 'c', 'd', 'e'];
            console.log(array1.copyWithin(0, 3, 4));//【1】从array1的0索引位置开始 -- 【2】3, 4 要复制的内容 3开始 就是字母 d -- 【3】 索引0为字母a位置替换成了字母d 返回结果为 ['d','b', 'c', 'd', 'e']
            ```

    2. 迭代器方法
        * Array.prototype.entries(); -- 新的Array Iterator对象
        * Array.prototype.keys() -- 索引键的Array Iterator对象
        * Array.prototype.values() -- 新的 Array Iterator 对象 -- 每个索引的值
        * Array.prototype[@@iterator]()
            ```js
                var arr = ['a', 'b', 'c', 'd', 'e'];
                var eArr = arr[Symbol.iterator]();
                // 浏览器必须支持 for...of 循环
                for (let letter of eArr) {
                    console.log(letter);
                }
            ```


    3. 遍历的方法
        * Array.prototype.forEach() -- 没有返回值
        * Array.prototype.map() -- 返回一个新数组


    4. 不会改变原数组方法

     * Array.prototype.slice([begin,[,end]])  --返回一个新数组
        ```js
        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        console.log(animals.slice(2));//从下标为2开始
        Array ["camel", "duck", "elephant"]
        ```
     * Array.prototype.concat()
        ```js
        const array1=[1,2];
        const array2=[2,1];
        const array3=array1.concat(array2);//Array [1, 2, 2, 1]
        ```
     * Array.prototype.reduce(reducer) -- 返回一个总结果  方向(从左往右)
            * reducer 
                * Accumulator (acc) (累计器)
                * Current Value (cur) (当前值)
                * Current Index (idx) (当前索引)
                * Source Array (src) (源数组)
     * Array.prototype.reduceRight() --和 reduce 一样 方向(从右往左)

    5. 返回字符串
     * Array.prototype.toString() --将数组转字符串，返回字符串 用`','` 逗号连接，但是不会改变原数组
     * Array.prototype.join()  --和  Array.prototype.toString() 功能一样，不传参数就是返回用 用`','` 逗号连接的字符串。比toString() 方法灵活。

        ```js
        const elements = ['Fire', 'Air', 'Water'];
        console.log(elements.join('')); // // expected output: "FireAirWater"
        ```
     * Array.prototype.toLocaleString([locales[,options]]) -- 返回一个字符串
        * 数组中的元素将会使用各自的 toLocaleString 方法：

            * Object: Object.prototype.toLocaleString()
            * Number: Number.prototype.toLocaleString()
            * Date: Date.prototype.toLocaleString()

            ```js
            const array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
            const localeString = array1.toLocaleString('en', { timeZone: 'UTC' });
            console.log(localeString);
            // expected output: "1,a,12/21/1997, 2:12:00 PM",
            // This assumes "en" locale and UTC timezone - your results may vary

            var prices = ['￥7', 500, 8123, 12];
            prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });

            // "￥7,￥500,￥8,123,￥12"
            ```

    6. 查找类型
        * Array.prototype.some()  -- 它`返回的Boolean类型` 是不是`至少有1个元素`通过了被提供的函数测试
        * Array.prototype.every() -- 它`返回的Boolean类型` `所有元素是否都能通过`

        * Array.prototype.filter() -- 创建`一个新数组 ` 返回测试通过的所有元素
        * Array.prototype.find() -- `满足提供的测试函数的第一个元素的值` 否则返回 undefined。 
        * Array.prototype.findIndex() -- 返回`满足测试函数第一元素的索引` 否则返回 -1 ,和lastIndexOf()方法查找的方向是反的
        * Array.prototype.lastIndexOf(searchElement[, fromIndex]) -- 在数组中的`最后一个的索引`，如果不存在则返回 -1。从数组的后面向前查找 ，从 fromIndex 处开始。


    7. Array.prototype.flat() -- 所有元素与遍历到的子数组中的元素合并为一个新数组返回。 var newArray = arr.flat([depth])

        ```js
        const arr1 = [0, 1, 2, [3, 4]];

        console.log(arr1.flat());
        // expected output: [0, 1, 2, 3, 4]

        const arr2 = [0, 1, 2, [[[3, 4]]]];

        console.log(arr2.flat(2));
        // expected output: [0, 1, 2, [3, 4]]

        ```
        
     8. 其他
        *  Array.from() --浅拷贝的数组实例。  字符串转数组  获取实现浅拷贝数据；
        *  Array.of() --创建数组  -- 任意个参数，将按顺序成为返回数组中的元素。
            ```js
            Array.of(7);       // [7]
            Array.of(1, 2, 3); // [1, 2, 3]

            Array(7);          // [ , , , , , , ]
            Array(1, 2, 3);    // [1, 2, 3]
            ```
        * Array.isArray()

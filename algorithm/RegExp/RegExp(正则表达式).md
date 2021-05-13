# RegExp(正则表达式)

1. 创建正则的方法
    * 字面量: `/abc/g`
    * 构造函数: `new RegExp('abc','g')` `new RegExp(/abc/,'g')`

2. 方法
    * RegExp.prototype.exec() -- 在该字符串中执行匹配项的搜索。 -- 如果匹配成功，返回数组；否则返回null； --即使匹配多个也返回一个结果
        * 每次执行 返回一个匹配项 如果匹配多个需要while循环。
        ```js
            var regex1 = RegExp('foo*','g');
            var str1 = 'table football, foosball';
            var array1;

            while ((array1 = regex1.exec(str1)) !== null) {
            console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
            // 输出: "Found foo. Next starts at 9."
            // 输出: "Found foo. Next starts at 19."
            }
        ```
        * 单个结果
        ```js
            [0: "foo"
            groups: undefined
            index: 6
            input: "table football, foosball"
            length: 1
            ]
        ```

    * RegExp.prototype.test() -- 该正则在字符串里是`否有匹配`。 --返回boolean

    ----------------------

    * RegExp.prototype[@@search]() -- 返回值 整数，返回该正则模式的`第一个匹配项的在字符串中的位置索引`。否则将`返回-1`。
        * 在 String.prototype.search() 的内部调用
        ```js
        'abc'.search(/a/);
        /a/[Symbol.search]('abc'); // 0
        ```
    * RegExp.prototype[@@match]()  --返回结果数组 没有匹配返回null
        * 在 String.prototype.match() 的内部调用
        ```JS
        'abc'.match(/a/); 
        /a/[Symbol.match]('abc');
        ```
        ```js
            var testStr='table football, foosball';
            testStr.match(/foo*/)
            //返回结果
           /* [
                0: "foo"
                groups: undefined
                index: 6
                input: "table football, foosball"
                length: 1
            ]*/
            //多次执行testStr.match(/foo*/) 返回结果一样
        
        ```
     * RegExp.prototype[@@matchAll]()  -- 返回RegExpStringIterator 迭代器 可以通过`Array.from()` 转换为一个数组
        在String.prototype.matchAll()中被内部调用
        ```js
        'abc'.matchAll(/a/g);//浏览器运行 需要写g修饰符
        /a/[Symbol.matchAll]('abc');


        var re = /[0-9]+/g;
        var str = '2016-01-02';
        var result = re[Symbol.matchAll](str);

        console.log(Array.from(result, x => x[0]));
        // ["2016", "01", "02"]

        ```

        ```js
        class MyRegExp extends RegExp {
            [Symbol.matchAll](str) {
                var result = RegExp.prototype[Symbol.matchAll].call(this, str);
                if (!result) {
                    return null;
                } else {
                    return Array.from(result);
                }
            }
        }

        var re = new MyRegExp('([0-9]+)-([0-9]+)-([0-9]+)', 'g');
        var str = '2016-01-02|2019-03-07';
        var result = str.matchAll(re);
        console.log(result[0]); // [ "2016-01-02", "2016", "01", "02" ]
        console.log(result[1]); // [ "2019-03-07", "2019", "03", "07" ]

        ```
    * RegExp.prototype[@@split]()  -- 返回一个数组
        * 在 String.prototype.split() 的内部调用
        ```js
        'a-b-c'.split(/-/);
        /-/[Symbol.split]('a-b-c');
        ```
    * RegExp.prototype[@@replace]()  -- 返回一个新的字符串
         在 String.prototype.replace() 的内部调用
         语法：regexp[Symbol.replace](str, newSubStr|function)
        ```js
            'abc'.replace(/a/, 'A');
            /a/[Symbol.replace]('abc', 'A');
        ```

* 常用正则表达式
    * 定位符
        * ^ :开始的位置
        * $ :字符串结尾的位置
        * \b :单词边界
        * \B :非单词边界匹配
    * 普通字符
        * \w :匹配字母、数字、下划线。等价于 [A-Za-z0-9_]
        * \s : 是匹配所有空白符，包括换行
        * \S: 非空白符，不包括换行
        *  [^ABC]:匹配除了 [...] 中字符的所有字符
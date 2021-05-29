# JSON
* JSON 是一种语法，用来序列化`对象、数组、数值、字符串、布尔值和 null `。

* JSON语法支持表示3种类型的值
    1. 简单值：字符串、数值、布尔值和null；
    2. 对象：对象表示有序 键/值对。（每个值可以是简单值获取复杂类型）
    3. 数组：数组的值可以任意类型（简单值、对象、其他数组）

* JSON没有变量、函数或者对象实例的概念。 JSON所有的记号只是为了表示 `结构化数据`。虽然它借用了
JavaScript 的语法，但是千万不要把它跟 JavaScript 语言混淆。



* JSON 可以直接被解析成可用的 JavaScript 对象
* ECMAScript5 增加了 `JSON全局对象`，正式引入 `解析 JSON 的能力`。
* JSON 对象有两个方法：stringify()和 parse()。
* 序列化选项 -- JSON.stringify()
   * 语法：`JSON.stringify(value[, replacer [, space]])`
   * 第一个参数是过滤器，可以是`数组或函数`;
   * 第二个参数是用于 缩进结果 JSON 字符串的选项。这个参数是`数值`时，表示每一级缩进的
`空格数`。是一个字符串,会使用这个字符串而不是空格来缩进。

* 转换规则：
   * `非数组对象的属性` 不能保证 以特定的顺序出现在序列化后的字符串中；
   * 布尔值、数字、字符串的包装对象在 序列化过程中会自动转换成对应的 原始值;
   * 函数、undefined 被单独转换时，会返回 undefined
   * `undefined、任意的函数以及 symbol 值`，在序列化过程中会`被忽略`（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
   * 所有`以 symbol 为属性键`的属性都会`被完全忽略掉`，即便 replacer 参数中强制指定包含了它们。
   * `不可枚举的属性`默认会`被忽略`;
   * 函数、undefined、Symbol `被单独转换`时，会返回 `undefined`;
   * NaN 和 Infinity 格式的数值及 null 都会被当做 null。
   * Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
   * 对象的序列化 其实调用 toJSON;

* 小结
JSON 是一种`轻量级数据格式`，可以方便地表示复杂数据结构。
   
   
 
# js基础知识

### for of (可迭代)
* 特性：
    * for of 是用来遍历`可迭代`的对象,js 引擎是通过判断对象是否具有 `Symbol.iterator` 来判断的.
    * 比如：字符串（将字符串视为一系列 Unicode 字符）、数组、DOM nodelist 对象
    * for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in 循环

### for in （可枚举）
* 特性：
    * for-in 只能遍历“可枚举的属性” 可以使用查看是否可枚举`Object.getOwnPropertyDescriptor(object,property)`；
    * 它实际上遍历的是对象的属性，而不是“索引值”， 所以for in可以遍历对象
    * 遍历原型上的属性(可以配合 Object.hasOwnProperty())
    * 性能：每次迭代操作会同时 `搜索实例或者原型属性`， for-in 循环的每次迭代都会产生更多开销，因此要比其他循环类型慢
    * 字符串、数组、普通对象
    * 结合 Object.hasOwnProperty()方法优化性能；

    ```js
        Array.prototype.age = 20;
        const arr1 =[1,2,3,4,,5]
        for(key in arr1){
            console.log(`arr1[${key}] = ${arr1[key]}`);
        }

    /*arr1[0] = 1
        index.html:23 arr1[1] = 2
        index.html:23 arr1[2] = 3
        index.html:23 arr1[3] = 4
        index.html:23 arr1[5] = 5
        index.html:23 arr1[age] = 20
    */
    ```

### XMLHttpRequest
* 使用`readyState`属性可以`实时`跟踪`异步响应状态`。当该属性值发生变化时，会触发`readystatechange事件`，调用绑定的回调函数。(5种状态 0开始)
    1. 0: 未初始化 --表示对象已经建立，但是尚未初始化，尚未调用 open() 方法.
    2. 1: 初始化 -- 表示对象已经建立，尚未调用 send() 方法. 
    3. 2: 发送数据 -- 表示 send() 方法已经调用，但是当前的状态及HTTP头未知。
    4. 3: 数据传送中 -- 已经接收部分数据，因为响应及 HTTP 头不安全，这时通过 responseBody 和 responseText 获取部分数据会出现错误
    5. 4: 完成 -- 数据接收完毕，此时可以通过`responseBody和responseText`获取完整的响应数据. -- 则说明响应完毕，那么就可以安全的读取响应的数据。
* abort() -- 方法可以中止正在进行的请求。
   
    * 在调用 abort() 方法前，应先`清除onreadystatechange事件处理函数`;
    * 因为 IE 和 Mozilla 在请求中止后,也会`激活这个事件处理函数`。如果`给onreadystatechange属性设置为 null，则 IE 会发生异常`，所以为它设置一个空函数。

    ```js
        xhr.onreadystatechange = function () {};  //清理事件响应函数
        xhr.abort();  //中止请求
    ```
* 获取 XML 数据
    * XMLHttpRequest 对象通过` responseText、responseBody、responseStream 或 responseXML `属性获取响应信息.
* 获取和设置头部消息
    * getAllResponseHeaders()：获取响应的 HTTP头部消息。
    * getResponseHeader("Header-name")：获取指定的 HTTP 头部消息。

* 例子
    ```js
        const xhr=new XMLHttpRequest();
        xhr.open("POST", url, true);  //建立间接，要求异步响应
        xhr.send();

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');  //设置为表单方式提交
        xhr.onreadystatechange=function(){//绑定响应状态事件监听函数
            if(xhr.readystate===4){//监听readyState状态
                if (xhr.state == 200 || xhr.status == 0) {  //监听HTTP状态码
                    const result=xhr.responseText;
                }

            }
        }
    ```

### Window.URL
 * Window.URL 属性返回一个对象，它提供了用于`创建和管理对象URLs`的静态方法。它也可以作为一个构造函数被调用来构造 URL 对象。
 * 此功能在Web Workers中可用。
 * 调用一个静态方法：`img.src= URL.createObjectURL(blob)` --(Binary large object)

### URL
 * URL接口用于解析，构造，规范化和编码 URLs。
 * 此特性在 Web Worker 中可用。

### web workers
通过使用Web Workers，`Web应用程序`可以在`独立于主线程的后台线程`中，运行一个脚本操作。

### Worker()
* Worker() 构造函数创建一个 Worker 对象，该对象`执行指定的URL脚本`。这个脚本`必须遵守同源策略` 。
* 如果此URL有一个`无效的语句`，或者`违反同源策略`，一个 SECURITY_ERR 类型的DOMException被抛出。
* 语法 `const myWorker = new Worker(aURL, options);`
        * 如果文档不允许启动worker，则会引发SecurityError
        * 如果脚本之一的MIME类型为 text/csv, image/*, video/*,或 audio/*, 则会引发NetworkError。它应该`始终是text/javascript`。
        * 如果aURL无法解析，则引发SyntaxError。
* 参数 
    * aURL
        是一个DOMString 表示worker 将执行的脚本的URL。它必须遵守同源策略。
    * options 可选
* 返回值--- 创建的 worker。
* 异常
    * 当 document 不被允许启动 worker 的时候，将抛出一个 SecurityError 异常。例如：如果提供的 aURL 有语法错误，或者与同源策略相冲突（跨域访问）。
    * 如果 worker 的 MIME 类型不正确，将抛出一个 NetworkError 异常。worker 的 MIME 类型必须是 text/javascript 。
    * 如果 aURL 无法被解析（格式错误），将抛出一个 SyntaxError 异常。
* 例子


### 位运算
JavaScript的位运算参照java的位运算（java位运算在int型数字的基础上进行的），JavaScript只有double型的数据类型，在进行位运算的过程中，需要将double型转换为int型后再进行。JavaScript层面上做位运算的效果不高。
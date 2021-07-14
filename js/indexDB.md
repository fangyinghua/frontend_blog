### 在用户的浏览器内持久化存储数据的方法
1. Window.localStorage -- 键值对总是以`字符串`的形式存储，永久性的
    * setItem('KEY')
    * getItem('KEY')
    * removeItem('KEY')
    * clear()

2. Window.sesstionStorage -- 键值对总是以`字符串`的形式存储，会话级别
    * setItem('KEY')
    * getItem('KEY')
    * removeItem('KEY')
    * clear()

3. indexDB -- NO sql （是浏览器提供的本地数据库）
    1. 特点
        1. 键值对存储
        2. `异步`操作 --（异步设计是为了防止大量数据的读写，拖慢网页的表现。）
        3. 支持`事务` -- 这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况;
        4. `同源限制` IndexedDB 受到同源限制;
        5. 可以`存储结构化克隆算法支持的任何对象`(16种)；（所有的原生类型--除了symbols/Boolean/String/Date/RegExp/Blob/File/FileList/ArrayBuffer/ArrayBufferView/ImageData/Object/Map/Set/Object/Array）;

    2. 使用的基本模式
        1. 打开数据库;
        2. 在数据库中创建一个`对象仓库(object store)`;
        3. 启动一个事务，并发送一个请求来执行一些数据库操作，像增加或提取数据等;
        4. 通过监听正确类型的 DOM 事件以等待操作完成;
        5. 在操作结果上进行一些操作（可以在 request 对象中找到）;


    * 注意：
    1. 对象仓库修改，只能先删除再重新创建;
    2. 尝试创建一个与已存在的对象仓库重名会抛出错误。

3. 代码
```js
    var db;

    //打开数据库
    var request=window.indexDB.open("MyTestDatabase");
    //  IDBDatabase 对象的实例
     // open 请求不会立即打开数据库或者开始一个事务。 

    //如果数据库不存在，open 操作会创建该数据库，然后 onupgradeneeded 事件被触发，你需要在该事件的处理函数中创建数据库模式。

    request.onerror = function(event) {
    // Do something with request.errorCode!
    };

   request.onsuccess = function(event) {
        var db = event.target.result;

   };

   //当你创建一个新的数据库或者增加已存在的数据库的版本号  onupgradeneeded 事件会被触发

   // 该事件仅在较新的浏览器中实现了
    request.onupgradeneeded = function(event) {
        // 保存 IDBDataBase 接口
        var db = event.target.result;

        // 为该数据库创建一个对象仓库
        var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
    };

```


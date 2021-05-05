### 条件请求 （询问服务器资源是否变化）
Precondition条件请求
* 目的：
    * 由客户端`携带条件判断信息`，而服务器`预执行` `条件验证过程成功`后，再返回资源的表述；

* 常见应用场景
    * 使缓存的更新 更有效(如：304 响应码 使服务器不用传送包体)
    * 断点续传时 对之前的内容验证
    * 多个客户端并行修改同一资源时，防止某一客户端的更新被错误丢失；

* 验证器
    验证器validator:根据客户端请求中携带的相关头部，以及服务器资源的信息，执行两端的资源验证
    * 强验证器:服务器上的资源表述只要有变化，那么以旧的验证头部访问一定会导致验证不通过。
    * 弱验证器：服务器上资源变动时，允许一定程度上仍然可以验证通过

* 验证器响应头部
    * Etag 响应头部
        * 强验证器：ETag:"xxx";
        * 弱验证器：ETag：W/"xxx";
    * Last-Modified 响应头部
        * 定义：Last-Modified=HTTP-data
        * 表示对应资源表述的上次修改时间
        * 对比Date头:Date=HTTP-date
            * 表示响应包体生成的时间
            * Last-Modified不能晚于Date的值

* 条件请求头部
    * If-Match=entity-tag;
    * If-None-Match=entity-tag;
    * If-Modified-Since=HTTP-date; (如果从某个时间点算起, 如果文件被修改了)
        * 真的修改了,服务器返回200;
        * 没有修改，服务器返回`304 Not Modified`;
    * If-UnModified-Since=HTTP-date;(如果从某个时间点算起, 文件没有被修改)
        * 如果没有被修改: 则开始`继续'传送文件: 服务器返回: 200 OK
        * 如果文件被修改: 则不传输, 服务器返回: `412 Precondition failed (预处理错误)`
    * If-Range=entity-tag/HTTP-date;

* 缓存更新
    使用`if-none-match/if-modified-since`请求头 验证资源是否过程
    * 首次发出请求
    ![首次发出请求](/frontend_blog/img/http/cache/first.png)
    * 非首次请求
    ![非首次发出请求](/frontend_blog/img/http/cache/second.png)

* 增量更新
    * 首次发出请求
    ![首次发出请求](/frontend_blog/img/http/cache/range1.png)
    * 非首次请求
    
    ![非首次发出请求](/frontend_blog/img/http/cache/range2.png)
    ![非首次发出请求](/frontend_blog/img/http/cache/range3.png)

    * 使用if-range 优化请求 --(If-Range -- (If-UnModified-Since/If-Match))
    ![非首次发出请求](/frontend_blog/img/http/cache/range3.png)
    
* 更新丢失问题

    


### cookie (http state management mechanism)

* cookie是http的状态管理机制;
* 保存在客户端、由浏览器维护、表示应用状态的http头部
    * 存放在内存或者磁盘中
    * 服务器端生成cookie在响应中，通过set-cookie头部告知客户端（允许多个set-cookie）
        ```
        set-cookie:key=vaule;
        set-cookie:key2=vaule2;
        ```
    * 客户端得到cookie后，后续请求都会自动将cookie头部携带至请求中
    ```
    cookie:key=vaule;key2=vaule2;
    ```
* cookie-pair的属性(6个)
    `cookie-av=expires-av/max-age-av/domain-av/path-av/secure-av/httponly-av/extension-av`
    * expires-av=“Expires="sane-cookie-date
        * cookie到日期 sane-cookie-date后失效
    * max-age-av="Max-Age="non-zero-digit * DIGIT
        * cookie 经过 *DIGIT秒后失效。max-age优先级高于expires
         `set-cookie:key1=value;path=/;Max-Age=10;`
    * domain-av="Domain="domain-value
        * 指定cookie可用于那些域名，默认可访问当前域名
    * path-av="Path="path-value
        * 指定path路径下才能使用cookie
        `set-cookie:key1=value;path=/`
    * secure-av="Secure"
        * 只有使用TLS/SSL协议时才能使用cookie
    * httponly-av="HttpOnly"
        * 不能使用js的api访问到cookie
         `set-cookie:key1=value;path=/;HttpOnly`

* Cookie 使用限制
    * RFC规范对浏览器使用Cookie的要求
        * 每条cookie的长度至于要达到4KB;
        * 每个域名才至少支持50个Cookie；
        * 至少要支持300个cookie；
    * 代理服务器传递Cookie时会有限制
* Cookie在协议设计上的问题
    * Cookie会被附件到每个http请求中，所以无形增加传输流量
    * 由于http请求中cookie是明文传输，所以完全性成问题；
    * Cookie的大小不应该超过4kB，对复杂的存储需求不够用；
* 第三方Cookie
    浏览器允许对应不安全域下(跨域)的资源（比如：广告、图片） 响应中的set-cookie保存，并在后续访问该域时自动使用cookie；
    * 用户踪迹信息的搜索

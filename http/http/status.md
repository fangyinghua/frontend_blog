
### http的状态码
* RFC规定状态码：三位数字组成，取值范围000-999;
* RFC把状态码分成5类：用数字的第一位表示分类，这样状态码范围变成100-599；


### 响应码
* 1XX:请求已接收到，需要进一步处理才能完成，http1.0不支持；
    * 100 Continue:上传大文件前使用（告知服务器需要上传大文件）
        * 由客户端发起请求中携带 Expect：100-continue 头部触发 （Expect预期）
        * 服务器返回 100 Continue
    * 101 Switch Protocols:协议升级使用
        * 由客户端发起请求中携带Upgrade头部触发；
    * 102 Processing(处理)：表示服务器已经收到并正在处理请求，但无响应可用(处理响应要很久)，防止客户端超时。

* 2XX：
    * 200 ok:成功返回响应;
    * 201 Created：有新资源在服务器端被成功创建;
    * 202 Accepted:服务端接收并开始处理请求，但请求未处理完成。例如：异步、需要长时间处理的任务。
    * 204 No Content:成功执行了请求且不携带响应包体，并暗示客户端无需更新当前的页面视图；
    * 205 Reset Content:成功执行了请求且不携带响应包体，并暗示客户端需更新当前的页面视图；
    * 206 Partial Content:使用range协议时返回部分响应内容时的响应码；

* 3XX：重定向使用Location指向的资源或者缓存中的资源。在RFC2068中规定客户端重定向次数不超过5次，以防止死循环。
    * 301 moved premanentle:资源永久性的重定向到另一个URI中；
    * 302 Found:资源临时的重定向到另一个URI中；
    * 304 not modified：告知客户端可以复用缓存。

* 4XX: （400 401/407 405 408 411 413/414 415）
    * 400 bad request:服务器认为客户端出现了错误，但不能明确判断为以下那种错误时使用此错误码。例如http请求格式错误。

    * 401 unauthorized:用户认证信息缺失或者不正确，导致服务器无法处理请求。（源服务器返回）
    * 407 Proxy authentication required:认证信息未通过代理服务器的验证(代理服务器返回)
    
    * 403 Forbidden：服务器理解`请求的含义`，但是没有权限执行此请求。

    * 404 not found:服务器没有找到对应的资源；
    * 410 Gone:对404补充，知道资源永远没有此资源；

    * 405 method Not allowed：服务器不支持请求行中的method方法
    * 408 request timeout：服务器`接收请求`超时

    * 411 length required:如果请求含有包体且未携带content-length头部，且不属于chunk类请求时。

    * 413 payload too large：请求的包体超出服务器能处理的最大长度
    * 414 URI too long：请求的URI超出服务器能接受的最大长度；
    

    * 415 unsupported media type：上传的文件类型不被服务器支持；
    * 451：由于法律原因资源不可访问

* 5xx （500 502 504 511）
    * 500：服务器内部错误，且不属于一下错误类型；
    * 501 not implemented:服务器不支持实现请求所需要的功能；
    * 502 bad Gateway：代理服务器无法（从源服务器）获取到合法响应；
    * 503 service unavailable:服务器(并发数达到上限等原因)资源尚未准备好 处理当前请求；
    * 504 gateway timeout：代理服务器无法及时的从上游获取响应；（代理服务器设置的超时时间太短了）
    * 505 http version not supported ：请求使用的http协议版本不支持；
    * 511 network authentication required：代理服务器发现客户端需要进行 身份验证才能获得网络访问权限；


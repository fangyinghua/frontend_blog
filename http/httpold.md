前端优化大都是体现在网络上的。


### 为什么首屏html大小限制在14KB以内？
1. 鉴于TCP 评估<span style="color:red">连接状况</span>的方式（TCP慢启动），
2. 新的TCP连接 无法立即使用 客户端和服务端之间的 <span style="color:red">全部有效带宽</span>。
3. 在<span style="color:red">新连接</span>进行 首次往返 的过程中，服务器 最多 只能发送10个TCP数据包(大约14KB)

### 什么是TCP慢启动

为了避免 流量攻击 等行为，TCP实际上有一些 防止拥塞的策略：
TCP 提供一种机制可以让「发送方」根据「接收方」的实际接收能力控制发送的数据量，这就是所谓的<span style="color:red">流量控制</span>。
TCP是一个面向连接的、可靠的、基于字节流的传输层协议。
* 建立TCP连接的三个TCP窗口：
    接收窗口 rwnd (receive window)
    发送窗口swnd(send window)
    拥塞窗口cwnd(congestion window)

### 判断网络出现拥塞后，TCP就会执行下面四个算法：

* 慢启动
    拥塞窗口（CWND）它是<span style="color:red">发送方</span>维护的一个的状态变量，它会根据网络的拥塞程度动态变化，前面提到过发送窗口 swnd 和接收窗口 rwnd 是约等于的关系，那么由于入了拥塞窗口的概念后，此时发送窗口的值是swnd = min(cwnd, rwnd)，也就是拥塞窗口和接收窗口中的最小值。
    * 只要网络中没有出现拥塞，cwnd 就会增大
    * 网络中出现了拥塞，cwnd 就减小

    * 当 cwnd < ssthresh 时，使用慢启动算法。
    * 当 cwnd >= ssthresh（慢启动门限） 时，就会使用「拥塞避免算法」。

* 拥塞避免
    拥塞避免算法就是将原本慢启动算法的指数增长变成了线性增长。
    随着<span style="color:red">发送量</span>增大，网络慢慢就会出现拥塞，这时候就会出现丢包，进而触发重传。当触发重传机制，那么就会启动拥塞发生算法。

* 拥塞发生 （弊端：延迟很高）
    需要注意的是，上面我们介绍过两种重传机制：
    * 重传机制：
        * 超时重传
        * 快速重传
    * 这两种重传机制对应两种不同的异常：
        1. 超时重传是网络出现拥堵，无法快速处理所有数据包，所以导致数据包“堵”在网络当中；
        2. 而快速重传是由于网络异常从而导致某一个数据包“失踪”了，而网络实际是畅通的。
    * TCP同样选择两种算法处理
        1. ssthresh 设为 cwnd/2，
        2. cwnd 重置为 1

* 快速恢复
    * cwnd = cwnd/2 ，也就是设置为原来的一半;
    * ssthresh = cwnd;

    * 拥塞窗口 cwnd = ssthresh + 3 （ 3 的意思是确认有 3 个数据包被收到了）
    * 重传丢失的数据包
    * 如果再收到重复的 ACK，那么 cwnd 增加 1
    * 如果收到新数据的 ACK 后，设置 cwnd 为 ssthresh，接着就进入了拥塞避免算法

总结：慢启动算法-> 拥塞避免-> 拥塞发生 ->快速恢复

* TCP的三次握手过程：
    * 客户端发 起连接请求，报头中的SYN=1，ACK=0，TCP规定SYN=1时不能携带数据，但要消耗一个序号,因此声明自己的序号是 seq=x。此时客户端状态CLOSED->SYN-SENT；

    * 服务器接收到连接请求，然后进行回复确认，发送SYN=1 ACK=1 seq=y ack=x+1。此时服务端状态LISTEN->SYN-RCVD

    * 客户端收到对SYN的确认包之后再次确认，SYN=0 ACK=1 seq=x+1 ack=y+1，此时客户端状态SYN-SENT->ESTABLISHED

    * 服务端接收到客户端的确认包后状态变为ESTABLISHED

    ACK和ack的区别：
    1. SYN和ACK都是标志位：可置为1或0，三次握手时是1；
    2. 而ACK是 连接建立 状态的标志。
    3. 通过ack进行确认，ack num=seq+1

* 为什么要进行三次握手？

    为了防止已经失效的 连接请求 报文段 突然又传送到了B，因而产生错误。 --造成资源浪费

    保证通信是“全双工”的，即客户端和服务器都具备发送和接收能力，假如没有客户端的第二次确认，那么服务端无法确保客户端已经接收到自己发出去的SYN确认包。而且假如只有两次握手，那么会存在资源浪费的情况：

    客户端发出SYN请求后，由于网络复杂情况，这个请求一直没有发送到服务器端，这时候客户端超时重发第二个请求，然后第二个请求服务端正常接收并建立连接，数据传输完毕后双方断开了连接，但这时候第一次发送的那个SYN包终于到达服务端了，由于是二次握手，所以服务端发送确认包，并建立连接，但是客户端实际上已经断开连接了，而服务端建立了一条“没有”客户端的连接，造成了资源浪费。

在TCP中，是通过 <span style="color:red">序列号与确认应答</span> 来保证的.

* 超时重传
在数据包丢失或者确认应答丢失时会发生超时重传：


tcp学习参考资料：https://www.jianshu.com/p/de85547cd5de









### http
http1.1 -> rest架构

* http解决了什么问题？
    1. 低门槛
    2. 可扩展性
    3. 向前兼容
    4. 大粒度数据的网络传输
    5. internet规模
* 架构属性：性能
    1. 网络性能 
        * throughput吞吐量：小于等于带宽
        * overhead开销：首次开销，每次开销
    2. 用户感知到的性能
        * latency延迟：发起请求到接收到响应的时间
        * 完成时间：完成一个应用动作所花费的时间
    3. 网络效率
        * 重用缓存、减少交互次数，数据传输距离更近、COD
* 短连接与长连接
    * connection头部：
        * keep-alive:长连接
            * 客户端请求长连接：
            connection:keep-alive
            * 服务daunt表示支持长连接
            connection:keep-alive
            * 客户端复用连接
            * http1.1默认支持长连接
            connection:keep-alive无意义

        * close：短连接
         一个事务结束就关闭TCP链接
    * 那什么时候关闭这个长链接呢？
        客户端和服务器都有定时器，空闲时间过长后，就会关闭。
    * Connection在和代理服务器通信的情况
        1. 如果存在代理服务器的话，不会转发Connection列出的头部，该头部仅与当前链接相关。
        2. 代理服务器能够识别Connection，但是不支持长连接，就变成短连接；
        3. 如果代理服务器过于陈旧，不能识别Connection的话，就会转发此头部信息。此时代理服务器就会出现错误；
        * 解决办法：浏览器明确知道用户点击配置了代理服务器，浏览器和正向代理服务器之间就会使用Proxy-connection代替connection，如果陈旧的代理服务器可以识别的话，那么就能正常建立链接；如果不能识别的话，代理服务器会讲此头部转发到服务器，源服务器也不能识别Proxy-connection，自动忽略，默认建立短链接。

    * 长连接优点：
        1. 减少TCP握手次数；
        2. 拥塞控制上增加吞吐量

* host头部
    * 为什么要求传递Host？
    HTTP/1.0中是没有Host头部的，当时域名较少，一个域名只针对一个IP，当用户对服务器建立起连接的时候，是不要考虑匹配域名对应的服务。现在域名众多，IP地址较少，一个IP可能对应多个域名。
    * 所有HTTP/1.1 请求报文中必须包含一个Host头字段。对于缺少Host头或者含有超过一个Host头的HTTP/1.1 请求，可能会收到400（Bad Request）状态码。
    * Host 是 HTTP 1.1 协议中新增的一个请求头，主要用来实现虚拟主机技术。
    * 虚拟主机（virtual hosting）即共享主机（shared web hosting），可以利用虚拟技术把一台完整的服务器分成若干个主机，因此可以在单一主机上运行多个网站或服务。
    * 有一台 ip 地址为 61.135.169.125 的服务器，在这台服务器上部署着谷歌、百度、淘宝的网站。为什么我们访问 https://www.google.com 时，看到的是 Google 的首页而不是百度或者淘宝的首页？原因就是 Host 请求头决定着访问哪个虚拟主机。
* 请求的上下文
    * User-Agent:用户代理
    * Referer：Referer 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等。 浏览器自动加入的。
        * 作用：
            1. 统计工作：我公司网站在百度上做了广告，但不知道在百度上做广告对我们网站的访问量是否有影响，那么可以对每个请求中的Referer进行分析，如果Referer为百度的很多，那么说明用户都是通过百度找到我们公司网站的。
            2. 防盗链：我公司网站上有一个下载链接，而其他网站盗链了这个地址，例如在我网站上的index.html页面中有一个链接，点击即可下载JDK7.0，但有某个人的微博中盗链了这个资源，它也有一个链接指向我们网站的JDK7.0，也就是说登录它的微博，点击链接就可以从我网站上下载JDK7.0，这导致我们网站的广告没有看，但下载的却是我网站的资源。这时可以使用Referer进行防盗链，在资源被下载之前，我们对Referer进行判断，如果请求来自本网站，那么允许下载，如果非本网站，先跳转到本网站看广告，然后再允许下载。
        * 有些请求的Referer 不会被发送：
            1. 来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI；
            2. 当前请求页面采用的是非安全协议，而来源页面采用的是安全协议（HTTPS）。
    * From
        主要用于网络爬虫，告诉服务器如何 通过邮件联系到爬虫的负责人
        From=mailbox
        * From：webmaster@example.org
* 响应的上下文
    * accept-ranges：告诉客户端服务器上改资源是否允许range请求;
        * accept-ranges: bytes -- 支持
        * accept-ranges: none --不支持  
    * server
        指明服务器上所用软件的信息，用于帮助客服端定位问题或统计数据。
    * allow
* 内容协商
    * 协商方式：
        1. Proactive 主动式内容协商
            指由客户端先在 请求头部中提出需要的表述形式，而服务器根据这些请求头部 提供特定的representation表述。
        2. Reactive 响应式内容协商  --比较少用
            指服务器返回300 Multiple Choices 或者406 not acceptable,由客户端选择一种表述URI使用。
    * 常见的协商要素
       * 质量因子 q：内容的质量、可接受类型的优先级
       * 媒体资源的MIME类型及质量因子
         * Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3   
       * 字符编码：由于UTF-8格式广为使用，Accept-Charset 已被废弃
       * 内容编码： 主要指压缩算法
            accept-encoding:gzip,br,deflate;
       * 表述语言
           accept-language:zh-cn,zh;q=0.9;en-us;q=0.8'
    * 资源表述的元数据头部
        * 媒体类型、编码
          content-type：text/html;charset=utf-8;
        * 内容编码
           content-encoding：gzip
        * 语言
          content-language：de-DE；
    * 国际化和本地化

        * internationalization（i18n，i 和 n之间有18个字符）

            指软件设计时，在不同的国家、地区可以不做逻辑实现层面的修改便能够以不同的语言显示
        * localization（l10n，l 和 n 间有10个字符）

            指内容协商时，根据请求中的语言及区域信息，选择特定的语言作为资源表述

* http包体的传输方式
    * http包体：承载的消息内容
        * 请求或者响应都可以携带包体
            message-body=*OCTET：二进制字节流
        * 有些消息不能有包体
            * HEAD方法请求对应的响应
            * 1XX、204/304对应的响应
            * connect对应的2xx响应；
    * 两种传输http包体的方式
        * 发送http消息时，已经能够确定包体的全部长度
            * 使用content-length头部明确指明 包体长度
            * content-length=1*DIGIT;（可见性要求高，所以采用10进制）
            * 用10进制（不是16进制）表述包体的<span color="red">字节</span>个数，且必须与实际传输的包体长度一致。
            * 不一致：content-length<实际长度= => 内容截取;content-length>实际长度 ==>报错 无法响应；
            * 优点：接收端处理更简单
        * 发送http消息时，不能确定包体的全部长度
            * 使用transfer-encoding头部，指明使用chunk传输方式
            * 含transfer-encoding头部，content-length头部会被忽略。
            * 优点：
                * 基于长连接 持续推送动态内容；
                * 压缩体积较大的包体时，不必完全压缩完（计算出头部）；
                * 传递必须在包体传输完 才能计算出的Trailer头部；
            * transfer-encoding:chunked
                * chunked-body的格式
                ```
                chunked-body=*chunk
                            last-chunk
                            trailer-part
                            CRLF
                ```
                * chunk的格式
                ```
                chun=chunk-size [chunk-ext] CRLF chunk-data CRLF
                chunk-size=1*HEXDIG：注意这里是16进制而不是10进制
                chunk-data=1*OCTET 1个或者多个二进制（二进制、ASCII）
                ```
                * last-chunk=1*(0) [chunk-ext] CRLF: 一个或者多个0
                * trailer-part=*(header-field CRLF)
    * MIME
       * 格式： content-type:type（类型）/subtype(子类型)
       * discrete-type:type:text/image/audio/video/application
       * composite-type:message/multipart
       *  extension-token:x-token等            
    * content-disposition
        * disposition-type="inline/attachment" 
        * inline:指定包体以inline内联的方式，作为页面的一部分展示；
        * attachment：指定浏览器将包体以附件的方式下载。

* HTML form表单
    提供了<span style="color:red">交互控制元件</span>用来向 服务器通过 http协议提交信息，常见控件有：

    * Text Input Controls:文本输入控件
    * Checkboxes  Controls:复选框控件
    * Radio Box  Controls:单选按钮控件
    * Select Box  Controls:下拉列表控件
    * File Select boxes：选取文件控件
    * Clickable boxes：可点击的按钮控件
    * Submit and Reset Button：提交或者重置按钮控件 --发送http协议

* 提交请求时的关键属性
    * action：提交时发起http请求的uri
    * method：提交时发起http请求的http方法
        get方法没有包体，在url通过？&进行拼接；
    * enctype：在post方法下，对表单内容在请求包体中的编码方式
        * application/x-www-form-urlencoded
            * 数据被编码成以&分隔的键和值，字符以URL编码方式编码；
        * multipart/form-data (比较复杂的方式 --上传文件)
            * boundary 分隔符
            * 每部分 表述皆有http头部描述 子包体，例如：content-type
            * last  boundary 结尾
        * content-type:multpart/form-data; (多个资源 表述 表单每一个控件 都是独立的资源表述)
            boundary=----wswwwwssssss

        * boundary 分隔符的格式
          * boundary：=0*69<bchars> 0-69个字符 数字、字符、+、_、，、.、：等任意字符；
          * last-boundary:-- xxx-- \r\n

* 缓存原理

* 包体传输方式


### 网络安全
1. DDoS
    * 概念：
        分布式拒绝服务攻击(Distributed Denial of Service，简称DDoS)。由于攻击的发出点是分布在不同地方的，这类攻击称为分布式拒绝服务攻击。
    * DDoS攻击分为两种：
        1. 要么大数据，大流量来压垮网络设备和服务器；
        2. 有意制造大量 <span style="color:red">无法完成的不完全请求</span>来快速耗尽服务器资源；（比如利用TCP的重传机制）


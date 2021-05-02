### http2
##### http1.1出现的问题：
1. 高延长带来页面加载速度的降低
    * 随着带宽的增加，延迟并没有明显下降（最后一公里）；
    * 并发连接有限；
    * 同一连接 同时只能在完成一个http事务才能处理下一个事务；
2. 高延迟 vs 高带宽 
    * 单连接上的串行请求；
    * 无状态导致的高传输量；
3. 无状态特性带来的巨大HTTP头部（cookie）
4. http1.1为了解决性能问题：
    * 合并多张小图
    * inlinling内联,将图片嵌入到css和html文件中，减少网络请求次数
    * 拼接 --多个体积较小的js合并1个体积较大的js文件；
    * 分片，将同一个页面的资源 分散到不同域名下，提升连接上限；

##### http2
###### HTTP2特性:
1. SPDY（2012-2016）
2. http2 （RFC7540 2015.5）
    * 使用 http/1.X的客户端和服务器可以无缝的通过代理方式转接到http2上
    * 不识别http/2的代理服务器可以将请求降低到http/1.x;
    * 老的scheme不变，没有http2://
    * 请求应答模式没有变化,语义没有发生变化(比如请求方法、URI、状态码、头字段等概念都保留不变)
    * 二进制格式 --把原来的`“Header+Body”`的消息“打散”为数个小片的`二进制“帧”（Frame）`，用`“HEADERS”帧`存放`头数据`、`“DATA”帧`存放`实体数据`。
    * 多路复用带来提升
* http/2主要特性
    * 传输数据量的大幅度减少
        * 以二进制的方式传输
        * 标头压缩
    * 多路复用（消息优先级）
    * 服务端消息推送（并行推送）
* 对称加密的密钥 --随着连接生成，实时变化


3. 快速推广的原因
    * 未改变http1.1的语义；
    * 基于TCP，仅在应用层变动;


1. (http无状态，每次请求传输大量的重复数据)解决http1.1头部臃肿问题。

* 解决办法：使用HPACK 头部压缩
1. 压缩方式
    1. 静态字典
    2. 动态字典
    1. 压缩算法：Huffman编码(最高压缩比8:5)
* 索引表格式：
    * index Hardname Hardvalue
    * 有些含hardvalue，有些不含hardvalue
* h2load 工具测试
* 访问一次：静态表和Huffman编码
* 访问一次以上：静态表/动态表/Huffman,访问次数越多，压缩比越大；
* 为什么可以反复传输，依靠动态表提高压缩比；

* http的head如何编码 --Huffman编码

* Huffman编码：
    * 原理:“出现概率较大的符合采用较短的编码，概率较小采用较长的编码;
    * 静态Huffman编码
    * 动态Huffman编码
* Huffman树的构造过程
    * 计算各字母出现的概率
    * 将出现频率最小的两个字母相加构成子树，左小又大；
    * 重复步骤2，直到完成树的构造；
    * 给树的左边链接编码为0，右链接编码为1；
    * 每个字母的编码从根结点到所在叶子结点中所有链接的编码；


* HTTP/2 还添加了一些`控制帧`来`管理` `虚拟的“流”`，实现了`优先级和流量控制`
2. HTTP/2 的消息不再是“Header+Body”的形式，而是分散为多个二进制“帧”；HTTP/2 使用虚拟的“流”传输消息，解决了困扰多年的“队头阻塞”问题，同时实现了“多路复用”，提高连接的利用率；
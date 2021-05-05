### 常见方法
幂等方法：是指无论调用多少次,结果都相同; --事务
* GET：获取信息，幂等方法；
* HEAD:类似GET，但是服务器不发送BODY，用于获取HEAD元数据，幂等方法；
* POST：新增资源；常用于提交HTML form表单；
* PUT：更新资源，带条件时是幂等方法;
* DELETE:删除资源，幂等方法；
* CONNECT：建立tunnel隧道；
* OPTIONS：显示服务器对访问资源支持 的方法，幂等方法；（跨域）
    * 检测服务器性能
    * 获取服务器支持的的HTTP请求方法；
* TRACE：回显服务器收到的请求，用于定位问题。有安全风险；

* GET与POST区别？
    * 语义：GET获取资源，POST新增资源；
    * 缓存角度：GET请求会被浏览器主动缓存，保留历史记录，POST默认不会；
    * 编码角度：GET只能URI编号，只能接收ASCII字符。POST没有限制；
    * 幂等性：GET幂等的，POST不是幂等的；
    * 从TCP角度，GET请求会把请求报文一次性发出去，而POST会分为两个TCP数据包。首先发header部分，然后发body部分（获取浏览器除外）
        * post会比get多一个tcp包其实不太严谨。
        * 多发的那个expect 100 continue header报文，是由客户端对http的post和get的请求策略决定的，目的是为了避免浪费资源，如带宽，数据传输消耗的时间等等。
        * 客户端会在发送header的时候添加expect 100去探探路，如果失败了就不用继续发送data，从而减少了资源的浪费。
        * 所以`是否在发送一个包`取决了客户端的实现策略，和get/post并没什么关系。有的客户端比如fireFox就只发送一个包。
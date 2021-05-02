
#### 什么是安全？
通信过程中具备了四个特性，就认为是安全的。
* 机密性、完整性、身份认证、不可否认;
    * 机密性：加密；
    * 完整性:摘要算法
    * 数字签名：
        * 私钥+摘要算法 -- 身份认证和不可否认
        * 过程:
            * 签名过程：摘要算法对原文--指纹,私钥加密；
            * 签名认证：使用公钥解密-- 获取指纹信息;
            对原文使用摘要算法获取指纹信息，对比解密后的指纹信息，查看是否一致；
    * 数字证书和CA(证书认证机构)
    Root CA(自签名证书，根证书),操作系统和浏览器都内置了各大 CA 的根证书，上网的时候只要服务器发过来它的证书，就可以`验证证书里的签名`，顺着证书链（Certificate Chain）一层层地验证，直到找到根证书，就能够确定证书是可信的，从而里面的公钥也是可信的.
    * 证书体系的弱点
        * 如果 CA 失误或者被欺骗，签发了错误的证书，虽然证书是真的，可它代表的网站却是假的。
    * CA 被黑客攻陷，或者 CA 有恶意，因为它（即根证书）是信任的源头，整个信任链里的所有证书也就都不可信了。
    * 解决办法：
        1. CRL（证书吊销列表，Certificate revocation list）和 OCSP（在线证书状态协议，Online Certificate Status Protocol），及时废止有问题的证书。
        2. 只能能操作系统或者浏览器从根上“下狠手”了，`撤销对 CA 的信任`，`列入“黑名单”`，这样它颁发的所有证书就都会被认为是不安全的。
        3. 作为信任链的源头 CA 有时也会不可信，解决办法有 CRL、OCSP，还有终止信任。

##### TLS
* TLS协议的组成：
    1. 记录协议
    2. 握手协议
    3. 警告协议
    4. 变更密码规范协议（告诉对方，后续的数据都将使用加密保护。那么反过来，在它之前，数据都是明文的。）
    5. 扩展协议


* 密码套件命名规范 (ECDHE-RSA-AES256-GCM-SHA384)
    * 密钥交换算法+签名算法+对称加密算法+摘要算法
    * 握手时使用ECDHE算法进行密钥交换，用RSA签名和身份认证，握手后使用AES对称算法，密钥长度256，分组模式GCM，`摘要算法`SAHA384进行消息认证和产生随机数；

##### ECDHE
ECDHE = ephemeral Elliptic Cure Diffie-Hellman，“短暂-椭圆曲线-迪菲-赫尔曼” 算法。
公式： `A = G ^ a % P`;
* 已知a时，可以推算出A；反之，当已知A时，却几乎无法推算出a。
* 映射到加密算法中，a为私钥，A为公钥。
* 不论RSA还是ECDHE，最终计算主密钥的公式都是相同的：
    client random + server random + pre-master = master secret
    前两个随机数完全明文，保密的关键在于 pre-master。


* TLS1.2握手过程：ECDHE
1. 客户端发送 client hello 
client random 
TLS Version
密码套件列表
2. 服务器接收到 发送 server hello
server random
TLS version 确认
密码套件列表(选择了一个密码套件列表)
3. server certificate (服务器端证书验证)
（RSA公钥）使用CA证书的私钥加密+ 摘要算法
4. server key exchange  -- server params
ECDHE 公钥
5. Server Hello Done
签名认证(RSA的签名认证 + 摘要算法和RSA私钥加密)
6. 证书验证 --获取RSA公钥
 证书链 验证证书  获取证书公钥 解密签名->获取原文 原文+CA摘要算法-> 签名 对比两次签名
7. client key exchange --clinet params
CEDHE 公钥
使用 RSA公钥加密这个 ECDHE的公钥 发送给服务器端
8. 再通过ECDHE 算法 server parmas 、clinet params --计算出 随机pre-master
7. 共享  clinet random + server random +pre-Master == 主会话密钥
8. 客户端发送 change  cipher spec 、finshed
9. 服务器发送 change  cipher spec 、finshed




#### ECDHE为什么比RSA更适合做密钥交换？

#### RSA
服务端RSA生成密钥对（私钥自己保管），向客户端发送公钥,客服端随机生成"Pre-Master",再通过服务端的公钥加密，通过"Client key Exchange“发送给服务器，服务器通过私钥解密，获取"Pre-Master";实现了共享三个随机数，就可以生成主密钥。
ECDHE 通过 ECDHE计算得出的"Pre-Master";


##### TLS 1.3 使用扩展协议
1. 伪随机数函数由 `PRF` 升级为` HKDF`（HMAC-based Extract-and-Expand Key Derivation Function）；
2. 明确禁止在记录协议里使用压缩；
3. 废除了 RC4、DES 对称加密算法；
4. 废除了 ECB、CBC 等传统分组模式；
5. 废除了 MD5、SHA1、SHA-224 摘要算法；
6. 废除了 RSA、DH 密钥交换算法和许多命名曲线。

TLS1.3 里只保留了
1.  AES、ChaCha20 对称加密算法，分组模式只能用 AEAD 的 GCM、CCM 和 Poly1305，
2. 摘要算法只能用 SHA256、SHA384
3. 密钥交换算法只有 ECDHE 和 DHE，椭圆曲线也被“砍”到只剩 P-256 和 x25519 等 5 种。
4. 算法精简后带来了一个意料之中的好处：原来众多的算法、参数组合导致密码套件非常复杂，难以选择，而现在的 `TLS1.3 里只有 5 个套件`，无论是客户端还是服务器都不会再犯“选择困难症”了。

HTTPS 建立连接时除了要做 TCP 握手，还要做 TLS 握手，`在 1.2 中会多花两个消息往返（2-RTT）`，可能导致几十毫秒甚至上百毫秒的延迟，在移动网络中延迟还会更严重。现在因为密码套件大幅度简化，也就没有必要再像以前那样走复杂的协商流程了。`TLS1.3 压缩了以前的“Hello”协商过程`，`删除了“Key Exchange”消息`，把握手时间`减少到了“1-RTT”`，效率提高了一倍。
具体的做法还是利用了`扩展`,
1. “supported_groups”带上支持的曲线，比如 P-256、x25519;
2. 用“key_share”带上曲线对应的客户端公钥参数;
3. “signature_algorithms”带上签名算法


握手过程：
1. Client Hello”里的扩展，“supported_versions”表示这是 TLS1.3，“supported_groups”是支持的曲线，“key_share”是曲线对应的参数。
2. 服务器收到“Client Hello”同样返回“Server Hello”消息，还是要给出一个随机数（Server Random）和选定密码套件。表面上看和 TLS1.2 是一样的，重点是后面的扩展。“supported_versions”里确认使用的是 TLS1.3，然后在“key_share”扩展带上曲线和对应的公钥参数。

3. 这时只交换了两条消息，客户端和服务器就拿到了四个共享信息：`Client Random 和 Server Random、Client Params 和 Server Params`，两边就可以各自用 `ECDHE 算出“Pre-Master”`，再用 HKDF 生成主密钥“Master Secret”，效率比 TLS1.2 提高了一大截。
4. 在算出主密钥后，服务器立刻发出`“Change Cipher Spec”`消息，比 TLS1.2 提早`进入加密通信`，后面的证书等就都是加密的了，`减少了握手时`的`明文信息泄露`。
5. 这里 TLS1.3 还有一个安全强化措施，多了个“Certificate Verify”消息，用服务器的私钥把前面的曲线、套件、参数等握手数据加了签名，作用和“Finished”消息差不多。但由于是私钥签名，所以强化了身份认证和和防窜改。
6. 这两个“Hello”消息之后，客户端验证服务器证书，再发“Finished”消息，就正式完成了握手，开始收发 HTTP 报文。


问题:
TLS1.3 里的密码套件没有指定密钥交换算法和签名算法，那么在握手的时候会不会有问题呢？
1、TLS1.3精简了加密算法，通过support_groups、key_share、signature_algorithms这些参数就能判断出密钥交换算法和签名算法，不用在cipher suite中协商了
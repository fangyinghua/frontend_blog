### js数字丢失 精度的原因
1. 计算机的 `二进制实现` 和 `位数限制` 有些数无法有限表示。 就像无理数 不能有限表示。
2. js遵循IEEE 754 规范 采用双精度 存储，占用 64 bit；

* 1 位 表示 符号位；
* 11位表示 指数；
* 52 位表示 尾数；

* 大整数的精度丢失和浮点数本质上是一样的，尾数位最大是 52 位。

3. 解决方案
如果比较是否相等

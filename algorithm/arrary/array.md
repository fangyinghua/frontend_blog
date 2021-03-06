# 数组

* 什么是数组？
    数组是一种`线性数据结构`，它用一组连续的内存空间，来存储`一组`具有`相同类型的数据`。数据之间是前后方向关系。

* 数据结构分类
    * 线性表(Linear List)：数据排成一条线一样的结构。每个线性表上的数据`最多只有前后`两个方向。
    * 非线性表：数据之间并不是简单的前后关系。

* 为什么数组要`从0开始`编号？
    `连续的内存空间`和`相同类型的数据`，才导致数组有个杀手锏特性：“随机访问”。
    计算机会给 `每个内存单元分配一个地址`，计算机`通过地址`来`访问内存中的数据`。
    内存块首地址：bese_address。


* 寻址公式：

    1. 一维数组寻址公式：`a[i]_address=base_address + i * data_type_size`;
    2. `data_type_size`：表示数组中`每个元素的大小`;
    3. 对于 `m * n 的数组`, `a [ i ][ j ] (i < m,j < n)的地址`为;
    二维数组的寻址公式：`address = base_address + ( i * n + j) * type_size`;
    
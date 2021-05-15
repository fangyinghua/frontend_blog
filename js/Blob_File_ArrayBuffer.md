
# File文件
1. 常用属性：
name：只读
size：只读
type：只读


2. Blob
*  不可变、原始数据的类文件对象;
*  数据可以是 `文本或二进制的格式` 进行读取;
*  可以转换为`ReadableStream` 类用于数据操作;

File接口基于Blob，继承了blob的功能 并将其扩展 使其支持用户系统上的文件

* 属性：
    1. size （字节大小）
    2. type：MIME类型

* 方法：
    1. Blob.slice([start[, end[, contentType]]])
    返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
    2. Blob.stream()
    返回一个能读取blob内容的 ReadableStream。
    3. Blob.text()
    返回一个promise且包含blob所有内容的UTF-8格式的 USVString。
    4. Blob.arrayBuffer()
    返回一个promise且包含blob所有内容的二进制格式的 ArrayBuffer 


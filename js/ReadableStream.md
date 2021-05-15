# 
1. 语法
`var readableStream = new ReadableStream(underlyingSource[, queueingStrategy]);`

underlyingSource
* start(controller)
* pull(controller) 
* cancel(reason)
* type
* autoAllocateChunkSize 
    对于字节流，开发人员可以使用正整数值设置autoAllocateChunkSize 以打开流的自动分配功能。
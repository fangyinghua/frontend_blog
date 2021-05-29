### Node.js组成和原理

1. Node.js简介
    * Node.js是`基于事件驱动`的`单进程单线程应用`，单线程具体 体现`在Node.js在单个线程中维护了一系列任务`，然后再`事件循环`中`不断消费任务队列中的节点`，又`不断产生新的任务`，在任务的产生中 消费中 `不断驱动着Node.js的执行`。
    * Node.js底层维护了`一个线程池`，该`线程池`主要用于处理一些 `文件IO、DNS、CPU计等`任务。
    * Node.js主要由`V8、Libuv、第三方模块`(cares异步DNS解析库、HTTP解析器、HTTP2解析器、压缩率、加解密库)组成。

2. js引擎V8
    * Node.js利用V8提供的能力，极大地扩展了js的能力（扩展模块功能）。
    * V8不仅 负责 `执行J`S，还支持`自定义的拓展`，实现了`js调用C++和C++调用js的能力`。node.js利用了这个能力`完成了功能的扩展`。

3. Libuv
`Libuv`是 node.js `底层的异步IO库`，抹平各个操作系统之间的差异。 提供的功能：`IO、进程、线程、信号、定时器、进程间通信`。

* Libuv提供的功能：
    * Full-feacture event loop backed by epoll，kqueue，IOCP，envent ports `(由epoll、kqueue、IOCP和envent端口支持的完整feacture事件循环)`。 
    * Asynchronous TCP and UDP sockets `(异步TCP和UDP套接字)`
    * Asynchronous DNS resolution `(异步DNS解析)`
    * Asynchronous file and file system operations `(异步文件和文件系统操作)`
    * File system events `(文件系统事件)`
    * ANSI escape code controlled TTY `(ANSI转义码控制TTY)`
    * IPC with socket sharing, using Unix domain sockets or named pipes (Windows) `(IPC与套接字共享，使用Unix域套接字或命名管道（Windows）)`
    * Child processes `(子进程)`
    * Thread pool `(线程池)`
    * Signal handling `(信号处理)`
    * High resolution clock `(高分辨率时钟)`
    * Threading and synchronization primitives `(线程和同步原)`

* 其他 Libuv的实现是一个经典的生产者-消费者模型。Libuv是在整个生命周期中，`每一轮循环`都会处理`每个阶段维护的任务队列`，然后逐个执行任务队列中 节点的回调,在回调中不断的产生新的任务，从而不断驱动 Libuv。
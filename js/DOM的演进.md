# DOM的演进
DOM1（DOM Level 1）主要定义了 HTML 和 XML 文档的底层结构。
DOM2（DOM Level 2）和 DOM3（DOM Level 3）在这些结构之上加入更多交互能力，提供了更高级的 XML 特性。
DOM2 和 DOM3 是`按照模块化的思路`来制定标准的，每个模块之间有一定关联，但分别针对某个 DOM 子集。

DOM Core：在 DOM1 核心部分的基础上，`为节点增加方法和属性`。
DOM Views：定义基于`样式信息的不同视图`。
DOM Events：定义`通过事件实现 DOM 文档交互`。
DOM Style：定义以编程方式访问和修改 CSS 样式的接口。

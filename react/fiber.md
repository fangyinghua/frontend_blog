
React Fiber:
* Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。了解更多.

* React 的渲染机制 -- Reconciliation 过程（协调）

React 采用的是虚拟 DOM (即 VDOM )，每次属性 (props) 和状态 (state) 发生变化的时候，render 函数返回不同的元素树，React 会检测当前返回的元素树和上次渲染的元素树之前的差异，然后针对差异的地方进行更新操作，最后渲染为真实 DOM，这就是整个 Reconciliation 过程，其核心就是进行新旧 DOM 树对比的 diff 算法。

* 减少 diff 的过程
    * class组件：
        * 利用 shouldComponentUpdate 这个生命周期函数；
        * 默认的 shouldComponentUpdate 会在 props 或 state 发生变化时返回 true, 表示组件会重新渲染，从而调用 render 函数，进行新旧 DOM 树的 diff 比对。
        * 通过 shouldComponentUpdate 控制是否发生 VDOM 树的 diff 过程。

    * 函数式组件
        * React 为函数组件提供了一个 memo 方法，它和 PureComponent 在数据比对上唯一的区别就在于 只进行了`props 的浅比较`.

* React 虚拟 DOM 的 Diff 原理全解析
    * 三个设计思想：
        * 永远只比较同层节点；
        * 不同的两个节点产生不同的树；
        * 通过key值 指定那些元素是相同的；
    * 遍历子节点列表的情况

* PureComponent 浅比较
    * 基础数据类型 直接 ===比较 处理了 +0 -0 NaN
    * 有一个不是对象 return false;
    * 对象 key.length 是否相等
    * 比较两种的 属性/值 是否相等
    * 属性的值为引用类型的时候浅比较就失灵

* shouldComponentUpdate  深度比较( 属性和值进行递归比较)

* immutable 数据结构 

    * immutable 数据一种`利用结构共享`形成的持久化数据结构，一旦有部分被修改，那么将会返回一个全新的对象，并且原来相同的节点会直接共享。
    * immutable 对象数据内部采用是`多叉树的结构`，凡是`有节点被改变`，那么它和`与它相关的所有上级节点都更新`。
    * 采用 immutable 既能够`最大效率地更新数据结构`，又能够和现有的 PureComponent (memo) 顺利对接，感知到状态的变化，是提高 React 渲染性能的极佳方案。
    *  immutable 对象和 JS 对象要注意转换，不能混用.

* 项目中涉及的 immutable 方法
    * 1. fromJS  -- 将 JS 对象转换为 immutable 对象。
    * 2. toJS  -- 将 immutable 对象转换为 JS 对象。
    * 3. get/getIn -- 获取 immutable 对象属性
    * 4. set -- 对 immutable 对象的属性赋值
    * 5. merge  -- 新数据与旧数据对比，旧数据中不存在的属性直接添加，旧数据中已存在的属性用新数据中的覆盖。
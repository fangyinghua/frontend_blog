
* react diff时间复杂度 O(N)

* key作用标识唯一性。

* 1.  两个元素协调： 当前元素是否可以复用(key 和 type)；

```js
// 协调元素：

reconcileSinleElement

// 比较 key，然后比较type值
if(child.key===key){
    switch(child.tag){
        case Fragment:{
            if(element.type === react_fragment_type){
                //在当前fiber上 复用
            }
        }
    }
}

```
* 2. fiber 都是链表，没有数组 （两个都是数组，如何对比）

更新节点 element节点

* 3. fiber--链表 根据当前fiber获取子元素只能获取第一个，获取其他子元素child.slibing 方式获取；
* 元素是数组 进行diff的时候，取值是不方便的。 {key，value：filber}，将链表结构转换为map结构。


* react的key作用： -- 复用 --更新阶段才会用到的

    1. 和type一起标识 同级元素 当前节点的唯一性；
    2. 根据当前fiber获取子元素，只能获取第一子元素。（子元素为 数组 diff 不方便） 



* react 执行阶段 
render阶段：给每个fiber 打副作用标签

commit阶段：根据标签更新dom节点

* 单个fiber
    * 构建hook链表
    * 




* react面试题目
    * 为什么不能在条件和循环里使用hooks
    * 为什么不能在函数组件外部 使用hooks
    * react hooks的状态保存在哪里？
    * 为什么传入相同的状态，函数组件不更新？
    * 函数组件的useState与setState有什么区别？

    

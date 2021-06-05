
### 🌹 什么是Drag和Drop？

* Drag:拖放/拖拽;
* Drop:放置/放下;

* web页面中，选择文本/图像/链接默认是可拖拽的；
* Drag/Drop是html5新增的拖放接口，提供了一套可以在页面中拖放元素的功能，通过该功能，用户可以通过鼠标来拖动（可拖动）元素，并可以通过释放鼠标来放置这些元素到元素上。

* ⚠️ 注：默认情况下，除了选中文本/图像/链接其他元素都是不可拖动的。

### 🎆 拖放流程：
* 一个完整的拖放流程包含两个大的方面：
    * 拖拽
    * 放置

* 🌟拖拽
    * 设置拖拽属性
    * 监听处理拖拽事件
    * 设置拖放数据

* 🌟放置
    * 设置（开启）元素放置特性
    * 监听处理 拖拽与放置 事件
    * 处理放置数据 或 后续行为

* 🧡 流程
    1. 设置拖放属性`draggbale` 为 `true`;
    🌹 ⚠️：这个`draggable="true"`一定要为`true`;
    * 🏁 ⚠️注意事项：
    * 给默认可以拖拽的元素，设置draggable为false，就可以阻止它们拖拽
    * firefox：如果拖拽的元素没有设置拖放内容，还是不能拖放
        - draggbale=true
        - 设置拖放内容
        ```js
        let box1=document.querySelector('#box1');
        box1.ondragstart=function(e){
            e.dataTransfer.set('text','ddd');//设置拖放内容
        }
        ```

### ⌚️拖放事件
* 🧡 拖放事件分类：
    * 基于拖拽元素的事件
    * 基于放置元素的事件

|  事件名称   | 描述  | 事件源  |
|  ----  | ----  | ----  |
| dragstart  | 当用户开始拖动一个元素或选中的文本时触发 |被拖动的元素|
| drag  | 当拖动元素或选中当文本时触发（每100毫秒触发一次） |被拖动的元素|
| dragend  | 当拖拽操作结束时触发（比如：按‘Esc’键 /松开鼠标按键） | 被拖动的元素|
| dragenter  | 当拖动元素或选中的当文本到一个可释放目标时触发  | 可放置的元素|
| dragover  | 当元素或者选中的文本被拖到一个可释放目标上时触发（每100毫秒触发一次）  | 可放置的元素|
| dragleave  | 当拖动元素或选中的文本离开一个可释放目标时触发 | 可放置的元素|
| drop  | 当元素或选中的文本在可释放目标上被释放时触发 |可放置的元素|

* 默认行为
    * 一些动作（事件）会有一些默认的行为，比如：drag
    * 常见一些默认行为（需先了解下面的拖放数据-拖放内容）
        * 不是所有元素都可以作为放置元素的，但是可以通过 在放置元素的 ondragover中 阻止默认行为 来使其可以成为`放置元素`。
        ```js
        /** box2放置元素
         * 默认情况下，不是所有元素都可以成为放置元素的
         需要在dargover事件中阻止默认行为：✨不允许放置
         */
        box2.ondragover=function(e){
            //该事件每次触发的时候 都会重置默认行为

            e.preventDefault();//通过阻止默认行为 似的box2为放置元素 -- 触发 drop事件
        }

        box2.ondrop=functon(e){
            //当drop事件触发的时候，还会有其他的默认行为
             e.preventDefault();
             e.stopPropagation();
        }
        ```

### ✨ 拖放数据
我们把拖放过程中的效果 和 拖放产生的内容都被称为 `拖放数据`，要对拖放数据进行操作，首先我们得先了解一个对象：`DataTransfer`；

* DataTransfer
所有的`拖放事件的Event对象`都有一个 dataTransfer属性，我们可以通过它来`设置和获取` 拖放过程中的数据。 dataTransfer 属性的值是一个DataTransfer类型的对象。

* 拖放内容
    * 设置拖放内容
        DataTransfer.setData(type,data)
    * 获取拖放内容
        DataTransfer.getData(type);
    * DataTransfer.clearData([type]);





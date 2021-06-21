### DOM

1. 主要学习内容
    * 理解文档对象模型的构成(DOM)
    * 节点类型
    * 浏览器兼容性
    * MutationObserver 接口

`文档对象模型`是 HTML和XML文档的`编程接口`。DOM 表示由多层节点构成的文档，通过它开发者可以添加、删除和修改页面的各个部分。

`DOM Level 1` 在 1998 年成为 W3C 推荐标准，提供了`基本文档结构和查询的接口`。

* 任何 HTML 或 XML 文档都可以用 DOM 表示为一个`由节点构成的层级结构`。
* document 节点表示`每个文档的根节点`。根节点的唯一子节点是`<html>元素`，我们称之为`文档元素（documentElement）`。
* 文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。每个文档只能有一个文档元素。
* 在 HTML 页面中，文档元素始终是<html>元素。在 XML 文档中，则没有这样预定义的元素，任何元素都可能成为文档元素。
* HTML 中的每段标记都可以表示为这个树形结构中的一个节点。`元素节点表示 HTML 元素`，`属性节点表示属性`，`文档类型节点表示文档类型`，`注释节点表示注释`。`DOM 中总共有 12 种节点类型`，这些类型都继承一种基本类型.


###### Node 类型
* 在 JavaScript中，所有节点类型都 `继承 Node 类型`，因此所有类型都共享相同的 `基本属性和方法`。
* 每个节点都有`nodeType属性`，表示该节点的类型。节点类型由定义在 Node 类型上的 `12 个数值常量`表示：
    * Node.ELEMENT_NODE(1) element_node
    * Node.ATTRIBUTE_NODE(2) attribute_node
    * Node.TEXT_NODE (3) 
    * Node.CDATA_SECTION_NODE (4) -- cdata_section_node
    * Node.ENTITY_REFERENCE_NODE(5) -- entity_reference_node
    * Node.ENTITY_NODE(6) -- entity_node 
    * Node.PROCESSING_INSTRUCTION_NODE(7)  -- processing_instruction_node -- 处理指令节点
    * Node.COMMENT_NODE (8) -- 注释节点
    * Node.NOTATION_NODE(12)

* 浏览器并不支持所有节点类型。开发者最常用到的是`元素节点和文本节点`。

* Node属性：

    1. nodeName 与 nodeValue
        * `nodeName 与 nodeValue 保存着有关节点的信息`。这两个属性的值`完全取决于节点类型`。
        * 在使用前，检查节点类型；
        ```html
       
         <div id="app">
            <p>TEST</p>
        </div>

        <script>
        const app=document.getElementById('app');
        console.log(app.nodeType);//1
        console.log(app.nodeValue);//null
        console.log(app.nodeName);//DIV
        </script>
        ```

    2. 节点关系
        * 文档中的所有节点都与其他节点有关系。这些关系可以形容为家族关系，相当于把文档树比作家谱。
        * 每个节点都有一个`childNodes属性`，其中包含一个`NodeList的实例`。`NodeList` 是一个`类数组对象`，用于存储可以`按位置存取`的`有序节点`。
        * NodeList 并不是 Array 的实例，但可以使用`中括号`访问它的值，而且它也有 length 属性。
        * 其实是一个对 DOM 结构的查询，因此 DOM 结构的变化会自动地在 NodeList 中反映出来。我们通常说 `NodeList 是实时的活动对象`，而不是第一次访问时所获得内容的快照。
        * 每个节点都有一个`parentNode属性`，指向其 DOM 树中的父元素。

        ```js
        console.log(app.childNodes);
       
        //[text,p,text] length:3 
        /*
        举例：text:
        比如有下面属性：
        data: "\n        "
        nodeType: 3
        nodeName: "#text"
        nextSibling: p
        length: 9
        nodeValue: "\n        "
        parentNode: div#app
        parentElement: div#app
        ownerDocument: document
        previousSibling: null
        */         
        ```

        * 获取子节点方法
        ```js
        app.childNodes[0];
          app.childNodes.item(0);
        ```
    3. 关系节点属性
    * `parentNode` 属性指向其 DOM 树中的父元素。 / * `firstChild`和 `lastChild`分别指向 childNodes 中的第一个和最后一个子节点;
    * `previousSibling` 和 `nextSibling` 指向节点相同层级的上一个兄弟节点和下一个兄弟节点；
    * 如果childNodes中只有一个节点，则它的previousSibling和nextSibling属性都是 null。
    * `hasChildNodes()`，这个方法`如果返回 true` 则说明节点有一个或多个子节点。相`比查询 childNodes 的 length 属性`，这个方法无疑更方便。
    ```js
    app.hasChildNodes();//true
    ```
    * 所有节点都共享的关系,`ownerDocument 属性`是一个指向代`表整个文档的文档节点 的指针`。可以把ownerDocument 当作根节点。一个节点不可能同时存在于两个或者多个文档中。

    * ✨ 以上属性都是只读属性，所有关系指针都是只读的；

    4. 操纵节点
        1. appendChild()，用于在 childNodes 列表末尾添加节点。一个节点也不会在文档中同时出现在两个或更多个地方。
        2. insertBefore()方法，把节点放到 childNodes 中的特定位置 -- 两个参数:要插入的节点和参照节点 --如果参照节点是 null，则 insertBefore()与 appendChild()效果相同.

        ```js
        // 作为最后一个子节点插入
        returnedNode = someNode.insertBefore(newNode, null);

        // 作为新的第一个子节点插入
        returnedNode = someNode.insertBefore(newNode, someNode.firstChild);

        // 插入最后一个子节点前面
        returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
        ```
        3. replaceChild()方法接收两个参数:要插入的节点和要替换的节点。要替换的节点会被返回并从文档树中完全移除，要插入的节点会取而代之。下面看一个
        * 例子:
        ```js
        let returnedNode = someNode.replaceChild(newNode, someNode.firstChild);
        ```
        4. removeChild()方法 要移除节点而不是替换节点
    * 以上四个方法需要 在父节点上操作。


    4. 其他方法
    * 所有节点类型还共享了两个方法。 
        * 第一个是 `cloneNode()`，会返回与调用它的节点一模一样的节 点。cloneNode()方法接收一个布尔值参数，表示是否深复制。在传入 true 参数时，会进行深复制， 即复制节点及其整个子 DOM 树。如果传入 `false，则只会复制调用该方法的节点`。
            * 复制返回的节点属 于文档所有，但尚未指定父节点，所以可称为孤儿节点(orphan)。
            * 可以通过 appendChild()、 insertBefore()或 replaceChild()方法把孤儿节点添加到文档中。
            * cloneNode()方法不会复制添加到 DOM 节点的 JavaScript 属性，比如事件处理程 序。这个方法`只复制 HTML 属性`，以`及可选地复制子节点`。除此之外则一概不会复制。
            * IE 在很长时间内会复制事件处理程序，这是一个 bug，所以推荐在复制前先删除事件处 理程序。
        * normalize()
        任务就是处理文档子树中的文本节点。由于解析器实现的差异或 DOM 操作等原因，可能会出现并不包含文本的文本节点，或者文本节点之间互为同胞关系。在节点上调用 normalize()方法会检测这个节点的所有后代，从中搜索上述两种 情形。如果发现空文本节点，则将其删除;如果两个同胞节点是相邻的，则将其合并为一个文本节点。



###### Document类型
# 链表

* 基本概念：

    1. 虚拟节点：

        * 定义：数据结构中，在链表的第一个结点之前附设一个结点。虚拟结点的数据域可以不存储任何信息，虚拟结点的指针域存储指向第一个结点的指针;
        * 作用：对链表进行增删时统一算法逻辑，减少边界处理（`避免了判断是否是空表`或者是`增删的节点是否为第一个节点`）;

    2. 尾节点

        * 定义：数据结构中，尾结点是指链表中最后一个节点，即存储最后一个元素的节点。
        * 作用：由于移动到链表末尾需要线性的时间，因此在链表末尾插入元素会很耗时， 增加尾节点便于`在链表末尾以 O(1)O(1) 的时间插入元素`;

    3. 静态链表

        * 定义：用`数组描述的链表`，它的`内存空间是连续的`，称为`静态链表`。相对地，`动态链表`因为`是动态申请内存的`，所以每个节点的物理地址可以不连续，要通过指针来顺序访问;
        * 作用：既可以像数组一样在 O(1O(1 的时间对访问任意元素，又可以像链表一样在 O(1)的时间对节点进行增删;

* 链表分类
    * 按照是否循环分为：循环链表 `(linked list cycle)` 和非循环链表 `(linked list)`

        * 需要`在遍历到尾部`之后 重新开始 遍历的时候，可以考虑`使用循环链表`.

        * 需要注意的是，如果`链表长度始终不变`，那么`使用循环链表很容易造成死循环`，因此`循环链表`经常会伴随着`节点的删除操作`，比如`约瑟夫环问题`。

    * 按照指针个数分为：单链表和双链表
        * 单链表: 每个节点包括两部分：一个是存储数据的数据域，另一个是存储下一个节点指针的指针域。
        * 双向链表: 每个节点包括三部分：一个是存储数据的数据域，一个是存储下一个节点指针的指针域，一个是存储上一个节点指针的指针域。(好处在于删除和插入的时候，可以更快地找到前驱指针,`双向链表`的本质就是`空间换时间`.)
* 链表的基本操作
    * 插入
    * 删除
    * 遍历

* 解题方法
    * 迭代方法
    * 递归方法  -- 明确`递归函数`的定义

* 链表节点结构
```js
function ListNode(val){
    this.val=val;
    this.next=null;
}
```

* 常见题目
    * 反转链表
    * 

    * 反转链表
        * 解法一：迭代法 -- 循环
        ```js
        /**
        * Definition for singly-linked list.
        * function ListNode(val) {
        *     this.val = val;
        *     this.next = null;
        * }
        */
        /**
        * @param {ListNode} head
        * @return {ListNode}
        */
        var reverseList = function(head) {

            //迭代
            let cur=head;
            let pre=null;

            while(cur){
                const next=cur.next;
                cur.next=pre;
                pre=cur;
                cur=next;
            }
            return pre;
        };
        ```
        
        * 解法二： 递归方法  
        ```js
        /**
        * @param {ListNode} head
        * @return {ListNode}

            输入一个节点 head，将以head为起点 的链表反转
            并返回反转后的 头节点 
        */
        
        var reverseList = function(head) {
        if(head===null || head.next===null){
            return head;
        }
        const last=reverseList(head.next)
            head.next.next=head;
            head.next=null;
            return last;
        };
        ```


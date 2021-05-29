### 反转链表

1. [整条链表反转](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)
```js
// 递归
function reverse(head){
    if(head===null || head.next===null){
        return head;
    }
    let nextHead=reverse(head.next);
    head.next.next=head;
    head.next=null;
    return nextHead;
}
```

2. [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)
```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(head===null || head.next===null)return head;
    let newNext=head.next;
    head.next=swapPairs(newNext.next);
    newNext.next=head;
   return newNext;
}
```

3. [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
```js

```

### 合并
* [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

* [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
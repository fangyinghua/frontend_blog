## 链表常见题目


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
/** 递归
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

/** 迭代
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
   let dump=new ListNode(0);
   dump.next=head;
   let cur=dump;
   while(cur.next && cur.next.next){
        let node1=cur.next;
        let node2=cur.next.next;
        cur.next=node2;
        node1.next=node2.next;
        node2.next=node1;
        cur=node1;
   }
   return dump.next;
}
```
* 这题目的迭代我是看官方题解图才理解的。

3. [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
   if(head===null) return head;
   let a=b=head;
   for(let i=0;i<k;++i){
    if(b===null)return head;
     b=b.next;
   }
    let newHead=reverse(a,b);
    a.next=reverseKGroup(b,k);
    return newHead;
};

var reverse=function(a,b){
  let pre,cur,nxt;
  pre=null,cur=a;nxt=a;
  while(cur!=b){
        nxt=cur.next;
        cur.next=pre;
        pre=cur;
        cur=nxt;
  }
  return pre;
}
```

### 合并
* [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

* [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
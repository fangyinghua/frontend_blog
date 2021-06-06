## 链表常见题目

### 反转链表

1. [整条链表反转](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

```js
// 递归
function reverse(head) {
  if (head === null || head.next === null) {
    return head;
  }
  let nextHead = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return nextHead;
}
```

2. [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

```js
/** 递归
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head === null || head.next === null) return head;
  let newNext = head.next;
  head.next = swapPairs(newNext.next);
  newNext.next = head;
  return newNext;
};

/** 迭代
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let dump = new ListNode(0);
  dump.next = head;
  let cur = dump;
  while (cur.next && cur.next.next) {
    let node1 = cur.next;
    let node2 = cur.next.next;
    cur.next = node2;
    node1.next = node2.next;
    node2.next = node1;
    cur = node1;
  }
  return dump.next;
};
```

- 这题目的迭代我是看官方题解图才理解的。

3. [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) return head;
  let a = (b = head);
  for (let i = 0; i < k; ++i) {
    if (b === null) return head;
    b = b.next;
  }
  let newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};

var reverse = function (a, b) {
  let pre, cur, nxt;
  (pre = null), (cur = a);
  nxt = a;
  while (cur != b) {
    nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
};
```

### 判断链表是不是回文

- 寻找回文串的核心思想 是 `从中心` 向 两端扩展; -- 回文串是对称的
- [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

```js
//方法一： 模拟双指针 -- 后序遍历
let left;
var isPalindrome = function (head) {
  left = head;
  return traverse(head);
};

function traverse(right) {
  if (right === null) return true;
  res = traverse(right);
  res = res && left.val === right.val;
  left = left.next;
  return res;
}

//方法二：优化空间复杂度 利用快慢指针先找到链表的中点
```

### 指针相关的题目

1. [剑指 Offer 22. 链表中倒数第 k 个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let fast, slow;
  fast = head;
  slow = head;
  while (k--) {
    fast = fast.next;
  }
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
};
```

2. [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

```js
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let fast, slow;
  fast = slow = head;

  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
};
```

3. [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let fast, slow;
  fast = head;
  (slow = head), (hasCycle = false);
  while (fast != null && fast.next != null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      hasCycle = true;
      break;
    }
  }

  if (!hasCycle) {
    return null;
  }
  slow = head;
  while (slow != fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};
```

4. [109. 有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)

- 思想：通过`快慢指针`，获取链表的中点,然后通过`分治的思想`;

```js
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  return buildTree(head, null);
};

function getMid(left, right) {
  //查找链表的中点
  let fast, slow;
  slow = left;
  fast = left;
  while (fast != right && fast.next && fast.next != right) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}

function buildTree(left, right) {
  if (left === right) {
    return null;
  }
  let mid = getMid(left, right);
  let root = new TreeNode(mid.val);
  root.left = buildTree(left, mid);
  root.right = buildTree(mid.next, right);
  return root;
}
```

5. [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

```js
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let left, right;
  (left = headA), (right = headB);

  while (left != right) {
    if (left) {
      left = left.next;
    } else {
      left = headB;
    }

    if (right) {
      right = right.next;
    } else {
      right = headA;
    }
  }
  return left;
};
```

6. [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let fast = head,
    slow = head,
    i = 0,
    res = new ListNode(0);
  res.next = head;
  pre = res;
  while (i < n && fast) {
    i++;
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
    pre = pre.next;
  }
  pre.next = pre.next.next;
  return res.next;
};
```

### 缓存淘汰策略

- LRU(Least Recently Used)

  - 思路：维护一个有序的链表，越靠近链表的尾部的节点越早之前访问的。

  1. 如果此数据之前已经被缓存在链表中，我们遍历得到的这个数据对应的节点，将其从原来的位置删除，然后再插入到链表的头部；
  2. 如果此数据没有在缓存链表中，又分为两种情况：

  - . 如果此缓存未满，则将此节点直接插入到链表的头部；
  - . 如果此缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

引入`散列表`（hash table）来记录每个数据的位置，将缓存访问的时间复杂度降到 O(1). [链表比数组更适合插入/删除操作频繁的场景]

```js
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.capacity = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;
  const v = this.cache.get(key);
  this.cache.delete(key);
  this.cache.set(key, v);
  return this.cache.get(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
  }
  this.cache.set(key, value);

  if (this.cache.size > this.capacity) {
    this.cache.delete(this.cache.keys().next().value); //删除最前面的元素
  }
};
```

- 其他
  2.2 First in first out (FIFO);
  2.3 Last in first out (LIFO) or First in last out (FILO);
  2.4 Least recently used (LRU);
  2.5 Time aware least recently used (TLRU);
  2.6 Most recently used (MRU);
  2.7 Pseudo-LRU (PLRU);
  2.8 Random replacement (RR);
  2.9 Segmented LRU (SLRU);
  2.10 Least-frequently used (LFU);
  2.11 Least frequent recently used (LFRU);
  2.12 LFU with dynamic aging (LFUDA);
  2.13 Low inter-reference recency set (LIRS);
  2.14 CLOCK-Pro;
  2.15 Adaptive replacement cache (ARC);
  2.16 AdaptiveClimb (AC);
  2.17 Clock with adaptive replacement (CAR);
  2.18 Multi queue (MQ）;

### 合并

- [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)
- [23. 合并 K 个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

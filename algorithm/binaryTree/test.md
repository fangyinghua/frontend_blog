### 二叉树的习题

1. 计算一颗二叉树节点数

```js
count(root){
    if(root===null) return 0;
    //自己 加上 子树的节点数
    return 1+count(root.left)+count(root.rigth)
}
```

2. [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null;
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);
  return root;
};
```

3. [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

```js
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (root === null) return null;
  connectTwo(root.left, root.right);
  return root;
};

function connectTwo(n1, n2) {
  if (n1 === null || n2 === null) return;

  n1.next = n2;
  // 连接相同父节点的两个子节点
  connectTwo(n1.left, n1.right);
  connectTwo(n2.left, n2.right);

  // 连接跨越父节点的两个子节点
  connectTwo(n1.right, n2.left);
}
```

4. [114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

```js
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (root === null) return;
  flatten(root.left);
  flatten(root.right);

  /**** 后序遍历位置 ****/
  // 1、左右子树已经被拉平成一条链表
  let left = root.left,
    right = root.right;

  // 2、将左子树作为右子树
  root.left = null;
  root.right = left;

  // 3、将原先的右子树接到当前右子树的末端
  let p = root;
  while (p.right) {
    p = p.right; //查找当前树的右子树的末端
  }
  //将原先的右子树接到当前右子树的末端
  p.right = right;
};

//改版后
var flatten = function (root) {
  flatten2(root, null);
};

function flatten2(root, pre) {
  if (root === null) return pre;
  pre = flatten2(root.right, pre); //从右子树开始拉平
  pre = flatten2(root.left, pre); //通过pre将右子树和左子树拉平后的接入
  root.right = pre;
  root.left = null;
  pre = root;
  return pre;
}
```

### ✨ 构建类题目

- 🚀 思路：1. 找到根节点 ，然后构造根节点的左右子树

5. [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
  return build(nums, 0, nums.length - 1);
};

function build(nums, lo, hi) {
  if (lo > hi) {
    return null;
  }
  let index = -1,
    maxVal = Number.MIN_SAFE_INTEGER;

  //查找最大值 作为根节点
  for (let i = lo; i <= hi; ++i) {
    if (maxVal < nums[i]) {
      index = i;
      maxVal = nums[i];
    }
  }

  let root = new TreeNode(maxVal);

  //构建左右子树
  root.left = build(nums, lo, index - 1);
  root.right = build(nums, index + 1, hi);
  return root;
}
```

6. [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

```js
void traverse(TreeNode root) {
    // 前序遍历
    preorder.add(root.val);
    traverse(root.left);
    traverse(root.right);
}

void traverse(TreeNode root) {
    traverse(root.left);
    // 中序遍历
    inorder.add(root.val);
    traverse(root.right);
}
```

- 思路：

1. 寻找根节点，前序遍历的第一个节点就是根节点;
2. 构建根节点左右子树

```js
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  return build(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1
  );
};

function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {
  if (preStart > preEnd) return null;

  let rootVal = preorder[preStart]; //前序遍历的首节点为根节点
  let index = 0;
  for (let i = inStart; i <= inEnd; ++i) {
    if (inorder[i] === rootVal) {
      index = i;
      break;
    }
  }

  let root = new TreeNode(rootVal);
  let leftSize = index - inStart;

  //构建左右子树
  root.left = build(
    preorder,
    preStart + 1,
    preStart + leftSize,
    inorder,
    inStart,
    index - 1
  );
  root.right = build(
    preorder,
    preStart + leftSize + 1,
    preEnd,
    inorder,
    index + 1,
    inEnd
  );

  return root;
}
```

7. [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

```js
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  return build(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1
  );
};

function build(inorder, inStart, inEnd, postorder, posStart, posEnd) {
  if (inStart > inEnd) return null;

  const rootVal = postorder[posEnd];
  let index = 0;
  for (let i = inStart; i <= inEnd; ++i) {
    if (inorder[i] === rootVal) {
      index = i;
      break;
    }
  }

  let root = new TreeNode(rootVal);
  let leftSize = index - inStart;

  root.left = build(
    inorder,
    inStart,
    index - 1,
    postorder,
    posStart,
    posStart + leftSize - 1
  );
  root.right = build(
    inorder,
    index + 1,
    inEnd,
    postorder,
    posStart + leftSize,
    posEnd - 1
  );

  return root;
}
```

### ✨ 二叉树的序列化与反序列化

8. [652. 寻找重复的子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  let hasMap = new Map();
  let res = [];
  traverse(root, res, hasMap);
  return res;
};

//序列化二叉树
function traverse(root, res, hasMap) {
  if (root === null) return "#";
  const left = traverse(root.left, res, hasMap);
  const right = traverse(root.right, res, hasMap);
  let result = left + "," + right + "," + root.val;
  const count = hasMap.get(result);
  if (count === 1) {
    res.push(root);
  }
  hasMap.set(result, (count || 0) + 1);
  return result;
}
```

9. [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

```js
// 代表分隔符的字符
let SEP = ",";
// 代表 null 空指针的字符
let NULL = "#";

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  return serializeHandler(root, "");
};
function serializeHandler(root, str) {
  if (root === null) {
    return (str += NULL + SEP);
  }
  str += root.val + SEP;
  str = serializeHandler(root.left, str);
  str = serializeHandler(root.right, str);
  return str;
}
/**
 * Decodes your encoded data to tree. *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const datas = data.split(SEP);
  return deserializeHandler(datas);
};

function deserializeHandler(datas) {
  if (datas.length === 0 || datas === "") return null;
  const rootVal = datas.shift();
  if (rootVal === NULL) {
    return null;
  }
  if (rootVal === "") return null;
  const root = new TreeNode(Number(rootVal));
  root.left = deserializeHandler(datas);
  root.right = deserializeHandler(datas);
  return root;
}
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
```

10. [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

```js
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 * 方法二：
 */
var isSameTree = function (p, q) {
  //序列化两棵树 再比较
  const re1 = serialize(p, "");
  const re2 = serialize(q, "");
  if (re1 === re2) return true;
  return false;
};

function serialize(p, str) {
  if (p === null) {
    return (str += "#,");
  }
  str += p.val + ",";

  str = serialize(p.left, str);
  str = serialize(p.right, str);
  return str;
}

//方法二：
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null && q === null) return true;
  return (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};
```

11. [513. 找树左下角的值](https://leetcode-cn.com/problems/find-bottom-left-tree-value/)

```js
//BFS
var findBottomLeftValue = function (root) {
  //bfs:
  let arr = [root],
    res;
  // let visited=new Set(root); --图需要 一个set 记录那些节点被访问过

  while (arr.length) {
    const len = arr.length;
    res = arr[0].val; //最左侧
    for (let i = 0; i < len; ++i) {
      const node = arr.shift();
      if (node.left) {
        arr.push(node.left);
      }
      if (node.right) {
        arr.push(node.right);
      }
    }
  }
  return res;
};
```

12. [987. 二叉树的垂序遍历](https://leetcode-cn.com/problems/vertical-order-traversal-of-a-binary-tree/)

```js
/**
 * 相同列放入在一起
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const map = new Map();
  let queue = [[root, 0]]; //以当前根元素进行左右偏移

  while (queue.length) {
    const cols = new Map(),
      next = [];

    for (let [node, x] of queue) {
      if (!cols.has(x)) cols.set(x, [node.val]);
      else cols.get(x).push(node.val);

      if (node.left) next.push([node.left, x - 1]);
      if (node.right) next.push([node.right, x + 1]);
    }

    //同列元素排序
    for (let [x, val] of cols) {
      if (!map.has(x)) map.set(x, []);
      map.get(x).push(...val.sort((a, b) => a - b));
    }
    queue = next; //下一层
  }
  return [...[...map.entries()].sort((a, b) => a[0] - b[0]).map((x) => x[1])];
};
```

### 计算二叉树的节点数

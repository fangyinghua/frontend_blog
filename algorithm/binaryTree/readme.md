### 二叉树

* 🏷️二叉树节点结构

```js
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }
```


* 🌲二叉树的遍历

```js
traverse(root){
//前序遍历
traverse(root.left);
//中序遍历
traverse(root.right)
//后序遍历
}

```

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
var invertTree = function(root) {
    if(root===null)return null;
    let temp=root.left;
    root.left=root.right;
    root.right=temp;

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
var connect = function(root) {
    if(root===null)return null;
   connectTwo(root.left,root.right);
   return root;    
};

function connectTwo(n1,n2){
    if(n1===null || n2===null)return;

    n1.next=n2;
    // 连接相同父节点的两个子节点
    connectTwo(n1.left,n1.right);
    connectTwo(n2.left,n2.right);

    // 连接跨越父节点的两个子节点
    connectTwo(n1.right,n2.left);
}
```

4. [114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)
```js
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if(root===null)return;
    flatten(root.left);
    flatten(root.right);

  /**** 后序遍历位置 ****/
    // 1、左右子树已经被拉平成一条链表
    let left=root.left,right=root.right;

    // 2、将左子树作为右子树
    root.left=null;
    root.right=left;

   // 3、将原先的右子树接到当前右子树的末端
    let p=root;
    while(p.right){
        p=p.right;//查找当前树的右子树的末端
    }
    //将原先的右子树接到当前右子树的末端
    p.right=right; 
};

//改版后
var flatten = function(root) {
 flatten2(root,null)
};

function flatten2(root,pre){
    if(root===null)return pre;
    pre=flatten2(root.right,pre);//从右子树开始拉平
    pre=flatten2(root.left,pre);//通过pre将右子树和左子树拉平后的接入
    root.right=pre;
    root.left=null;
    pre=root;
    return pre;
}
```

### 构建类题目
* 🚀 思路：1. 找到根节点 ，然后构造根节点的左右子树

5. [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)
```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
    return build(nums,0,nums.length-1);
};

function build(nums,lo,hi){
    if(lo>hi){
        return null;
    }
    let index=-1,maxVal=Number.MIN_SAFE_INTEGER;

    //查找最大值 作为根节点
    for(let i=lo;i<=hi;++i){
        if(maxVal<nums[i]){
            index=i;
            maxVal=nums[i];
        }
    }

    let root=new TreeNode(maxVal);
    
    //构建左右子树
    root.left=build(nums,lo,index-1);
    root.right=build(nums,index+1,hi);
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

* 思路：
1. 寻找根节点，前序遍历的第一个节点就是根节点;
2. 构建根节点左右子树
```js
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {        
    return build(preorder,0,preorder.length-1,inorder,0,inorder.length-1);
};

function build(preorder,preStart,preEnd,inorder,inStart,inEnd){

    if(preStart>preEnd)return null;

    let rootVal=preorder[preStart];//前序遍历的首节点为根节点
    let index=0;
    for(let i=inStart;i<=inEnd;++i){
        if(inorder[i]===rootVal){
            index=i;
            break;
        }
    }

    let root=new TreeNode(rootVal);
    let leftSize=index-inStart;

    //构建左右子树
    root.left=build(preorder,preStart+1,preStart+leftSize,inorder,inStart,index-1);
    root.right=build(preorder,preStart+leftSize+1,preEnd,inorder,index+1,inEnd);

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
var buildTree = function(inorder, postorder) {
    return build(inorder,0,inorder.length-1,postorder,0,postorder.length-1);
};

function build(inorder,inStart,inEnd,postorder,posStart,posEnd){
   if(inStart>inEnd)return null;

    const rootVal=postorder[posEnd];
    let index=0;
    for(let i=inStart;i<=inEnd;++i){
        if(inorder[i]===rootVal){
            index=i;
            break;
        }
    }

    let root=new TreeNode(rootVal);
    let leftSize=index-inStart;

    root.left=build(inorder,inStart,index-1,postorder,posStart,posStart+leftSize-1);
    root.right=build(inorder,index+1,inEnd,postorder,posStart+leftSize,posEnd-1);

    return root;
}
```

### ✨ 二叉树的序列化与反序列化

8. [652. 寻找重复的子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)

```js

```
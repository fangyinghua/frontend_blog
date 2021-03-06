### 数组

1. [989. 数组形式的整数加法](https://leetcode-cn.com/problems/add-to-array-form-of-integer/)

```js
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function(num, k) {
   num=num.join('');
   let sum=Number(num)+k;
   const result=[];
   while(sum){
        const n=sum % 10;
        result.push(n);
        sum=parseInt(sum /10);
   }
   let reLen=result.length;
   if(reLen===0){
       result.push(sum);
   }
   return reLen===1?result:result.reverse();
};
```

问题：整数相加有整数范围，大整型问题。 --- BigInt

* 改版
从右往左 依次遍历 超过9 要进一 

```js
var addToArrayForm = function(num, k) {
    const res = [];
    const len= num.length;

    // 考虑num的长度 可能比k的个数要小 所有 合并处理了  k = Math.floor(k / 10) 除最右的数字
    for (let i = len - 1; (i >= 0 || k > 0); (--i, k = Math.floor(k / 10))) {

        if (i >= 0) {
            //超出9 也没有关系 比如k=12 ，在下一次循环的时候 就是k=1
            k += num[i];
        }

        //取k最右的数
        res.push(k % 10);
    }
    res.reverse();

    for(let i=len-1;(i>=0;k>0);i--,k=)
    return res;
};

```

2. [821.字符的最短距离](https://leetcode-cn.com/problems/shortest-distance-to-a-character/) 

* 前置知识：数组正向遍历和反向遍历 比较相同位置的元素

```js
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
 var shortestToChar = function (s, c) {
        let N = s.length;
        let ans = new Array(N);
        let prev=Number.MIN_SAFE_INTEGER/2;
        for (let i = 0; i < N; ++i) {
            if (s.charAt(i) == c) prev = i;
            ans[i] = i - prev;
        }

        prev =Number.MAX_SAFE_INTEGER/2;
        for (let i = N-1; i >= 0; --i) {
            if (s.charAt(i) == c) prev = i;
            ans[i] = Math.min(ans[i], prev - i);
        }
        return ans;
   };
```
 
3. [1381. 设计一个支持增量操作的栈](https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/)

* 指针 -- 栈 指针指向栈顶

```js
/**
 * @param {number} maxSize
 */
var CustomStack = function(maxSize) {
    this.maxSize=maxSize;
    this.customStack=[];
    this.top=-1;//栈顶指针
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
    if((this.top)!==(this.maxSize-1)){
        this.top++;
        this.customStack[this.top]=x;
    }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
    if(this.top===-1){
        return -1;
    }
    this.top--;
    return this.customStack[this.top+1];
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
    const s=Math.min(k,this.top+1);
    for(let i=0;i<s;i++){
        this.customStack[i]+=val;
    }
}
```

4. [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

```js
var decodeString=function (s){
    let numStack=[];
    let strStack=[];
    let num=0;
    let result='';
    for(const char of s){


    }


}
```

5. [75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // return nums.sort((a,b)=>(a-b))
    const len=nums.length;
    if(len<2){
        return nums;
    }

    for(let i=1;i<len;++i){
        let hasChange=false;
        for(let j=0;j<len-i+1;++j){
            if(nums[j]<nums[j-1]){
                hasChange=true;
                [nums[j-1],nums[j]]=[nums[j],nums[j-1]];
            }
        }
        if(!hasChange)break;
    }
    return nums;
};
```


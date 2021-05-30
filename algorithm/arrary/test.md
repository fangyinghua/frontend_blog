

### 左右指针的常用算法
左右指针在数组中实际是指两个索引值，一般初始化为 left = 0, right = nums.length - 1 。

1. 二分查找

2. 两数之和
```js
```

3. 反转数组
```js
function recerse(nums){
    let left=0,right=nums;
    while(left<right){
        [nums[right],nums[left]]=[nums[left],nums[right]];
        left++;right--;
    }
}
```

4. 滑动窗口算法
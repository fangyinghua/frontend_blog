### 回文串

回文串是对称的，所以正反读都是一样的。

* 寻找回文串
核心思想：从中间向两端扩展,注意点：回文串长度可能为奇数也可能为偶数，为奇数时只存在一个中心点。长度为偶数存在两个中心点。

```js
palindrome(s,l,r){

    while(l>=0 && r<s.length && s[l]===s[r]){
        //向两边展开
        l--;r++;
    }

    //返回以s[l]和s[r]为中心的最长回文串；
    return s.substr(l+1,r-l-1);
}
```

* 验证回文串
核心思想：双指针向中间逼近
```js
function isPalindrome(s){
    let left=0;right=s.length-1;
    while(left<right){
        if(s[left]!=s[right]){retuern false}
        left++;right--
    }
    return true;
}
```



* [447. 回旋镖的数量](https://leetcode-cn.com/problems/number-of-boomerangs/)
* 前置知识：
    * 哈希表
    * 两点间距离计算方法
```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
    const len=points.length;
    const maps = Array(len).fill(0).map(() => ({}));
    let count = 0;
    for(let i=0;i<len;++i){
        let map=maps[i];
        for(let j=0;j<len;++j){
            if(points[i]!=points[j]){
                const dist=calcDistOf2Points(points[i], points[j]);
                map[dist] = (map[dist] || 0) + 1;
            }
        }
        for (const dist in map) {
            const num = map[dist];
            if (num > 1) count += num * (num - 1);
        }
    }
    return count; 
};

function calcDistOf2Points([x1, y1], [x2, y2]) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

```

* [347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let len=nums.length;
    let map=new Map(),arr = [...new Set(nums)]
    for(let i=0;i<len;++i){
        if(map.has(nums[i])){
            map.set(nums[i],map.get(nums[i])+1)
        }else{
             map.set(nums[i],1)
        }
    }

    return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};
```

* [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)
```js
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {    
    let map=new Set();

    while(headA){
        map.add(headA)
        headA=headA.next;
    }

    while(headB){
        if(map.has(headB)){
            return headB
        }
        headB=headB.next;
    }
    return null;
};
```
# string常用方法
1. 属性
String.length
2. 方法
* String.prototype[@@iterator]()
    * [@@iterator]()
    ```js
    var string = 'A\uD835\uDC68';
    var strIter = string[Symbol.iterator]();

    console.log(strIter.next().value); // "A"
    console.log(strIter.next().value); // "\uD835\uDC68"
    ```
    * 通过 for..of 使用[@@iterator]()
    ```js
    var string = 'A\uD835\uDC68B\uD835\uDC69C\uD835\uDC6A';

    for (var v of string) {
    console.log(v);
    }
    ```
* String.prototype.match()/ String.prototype.matchAll()/String.prototype.replace()/String.prototype.replaceAll()/String.prototype.search()/String.prototype.split()
    这方法都跟RegExp有关系 这里不再讲解了 在`[RegExp]`这篇.

* 
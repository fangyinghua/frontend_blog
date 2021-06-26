### data-*属性

* 创建
```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars">
...
</article>
```

* 访问
    1. js
    ```js
    var article = document.querySelector('#electriccars');
    article.dataset.columns // "3"
    article.dataset.indexNumber // "12314"
    article.dataset.parent // "cars"
    ```

    2. css

    ```css
    article::before {
        content: attr(data-columns);
    }
    ```

    ```css 
    <!-- 选择器 -->
    article[data-columns='3'] {
        width: 400px;
    }
    article[data-columns='4'] {
        width: 600px;
    }
    ```



例子:
![css访问例子](./img/1624703385549.jpg)
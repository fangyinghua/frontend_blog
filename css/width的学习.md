# width的学习

### width：auto的四种表现：
>- 充分利用可用空间
* 默认是100%于父级容器；

>- 收缩与包裹  -- 收缩到合适
* 浮动/绝对定位(`position:absolute/fixed`)/inline-block/table元素

>- 收缩到最小
最容易出现在 table-layout 为 auto 的表格,表格容易出现一柱擎天。

>- 超出容器限制
比如：内容`很长的连续的英文和数字`，或者内联 元素被设置了`white-space:nowrap`

### 外部尺寸
>- 正常流宽度

>- 格式化宽度
* 绝对定位模型（position:absolute/fixed）,在默认情况下，元素的宽度表现为“包裹性”，宽度由内部尺寸决定的。
* 当 left/top 或 top/bottom 对立方位的属性值同时 存在的时候，元素的宽度表现为“格式化宽度”，其宽度大小相对于最近的具有定位特性(position 属性值不是 static)的祖先元素计算。

### 内部尺寸：
* 内部尺寸 -- 元素尺寸由内部的元素决定，而非外部尺寸决定。
* 如何判断元素使用的是“内部尺寸”？ -- `没有内容的适合，宽度为0`；

* 三种表现：
>- 1. 包裹性
* 例子：文字少，实现居中布局，文字多局左布局。
```css
.box{
    text-align:center;
}
.content{
    display:inline-block;
    text-align:left;
}
```
>- 2. 首选最小宽度
    * `图片和文字的权重`要`远大于布局`，因此，CSS 的设计者显 然是不会让图文在 width:auto 时宽度变成 0 的，此时所表现的宽度就是“首选最小宽度”。

    * 例子：垂直排序  --利用文字权重大于布局
    ```css 
    .test{
        width:0;
        display:inline-block
    }
    ```
>- 3. 最大宽度
* 例子：实现自定义滚动。
```css
.wrap {
  width: 300px; height: 200px;
  position: relative;
  overflow: hidden;
}
.wrap > ul {
  position: absolute;

  /* 不换行 */
  white-space: nowrap;
}
.wrap li {
  display: inline-block;
}
```

```html
<div id="wrap" class="wrap">
  <ul>
    <li><img src="1.jpg"></li>
    <li><img src="1.jpg"></li>
    <li><img src="1.jpg"></li>
    <li><img src="1.jpg"></li>
    <li><img src="1.jpg"></li>
  </ul>
</div>
```
* 使用js控制ul标签上的x方向位置
```html
<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(-474px, 0px) translateZ(0px);" ></ul>
```


### width值作用的细节

* width作用在“内在盒子”上的;
* 内在盒子被分成了4个盒子，分别是"content box/padding box/border bix/margin box;

* “margin 的背景永远是透明的”，因此不可能作为 backgound-clip 或 background-origin 属性值出现。
* 默认宽度是作用在 content box 上的;

* 改变 width/height 作用细节的 `box-sizing` -- 改变了 width 作用的盒子;


### box-sizing 被发明初衷？
* 替换元素
    * 替换元素的特性之一就是`尺寸由内部元素决定`，且无论其 display 属性值是 inline 还是 block;
    * box-sizing 被发明出来最大的初衷应该是解决`替换元素宽度自适应问题`;
    * <!-- 以前解决方法： -->
        * “宽度分离”，外面嵌 套<div>标签，模拟 border 和 padding；
        ```html
        <div class="container">
            <div class="textarea">
                <textarea rows="5" placeholder="色块是容器"></textarea>
            </div>
        </div>
        ```

        ```css
        .container {
        width: 280px;
        margin: 0 auto;
        padding: 40px 0;
        background-color: #f0f3f9;
        }
        .textarea {
        padding: 9px 8px;
        border: 1px solid #d0d0d5;
        border-radius: 4px;
        background-color: #fff;  
        }

        .textarea > textarea {
        width: 100%;
        line-height: 20px;
        padding: 0;
        border: 0 none;
        outline: 0 none;
        background: none;
        resize: none;
        }
        ```
        
        * 后来：
        ```css

            input, textarea, img, video, object {
                box-sizing: border-box;
            }
        ```

### min-width/max-width  -- min-height/max-height

  * width/height 的默认值是 auto;
  * min-width/max-width 和 min-heigh/ max-height 的初始值则要复杂些;
  * max-width 和 max-height 的初始值是 none;
  *  min-width/min-height 的初始值都是 auto;

  * 'max-width': 会覆盖 width,超越!important;
  * min-width 覆盖 max-width;


  ### 应用
  任意高度元素的展开收起动画技术
  * 使用 height + overflow:hidden 实现  --计算 height高度;
  *  max-height+overflow:hidden;  -- 如果 max-height 值太大，在收起的时候可能会有“效果延迟”的问 题
  ```js
    .element {
      max-height: 0;
      overflow: hidden;
      transition: max-height .25s;
    }
    .element.active {
     max-height: 666px; /* 一个足够大的最大高度值 */ 
    }
  ```


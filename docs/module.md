### 模块的发展历程
早期的javascript没有模块系统、自动加载和安装依赖的能力。
[最根本解决问题是变量、方法的私有化，虽然可以通过闭包解决，但是依赖库，通过参数传入的方法，不够清晰。]
<strong>比如</strong>：
```js
(function (window) {
    window.a = function () {
        console.log('我是闭包环境下的a方法');
    }
    console.log(document)
})(window,document)
```


### CommonJS的模块规范
#### 基础知识

1. 模块引入
    `js require()`

2. 模块定义
    ```js
    exports.add=function(){

    }
    module.exports={

    }
    ```

3. 模块类型(4类 一种Node提供的原生模块，3种文件模块)
    * Node提供的模块-核心模块；
    * .或者..开头的相对路径文件模块；
    * 以/开头的绝对路径文件模块；
    * 非路径形式的文件模块，比如自定义的connect模块；
4. 模块的缓存
   Node对引入过的模块都会进行缓存，以减少二次引入时的开销。

   <strong style="color:red">与浏览器的缓存区别</strong>：浏览器紧紧缓存文件，node缓存的是编译和执行之后的对象。

5. node中的实现过程

    <strong>1). 路径分析</strong>
        通过require()方法接受的一个标识符，基于这个标识符进行路径分析(区分：系统核心模块还是文件模块)；自定义模块根据`module.paths`路径数组查找。

    * 模块路径生成规则（文件的路径越深，模块查找耗时越久，所以自定义模块的加载速度是最慢的。）：
            1). 当前文件目录下的node_modules目录;
            2). 父目录下的node_modules目录;
            3). 父目录下的父目录的node_modules目录;
            ...
            4). 沿着路径向上逐级递归，直到根目录下的node_modules目录;
            

    <strong>2). 文件定位</strong>
        * 分析文件扩展名 （node.js按照js、.node、.json次序依次尝试）
    
    <strong>3). 模块编译</strong>
        
        根据不同的扩展名进行不同的编译方案。编译成功后的模块都会将其<span style="color:red">文件路径</span>作为<span  style="color:red">索引</span>缓存<span style="color:red">Module._cache</span>对象上<br>
       
        * 非.node的文件通过<span style="color:red">fs模块同步</span>的方式读取文件后编译执行(.json 使用JSON.parse()解析返回结果)；

        * .node文件通过<span style="color:red">dliopen()</span>方法加载后编译生成二进制文件；




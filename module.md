### 模块的发展历程
早期的javascript没有模块系统、自动加载和安装依赖的能力。
[最根本解决问题是变量、方法的私有化，虽然可以通过闭包解决，但是依赖库，通过参数传入的方法，不够清晰。]

<strong>比如</strong>：下面依赖关系不清晰。
```js
(function (window) {
    window.a = function () {
        console.log('我是闭包环境下的a方法');
    }
    console.log(document)
})(window,document)
```


### CommonJS的模块规范

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

5. 
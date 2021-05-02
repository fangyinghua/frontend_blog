#Promise

##### 定义
Promise是一种异步编程的 一种解决方案，异步操作的最终完成(或失败)及其接结果值。

##### 解决什么问题？
1. 回调地狱；
2. 支持多个并发的请求；
3. 异步的问题；

##### 基础知识
1. Promise的链式调用
 `promise.then(),promise.catch(),promise.finally()`还会返回一个新生成的 promise 对象.
2. 三个状态
    * 待定-pedding：初始状态
    * 已兑现-fulfilled：操作成功完成
    * 已拒绝-rejected：操作失败
3. 静态方法(6个)
    * Promise.all(iterable)
        * 返回一个新的promise对象，该promise对象在iterable参数对象里`所有的promise对象都成功`的时候才会触发成功,一旦有`任何一个iterable里面的promise对象失败`则立即触发该promise对象的失败。
        * 这个新的promise对象在触发成功状态以后,会把一个包含iterable里`所有promise返回值的数组`作为成功回调的返回值，顺序跟iterable的顺序保持一致;
        * 如果这个新的promise对象触发了失败状态，它会把iterable里`<sapn style="color:red">第一个</span>触发失败的promise对象的错误信息`作为它的失败错误信息。
    * Promise.allSettled(iterable)
        * 等到`所有promises都已敲定（settled）`（每个promise都已兑现（fulfilled）或已拒绝（rejected））。返回一个promise，该promise在所有promise完成后完成。并带有一个`对象数组`，每个对象对应每个promise的结果。
        ```js
         let p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('success')
            }, 1000)
        })

        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('failed')
            }, 500)
        })

        Promise.allSettled([p1, p2]).then((result) => {
            console.log(result)
            /*
            [{
                status: "fulfilled",
                value: "success"
            }, {
                    reason: "failed",
                    status: "rejected"
            }]
            */
        }, (error) => {
            console.log(error)
        })
        ```
    * Promise.any(iterable) --和 Promise.all()相反
        * 返回一个promise对象，当其中的一个 promise 成功，就返回那个成功的promise的值。
        * 全部失败，返回一个Aggregate Error(集合错误)。 errors数组reason的数组

        ```JS
        const promises = [
            Promise.reject('ERROR A'),
            Promise.reject('ERROR B'),
            Promise.reject('result'),
        ];
        Promise.any(promises).then((result) => {
            console.log(result);
        },(aggregateError)=>{
            // aggregateError.errors /aggregateError.message /aggregateError.stack
            console.log(aggregateError.errors);//数组 ['ERROR A','ERROR B','result']
        });
        ```
    * Promise.race(iterable) race:竞争、比赛
        * 当iterable参数里的`任意一个子promise被成功或失败后`，`父promise`马上也会`用子promise的成功返回值或失败详情`,作为`参数`调用父promise绑定的相应句柄，并返回该promise对象。
        * 简单讲：Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
        ```js
        let p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('success')
            }, 1000)
        })

        let p2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('failed')
            }, 500)
        })

        Promise.race([p1, p2]).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)  // 打开的是 'failed'
        })
        ```
    * Promise.resolve(value)
        * 如果您不知道一个值（value）是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。
        
    * Promise.reject(reason)
        * 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
    
4. 原型
* 属性：`Promise.prototype.constructor`
* 方法:
    * Promise.prototype.catch(onRejected)

    * Promise.prototype.then(onFulfilled, onRejected)
    * Promise.prototype.finally(onFinally)
        * 添加`一个事件处理回调`于`当前promise对象`，并且在原promise对象解析完毕后，`返回一个新的promise对象`.
        * 回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)

       
6. 使用XHR例子：
```js

function imgLoad(URL){

    return new Promise(function(resole,reject){
       const request=new XMLHttpRequest();

       request.open('GET',url);
       request.responseType='blob';//blob--[binary large object]
       request.onload=function(){
           if(request.state===200){
               resolve(request.response);
           }else{
               reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
           }


       }
       request.onerror=function(){
          reject(Error('There was a network error.'))
       }

       request.send();
    })


}

imgLoad('XXXX').then(function(response){
    window.URL.
})
 




  function imgLoad(url) {    
    return new Promise(function(resolve, reject) {
      var request = new XMLHttpRequest();
      //建立连接
      request.open('GET', url);
      request.responseType = 'blob';
      request.onload = function() {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
          reject(Error('There was a network error.'));
      };
      //发送请求
      request.send();
    });
  }
  var body = document.querySelector('body');
  var myImage = new Image();
  imgLoad('myLittleVader.jpg').then(function(response) {
    var imageURL = window.URL.createObjectURL(response);
    myImage.src = imageURL;
    body.appendChild(myImage);  
  }, function(Error) {
    console.log(Error);
  });
  
```

##### 手写promise

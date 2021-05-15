/**
 * 可以使用 
 * navigator
 * location
 * 
 * 使用 XMLHeepRequest 对象发送 ajax请求
 * 加载的脚本 必须来着网络
 */

 self.addEventListener('message',function(e){
    postMessage(' you said:'+e.data)
    console.log(navigator);
 },false)
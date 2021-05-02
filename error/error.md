### 如何搭建一个错误监控平台

##### javascript层
js执行错误
promise异常
接口错误
页面空白


##### 用户体验

* TTFB （time to firstbyte）首字节时间
    * 指浏览器发起第一个请求到数据返回第一个字节所消耗的时间，这个时间包括了网络请求时间、后端处理时间

* FP（First Paint） -----> 首次绘制
    * 首次绘制包括了任何用户自定义的背景绘制，它是将<span color="red">第一个像素点</span>绘制到屏幕的时刻

* FCP（First Content Paint） ----> 首次内容绘制
    * 首次内容绘制是浏览器将<span color="red">第一个DOM</span>渲染到屏幕的时间，可以是任何文本、图像、SVG等的时间
* FMP（First Meaningful Paint） -----> 首次有意义的绘制
    * 首次有意义的绘制是页面可用性的量度标准
* LCP（Large Contentful Paint） -----> 最大内容渲染
    * 代表在viewport中最大的页面元素加载时间
* FID（First Input Delay） -----> 首次输入延迟
    * 用户首次和页面交互到页面响应交互的时间
    卡顿：超过50ms

##### 业务层面 (埋点)
* PV(Page View)：页面浏览量或点击量
* UV()：指访问某个站点的不同ip地址的人数
* 页面停留时间：用户在每一个页面的停留时间

##### 埋点方案
* 代码埋点：
    点击事件
* 可视化埋点：
* 无痕埋点：
    前端的任意一个事件都被绑定一个标识，所有事件都被记录下来；通过定期上传记录文件，配合文件解析，解析出来我们想要的数据，并生成可视化报告供专业人员分析

##### 编写代码
数据统一上报方法：准备在阿里云开通日志服务，这是用来存储我们上报的数据的，上报到阿里云日志的数据也是有接口的。

共用数据：
1. title：document.title
2. url:location.url
3. timestamp: Date.now(),
4. userAgent:userAgent.parse(navigator.userAgent).name

* 编写上报接口
```js
let userAgent = require("user-agent");

let host = "cn-beijing.log.aliyuncs.com";
let project = "zyq-monitor";
let logStore = "zyq-monitor-storage";

// 共用数据
function getExtraData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent).name,
    }
}

class SendTracker {
    constructor() {
        this.url = `http://${project}.${host}/logstores/${logStore}/track`;  // 上报路径
        this.xhr = new XMLHttpRequest;
    }
    send(data = {}) {
        let extraData = getExtraData();
        let log = {...extraData, ...data};
        // 这里是阿里云要求对象的值不能是数字，所以要转成字符串
        for(let key in log) {
            if(typeof log[key] === "number") {
                log[key] = `${log[key]}`;
            }
        }
        let body = JSON.stringify({
            __logs__: [log]
        });
        this.xhr.open("POST", this.url, true)
        this.xhr.setRequestHeader("Content-Type", "application/json");
        // 下面两个请求头是阿里云要求的
        this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");
        this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);  // 请求体大小
        this.xhr.onload = function() {
            // console.log(this.xhr.response);
        }
        this.xhr.onerror = function(error) {
            // console.log(error);
        }
        this.xhr.send(body);
    }
}

export default new SendTracker()
```


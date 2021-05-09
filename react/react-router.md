### react-router 简介
react-router 包含三个库：react-router、react-router-dom、react-router-native；
* react-router提供最基本的路由功能；
* react-router-dom和 react-router-native都依赖react-router

* 一切皆组件思想：路由器 Router/Link/Route/Switch/ 重定义 Redirect 都是以组件的形式存在

Route:属性 patch 、component、render、
Link：to

* Route三种渲染方式
    * children：func ，不管location是否匹配，你都要渲染一些内容的时候，使用children，其他工作和render一样。

    * render:func
    用哪个render的时候，调用的只是个函数。和component 一样，能访问到所有 [route props];

    * component:component
    只在当 location 匹配的时候渲染

    * 渲染component的时候会调用React.createElement(), 如果是以匿名函数的形式，每次都会生成一个新的匿名函数。导致组件的type 总是不相同，会产生重复的卸载和挂载

    `<Route component={()=><Child count={count} />}></Route>`

    * 如果要使用匿名函数，换成render/children的方式渲染,只是·执行函数·而已
    `<Route render={()=><Child count={count} />}></Route>`
    * 三种渲染方式的优先级
        ```js
                {
                    props.match?
                    children?
                        typeof children ==='function'? children(props):children
                        :component?
                            React.createElement(component,props):
                        render?render(props):null
                    :typeof children ==='function':children(props):null
                }

        ```

* Link
    * to:string  -- < pathname,search ,hash>
        `<Link to='/courses?sort=name' />`
    * to:object
        * pathname - 要链接到的路径
        * search - 查询参数
        * hash - URL 中的 hash，例如 #the-hash
        * state - 存储到 location 中的额外状态数据

    * state通过this.props.location.state 进行访问

    ```js
    <Link to={{ pathname: '/courses', search: '?sort=name', hash: '#the-hash', state: { redirect: '/login' } }} />
    ```
    * replace: bool
    当设置为 true 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。默认为 false 。
    `<Link to="/courses" replace /`

* Router
    * BrowserRouter
    * HashRouter
    * MemoryRouter
    * NativeRouter
    * StaticRouter

* Switch
    * location: object
        * 用于匹配子元素而`不是`当前`history location`;
        * `<Switch location={{pathname: "/"}}>`;
    * 用于渲染与路径匹配的`第一个子 <Route> 或 <Redirect> `。
    * `<Route> 组件`使用` path 属性`进行匹配，而 `<Redirect> 组件`使用它们的 `from 属性`进行匹配。
    * 没有path 属性的 <Route> 或者没有 from 属性的 <Redirect> 将始终`与当前路径匹配`。
    * 如果给 <Switch> 提供一个 location 属性，它将覆盖匹配的子元素上的 location 属性。


### 实现
Router 
* Router 为子组件提供 location、history、match属性 ;
* 在router 监听location 如果发送变化 执行setState ;

```js
import React, {Component} from "react"; 
import {RouterContext} from "./Context"; 

export default class Router extends Component { 
    static computeRootMatch(pathname) { 
        return {path: "/", url: "/", params: {}, isExact: pathname === "/"}; 
    }

    constructor(props) {
        super(props);
        // 实现BrowserRouter
        // BrowserRouter：历史记录管理对象history初始化及向下传递，location变更监听
        // 实现Route
        // 路由配置，匹配检测，内容渲染
        this.state = { 
            location: 
            props.history.location 
        };

        this.unlisten = props.history.listen(location => {
            this.setState({ location }); 
        }); 
    }

    componentWillUnmount() { 
        if (this.unlisten) {
            this.unlisten(); 
        } 
    }

    render() { 
        return (
            <RouterContext.Provider 
                value={{ 
                    history: this.props.history, 
                    location: this.state.location, 
                    match: Router.computeRootMatch(this.state.location.pathname) 
                }}>
                {this.props.children} 
            </RouterContext.Provider>
            ); 
    }
}
```


### 实现Route

```js

export default class Route extends Component { 

    render() {
     return ( <RouterContext.Consumer> {context => { 
            // 优先从props中取值 
        const location = this.props.location || context.location; 

        // 优先从props中取值计算 
        const match = this.props.computedMatch ? 
        this.props.computedMatch : this.props.path ? 
        matchPath(location.pathname, this.props) :
         context.match; 

         //最新loaction match
         const props = { 
             ...context, 
             location, 
             match };

        let {path, children, component, render} = this.props; 
        
        return ( 
             //使得子组件获取最新的location match
            <RouterContext.Provider value={props}>
            
       {/* match 渲染这三者之一：children component render或者null 
       不match，渲染children 或者 null */}
        {match ? children ? typeof children === "function" ? children(props) : children :
         component ?
         React.createElement(component, props) : 
         render ? render(props) : null :
          typeof children === "function" ? children(props) : null} 
        </RouterContext.Provider> ); 
        }} 
    </RouterContext.Consumer> );
    } 
}


```
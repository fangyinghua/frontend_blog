### 手写redux

##### redux的方法：
* createStore(reducer,preloadState,enhancer)
    * reducer：函数(当前state,action)  --定义修改state规则
    * preloadState：初始状态对象
    * enhancer：是store的 增强器函数，这个函数只能使用redux提高的applymiaddleware函数来生成
    * 返回的方法：
        1. getState();
        2. subscribe();
        3. dispatch();
* combineReducers
* bindActionCreators
* compose
* applymiaddleware
    * 中间件：加强dispatch() --之前dispatch只能处理对象，不能处理函数，异步方法等。返回一个合成后的dispatch。
    * 中间件的设计：自由组合、插拔的插件机制。

##### redux的使用：
```js
import {combineReducers,createStore,applyMiddleware} from 'redux';
/**
reducer 定义修改规则
只能是纯函数
返回新的state
*/
function counterReducer(state=1,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'red':
            return state-1;
        default:
            return state;
    }
}

function counterReducer2(state=2,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'red':
            return state-1;
        default:
            return state;
    }
}

// 1. 多个reducer的时候需要combineReducers
// 2. action为异步的时候或者函数等（非普通对象的时候），需要中间件 加强dispatch。
const store=createStore(
    combineReducers({
        counter:counterReducer,
        counter2:counterReducer2
    }),
    applyMiddleware(thunk)
)

class App{

    componentDidMount(){
        //订阅重新渲染函数
       this.unsubscribe=store.subscribe(()=>{
            this.forceUpdate();
        })
    }
    componentWillUnmount(){
        //取消订阅
        if( this.unsubscribe){
            this.unsubscribe();
        }
    }

    addHander(){
        store.dispatch({type:'add'})
    }

    render(){
        return <div>
            <span>{store.getState()}</span>
            <button onClick={addHander}>添加</button>
        </div>
    }
}
```

redux在react中使用缺点：
1. 需要收到订阅和取消订阅 重新渲染函数；
2. 需要在每个文件内引入store,因为需要通过getState获取值和dispatch方法

react-redux解决上面两个问题，通过react的contextAPI
1. Provider解决获取store的问题；
2. connect解决手动维护 订阅更新函数 和取消更新函数； connect是个高阶函数

##### react-redux的使用  依赖redux
* 类组件中使用 Provider connect

```js
import { createStore } from "redux";
import { Provider, connect} from "react-redux";

class App{
    render(){
        return (
            <Provider value={store}>
                <Child></Child>
            </Provider>
        )
    }
}

class Child{

}

connect(mapStateToProps,mapdispatchToProps)(Child)

```
* 函数组件中使用 useDispatch useSelector

```js
import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

const initialState = { num: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "decrement":
      return { ...state, num: state.num - 1 };
    case "increment":
      return { ...state, num: state.num + 1 };
    default:

      return state;
  }
};

const store = createStore(reducer, initialState);

const ComponentUseReactRedux = () => {
  return (
    <div>
      <h2>ComponentUseReactRedux</h2>
      <Provider store={store}>
        <ChildComponentUseReactRedux />
      </Provider>
    </div>
  )
}

//useSelector 类似connect
const ChildComponentUseReactRedux = () => {
  const num = useSelector(state => state.num);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Using useSelector, useDispatch</h3>
      Number: {num}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};
```

### 手写redux
```js
function createStore(reducer,enhancer){
    let state;
    function getSate(){
        return state;
    }

    if(enhancer){
        return getSate=>reducer
    }

    function dispatch(){
        
    }

    function subscribe(){

    }

    return {
        getSate,
        dispatch,
        subscribe
    }
}
```


### https://www.jianshu.com/p/ae7b5a2f78ae

源码解读：
https://srtian96.gitee.io/blog/2018/06/02/%E8%A7%A3%E8%AF%BBRedux%E6%BA%90%E7%A0%81/
### 问题
* createStore 发生了什么？
* dispatch 执行后在内部怎么运作的？
* compose 函数做了什么事情？
* combineReducers 是如何合并不同的 reducer 的？ --- 依次执行reducer为function的方法，如果有变化 返回这个重新组成的nextState 否则返回state
* applyMiddleware 是如何组织中间件的？ 使用compose函数，合成一个函数  getState，dispatch ; `next=>action=>{} next(action)/ dispatch(action)`

### createStore 揭秘
* 创建一个仓库；
* 返回`四个非常重要的属性`

* `getState,subscribe,dispatch,replaceReducer`
    *  getState,// 获取到 state
    *  subscribe,// 采用发布订阅模式，这个方法进行观察者的订阅
    *  dispatch -- 派发 action
    *  replaceReducer// 用新的 reducer 替换现在的

*  createStore，第一步是检查参数，一共可以接收三个参数
    * reducer 表示改变 store 数据的纯函数'
    * preloadedState 表示初始状态

* subscribe -- subscribe (listener)
    * 返回一个取消订阅的方法
    * 将订阅的函数，存放在一个数组内；nextListeners.push(listener);

* dispatch(action)
    * currentState = currentReducer (currentState, action) -- 执行当前的reducer 并且返回新的state
    * 遍历 listeners --  const listeners = (currentListeners = nextListeners) -- 通知订阅的组件渲染更新

* 第三个参数 确保 enhancer为一个函数
    * 如果传入第二个参数，第三个参数为undefined，并且第二个参数为function，那么我们把第二个参数当做 enhancer
    ```js
        export default function createStore (reducer, preloadedState, enhancer) {
            // 第二个参数为函数，但是第三个参数没传
            if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
                enhancer = preloadedState  // 将第二个参数当做 enhancer 
                preloadedState = undefined
            }
            // 确保 enhancer 为函数
            if (typeof enhancer !== 'undefined') {
                if (typeof enhancer !== 'function') {
                throw new Error ('Expected the enhancer to be a function.')
                }

                return enhancer (createStore)(reducer, preloadedState)
            }

            //...
        }
    ```

### combineReducer
* 多个reducer 对象 {key:reducer}
* combineReducer 用来组织不同模块的 reducer
* 返回一个函数 combination(state = {}, action),参数和单个的reducer一样。
```js
export default function combineReducers (reducers) {
  // 以项目中的例子来讲，reducerKeys 就是 ['recommend', 'singers']
  const reducerKeys = Object.keys (reducers)
  //finalReducers 是 reducers 过滤后的结果
  // 确保 finalReducers 里面每一个键对应的值都是函数
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys [i]

    if (typeof reducers [key] === 'function') {
      finalReducers [key] = reducers [key]
    }
  }
  const finalReducerKeys = Object.keys (finalReducers)

  // 最后依然返回一个纯函数
  return function combination (state = {}, action) {
    // 这个标志位记录初始的 state 是否和经过 reducer 后是一个引用，如果不是则 state 被改变了
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys [i]
      const reducer = finalReducers [key]
      // 原来的状态树中 key 对应的值
      const previousStateForKey = state [key]
      // 调用 reducer 函数，获得该 key 值对应的新状态
      const nextStateForKey = reducer (previousStateForKey, action)
      nextState [key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // 这个很简单理解吧？如果没改变直接把原始的 state 返回即可
    return hasChanged ? nextState : state
  }
}

```
* combineReducers (reducers) 
    * 需要获取reducer的key;
    * 只处理 如果当前的reducer的值为function；
    * 返回一个函数 combination (state = {}, action)  -- state是个对象 --状态树 
    * 通过最终获取的keys，遍历 reducer 并且执行，通过对比 这个value和原来state的value 是否相等；新生成 nextState对象；
    * 如果有变化返回新的state，否则返回原来的state；

### compose 函数解读 -- 高阶函数的技巧
```js
export default function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs [0]
  }

  return funcs.reduce ((a, b) => (...args) => a (b (...args)))
}
```


### applyMiddleware 完全解析 --为每个中间件 提供 dispatch和getState方法
```js
export default function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore (...args)
    let dispatch = () => {
      throw new Error (
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }
    //middlewareAPI 其实就是拿到 store 的信息
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch (...args)
    }
    // 参考上面的 thunk，其实就是传入 store 参数，剩下的部分为 next => action => { ... };
    // 传入这个参数是必须的，因为需要拿到 store 的相关属性，如 thunk 拿了 getState
    // 这里的意思就是每个中间件都能拿到 store 的数据
    const chain = middlewares.map (middleware => middleware (middlewareAPI))
    dispatch = compose (...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

```

### redux-thunk


### react-redux
useLayoutEffect

* 提供了两个api
1. Provider 为后代组件提供store
2. connect 为组件提供数据和变更方法


##### connect
* connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
    * 连接 React 组件与 Redux store。
    * 返回一个新的已与 Redux store 连接的组件类。
    * state映射 和 事件映射

* state映射 
    * mapStateToProps `Fucntion`
    ```js
    state => { 
        return { count: state }; 
    },
    ```

* 事件映射
    * mapDispatchToProps `Object | Fucntion`

    * Object 此时props中没有dispacth，但是有action creators，`内部实现dispatch`
    ```js
     { 
         add: () => ({type: "ADD"}),
        minus: () => ({type: "MINUS"})  
      }
    ```
    * Fucntion 参数是dispatch与ownProps
    ```js
    (dispatch, ownProps) => { 
        console.log("mapDispatchToProps--", ownProps); //sy-log 
        let creators = { 
             add: payload => ({type: "ADD", payload}),
             minus: () => ({type: "MINUS"}) 
         };
        creators = bindActionCreators(creators, dispatch); 
        return {dispatch, ...creators}; 
    }
    ```
### 实现react-redux
* bindActionCreators 为每个对象 绑定 dispatch({})
*  bindActionCreators(mapDispatchToProps, dispatch);
*  `mapDispatchToProps = { add:()=>({type:'ADD'}) }`
* bindActionCreators 将 mapDispatchToProps对象内每个函数执行并且使用dispatch包裹, 返回值为对象  {add: dispatch({type:'ADD'})}

1.  bindActionCreators

```js
function bindActionCreator(creator, dispatch) { 
    return (...args) => dispatch(creator(...args)); 
}

function bindActionCreators(creators, dispatch) { 
    const obj = {};
     for (let key in creators) {
          obj[key] = bindActionCreator(creators[key], dispatch); 
     }
     return obj; 
}
```

2. react-redux
```js
import React, {useContext, useReducer, useLayoutEffect} from "react"; 
const Context = React.createContext(); 

export const connect = ( mapStateToProps = state => state, mapDispatchToProps ) =>
 WrappendComponent => props => { 
     const store = useContext(Context);
      const {dispatch, getState, subscribe} = store; 
      const stateProps = mapStateToProps(getState()); 
      let dispatchProps = {dispatch}; 

      const [ignored, forceUpdate] = useReducer(x => x + 1, 0); 

      if (typeof mapDispatchToProps === "function") { 
          dispatchProps = mapDispatchToProps(dispatch); 
      } else if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch); 
      }

    useLayoutEffect(() => { 
        const unsubscribe = subscribe(() => { 
            forceUpdate(); 
        });

        return () => {
             if (unsubscribe) { 
                unsubscribe(); 
            } 
        };
     }, [store]); 

    return <WrappendComponent {...props} {...stateProps} {...dispatchProps} />; 
 };

export function Provider({store, children}) { return <Context.Provider value={store}>{children}</Context.Provider>});
```

3. hooks api
订阅、取消订阅 使用react-redux 类组件使用connect() 高阶函数完成，hook在useSelector中完成的；
```js
  useLayoutEffect(() => { 
        const unsubscribe = subscribe(() => { 
            forceUpdate(); 
        });

        return () => {
             if (unsubscribe) { 
                unsubscribe(); 
            } 
        };
     }, [store]);
```
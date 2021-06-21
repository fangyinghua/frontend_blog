* 状态管理库 --中间件 redux-saga
   - 调用异步操作 call
    - 状态更新 (dispatch) put
    - 监听 takeEvery


```js
//mySaga.js
import {call,put,takeEvery} from 'redux-saga/effects';

//监听 takeEvery
//调用异步操作 call
//状态更新 （dispatch）put



// worker saga 
function *loginHandle(action){

  //异步操作
  const res=yield call(UserService.login);

  //状态更新 put
  yield put({type:"LOGIN_SUCCESS"});
}

// water saga  监听login
function *mySaga(props){
    yield takeEvery("login",loginHandle);
}


export default mySaga;
```


```js
//saga的使用
import createStore from 'redux';
import createSagaMiddleware from 'redux-sage';
import mySaga from './mySaga.js';

import sagaMiddleware=createSagaMiddleware();//创建一个saga中间价

createStore(combineReducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);//运行

```


```js
//index.js

import {connect} from 'react-redux';

export default connect(()=>{

},{
    login:()=>({type:"login"})//监听了login
})(<MyCommponent />)
```
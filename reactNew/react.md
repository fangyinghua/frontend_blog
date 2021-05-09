### React

```js
  Children,
  createRef,
  Component,
  PureComponent,
  createContext,
  forwardRef,
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useMutableSource,
  Fragment,
  Profiler,
  unstable_DebugTracingMode,
  StrictMode,
  Suspense,
  createElement,
  cloneElement,
  isValidElement,
  version,
  createFactory
```

* ReactElement -- 返回一个对象

```js
    var element={
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
    }

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }

```
* Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该`对象的原型也不能被修改`。

```js
setState()方法：

equeueState(ins,payload,callback){
    const fiber=get(ins);//通过实例获取fiber
    const update = createUpdate();
    update.payload=payload;
    enqueueUpdate(fiber,update)
    scheduleWork(fiber，expirationTime)
}

```
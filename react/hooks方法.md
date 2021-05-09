


1. 对比 useLayoutEffect 、useEffect
* useLayoutEffect会 `在渲染的内容`更新到DOM上之前进行,会阻塞DOM的更新；
* useEffect会在`渲染的内容`更新到DOM上后执行,不会阻塞DOM的更新

如果我们希望在某些操作发生之后再更新DOM,那么应该将这个操作放在useLayoutEffect



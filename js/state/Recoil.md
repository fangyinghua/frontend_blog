1. Recoil

### 特点：
* 简练并保持与 React 一致
* 数据流图
* Cross-App Observation


* 派生数据和异步查询均采用纯函数和高效的订阅方式实现。
* 通过监听应用程序中所有状态的变化来 `实现持久化存储、路由、时间旅行调试或撤消`，并且不会影响 代码拆分。

* 分散管理原子状态的模式、读写分离、按需渲染、派生缓存

* Recoil 推崇的是分散式的状态管理，这个模式很类似于 Mobx，使用起来也感觉有点像 observable + computed 的模式

```js
function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```
* Recoil 推荐使用 Suspense，Suspense 将会捕获所有异步状态，另外配合 ErrorBoundary 来进行错误捕获

* 在使用方式上完全拥抱了函数式的 Hooks 使用方式，并没有提供 Componnent 的使用方式，目前使用原生的 Hooks API 我们也能实现状态管理，我们也可以使用 useMemo 创造出派生状态，Recoil 的 useRecoilState 以及 selector 也比较像是对 useContext、useMemo 的封装。


2. Reselect

* Redux的中间件-Reselect --因为Reselect不可能保证缓存 你所有的需求,在做非常昂贵的计算的时候,这个方法比较有用。
* ![Redux的中间件-Reselect](https://www.cnblogs.com/videring/articles/7567246.html)
* selector”是一个简单的Redux库,灵感来源于NuclearJS.
    * Selector可以`计算衍生的数据`,可以`让Redux做到存储` 尽可能少的state。
    * Selector比较高效,只有在某个参数发生变化的时候才发生计算过程.
    * Selector是可以组合的,他们可以作为输入,传递到其他的selector.

* 什么时候用reselect?
    * store状态树庞大且层次较深
    * 组件中的state需要经过复杂的计算才能呈现在界面上（reselect只是在参数级别的缓存）

* API
    * createSelector
    * defaultMemoize
    * createSeletorCreator
    * createStructuredSelector


```js
// reselect 的使用



```
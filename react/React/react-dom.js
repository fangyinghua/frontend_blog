// HostText
// HostComponent

`Concurrent组件的情况下，同步更新的 不会立即获取`


let fiber = {
    tag: '',
    key: '',
    type: '',
    sateNode: '',
    child: '',
    sibling: '',
    return: '',
    index: 0,
    memoizedState,
    memoizedProps: '',
    pendingProps,
    effectTag: '',//当前节点 进行什么 操作 Placement：添加，Update：更新，Deletion：删除 

    firstEffect: '',// 当前节点需要更新的第一个子节点
    lastEffect: '',//最后一个要更新的子节点
    nextEffect: '',//下一个要更新的下一个字节点

    alternate: '',// 关联current和workInProgress

    updateQueue: '',//更新链表
}
/**
 * @fileoverview Linked list implementation in javascript
 */

const head = Symbol('head');

class LinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this[head] = null;
    }

    /**
     * 添加节点
     * @param {*} data 
     */
    add(data) {
        const newNode = new LinkedListNode(data);
        if (this[head] === null) {
            this[head] = newNode;
        } else {
            let current = this[head];
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }


    /**
     * 添加到当前节点 前面
     * @param {*} data 
     * @param {*} index 
     */
    insertBefore(data, index) {
        const newNode = new LinkedListNode(data);
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list`);
        }
        if (index === 0) {
            newNode.next = this[head];
            this[head] = newNode;
        } else {
            let current = this[head],
                previous = null;

            let i = 0;
            while (current.next && i < index) {
                previous = current;//前继节点 -- 指针移动
                current = current.next;//当前节点 -- 指针移动
                i++;
            }

            if (i < index) {
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

            previous.next = newNode;
            newNode.next = current;
        }

    }

    /**
     * 添加到当前节点 后面 
     * @param {*} data 
     * @param {*} index 
     */
    insertAfter(data, index) {
        const newNode = new LinkedListNode(data);

        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list`);
        }


        let i = 0;

        let current = this[head];
        while (current && i < index) {
            current = current.next;
            i++;
        }

        if (i < index) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

      
      
        newNode.next=current.next;
        current.next=newNode;
    }
}
/**
 * 来源 https://github.com/humanwhocodes/computer-science-in-javascript
 */

const head = Symbol('head');//头
const tail = Symbol('tail');//尾

//节点
class DoublyLinkListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this[head] = null;
        this[tail] = null;
    }

    add(data){
        const newNode=new DoublyLinkListNode(data); 
        if(this[head]===null){
            this[head]=newNode;
        }else{
            this[tail].next=newNode;
            newNode.previous=this[tail];
        }
        this[tail]=newNode;
    }

    /**
     * 插入index 之前
     * @param {*} data 
     * @param {*} index 
     */
    insertBefore(data,index){
        const newNode=new DoublyLinkListNode(data); 
        if(this[head]===null){
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        if(index===0){
            newNode.next=this[head];
            this[head].previous=newNode;
            this[head]=newNode;
        }else{
            let i=0;
            let cur=this[head];
            while(cur.next && (i<index)){
                cur=cur.next;
                i++;
            }

            if(i<index){
                throw new RangeError(`Index ${index} does not exist in the list.`);
            }

            //cur.previous 前一个节点

            //1. 新节点的previous指针
            cur.previous.next=newNode;
            newNode.previous=cur.previous;

            //2. 新节点的next指针
            newNode.next=cur;
            cur.previous=newNode;
        }

    }
    /**
     * 插入在index之后
     * @param {*} data 
     * @param {*} index 
     */
    insertAfter(data,index){
        const newNode = new DoublyLinkedListNode(data);
        if (this[head] === null) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        let current=this[head];
        let i=0;
        while(current && (i<index)){
            current=current.next;
            i++;
        }

        if (i < index) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }

        //最后一个节点
        if(this[tail]===current){
            this[tail]=newNode;
        }else{
            //当前节点查找后面这个节点   current.next当前节点的后面节点

            current.next.previous=newNode;
            newNode.next=current.next;

        }

        newNode.previous=current;
        current.next=newNode;

    }

    get(index){
        if(index>-1){
            let current=this[head];
            let i=0;
            while(current  && (i<index)){
                current=current.next;
                i++;
            }

            return current?current.data:undefined;

        }else{
            return undefined
        }

    }

    indexOf(data){
        let current=this[head];
        let i=0;
        while(current){
            if(current.data===data){
                return i;
            }
            current=current.next;
            i++;

        }
        return -1;

    }

    find(matcher){
        let current=this[head];
        while(current){
            if(matcher(current.data)){
                return current.data;

            }
            current=current.next;
        } 
        return undefined;
    }


    findIndex(matcher){
        let current=this[head];
        let i=0;
        while(current){
            if(matcher(current.data)){
                return i;

            }
            current=current.next;
            i++;
        } 
        return -1;

    }

    //删除并且返回data
    remove(index){
       
        if ((this[head] === null) || (index < 0)) {
            throw new RangeError(`Index ${index} does not exist in the list.`);
        }
        if(index===0){
            const data=this[head].data;
            this[head]=this[head].next;
            if(this[head]===null){
                this[tail]=null;
            }else{
                this[head].previous=null;
            }
            return data;
        }

        let current=this[head];
        let i=0;
        while(current &&(i<index)){
            current=current.next;
            i++;
        }

        if(current){//删除当前节点
            current.previous.next=current.next;

            //更新tail指针
            if(this[tail]===current){
                this[tail]=current.previous;

            }else{
                current.next.previous=current.previous;
            }

            return current.data;
        }

        throw new RangeError(`Index ${index} does not exist in the list.`);
    }

    clear(){
        this[head]=null;
        this[tail]=null;
    }

    get Size(){
        if(this[head]===null){
            return 0;
        }

        const current=this[head];
        let count=0;
        while(current){
            current=current.next;
            ++count;
        }
        return count;
    }


    [Symbol.iterator](){
        return this.values();
    }

    *values(){
        let current = this[head];

       while(current){
           yield current.data;
           current=current.next;
       }
    }

    *reverse(){
        let current=this[tail];
        while(current){
            yield current.data;
            current=current.previous;
        }
    }

    toString(){
        return [...this].toString();
    }
}


exports.DoublyLinkedList = DoublyLinkedList;
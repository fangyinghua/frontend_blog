### 排序

排序一般考虑稳定性和是否为原地排序。

* 排序的分类：
    *  比较类排序：
        1. 交换排序 
            冒泡排序和快速排序
        2. 插入排序
            简单插入排序和希尔排序
        3. 选择排序
            简单选择排序和堆排序
        4. 归并排序
            二路归并排序和多路归并排序

    * 非比较

### 比较/交换
* 冒泡排序
    * 算法描述
        * `比较相邻`的元素。如果第一个比第二个大，就交换它们两个；
        * 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
        * 针对所有的元素重复以上的步骤，除了最后一个；
        * 重复步骤1~3，直到排序完成。
        ```js
        function bubbleSort(arr) {
            varlen = arr.length;
            for(vari = 0; i < len - 1; i++) {
                for(varj = 0; j < len - 1 - i; j++) {
                    if(arr[j] > arr[j+1]) {       // 相邻元素两两对比
                        vartemp = arr[j+1];       // 元素交换
                        arr[j+1] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            returnarr;
        }
        ```

* 快速排序

    * 算法描述

        * 快速排序`使用分治法`来把一个串（list）分为两个子串（sub-lists）
            * 从数列中挑出一个元素，称为 “基准”（pivot）;
            * 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为`分区（partition）操作`; 
            * `递归地（recursive）`把小于基准值元素的子数列和大于基准值元素的子数列排序;
            ```js
            function quickSort(arr,left,right){

                var len=arr.length,left=typeof left!=='number'?0:left,right=typeof right!=='number'?len-1:right,partitionIndex;

                if(left<right){
                    partitionIndex=partition(arr,left,right);//分区操作

                    //分区左边排序
                    quickSort(arr,left,partitionIndex-1);
                    //分区右边排序
                    quickSort(arr,partitionIndex+1,right);
                }

                return arr;
            }

            function partition(arr,left,right){
                var pivot=left,
                index=pivot+1;
                for(var i=index;i<=right;++i){
                    if(arr[i]< arr[pivot]){
                        swap(arr,i,index)
                        index++;
                    }
                }
                swap(arr,pivot,index-1);
                return index-1;
            }
            ```


### 插入排序


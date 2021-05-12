# git 三个分区


* working directory 工作目录
git add 把 work dir 中的修改 添加到`[暂存区]`stage area(或者叫index area).

* stage/index area 暂存区
git commit 会把stage中的修改保存到[提交历史] `commit history`中。`HEAD指针`指向的位置. 


* commit history [提交历史] -- (HEAD指针)
任何修改只要进入commit history基本认为不会丢失;
每个commit都有一个唯一的hash值;


* work dir 和stage区域的状态，可以通过git status来查看；
* commit history区域提交历史可以通过git log 命令查看






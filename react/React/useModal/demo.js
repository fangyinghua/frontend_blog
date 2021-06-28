/**
 * 使用方法
 */
const openModal = () => {
  const result = modalRef.open({
    title: "提交成功",
    footer: [
      {
        text: "取消",
        onPress: () => {
          result?.destroy();
        },
      },
    ],
    onCancel: () => {
      history.push("/teamManagement");
    },
    content: (
      <div className={styles.title} onClick={showApplicationRecord}>
        查看申请记录
      </div>
    ),
  });
};

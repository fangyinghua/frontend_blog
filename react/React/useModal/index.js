import React, { useState,useEffect } from "react";
import { Modal } from "antd-mobile";
import ReactDOM from "react-dom";

const destroyFns = [];

export default function useModal() {
  const [visible, setVisible] = useState(true);
  const div = document.createElement("div");
  document.body.appendChild(div);

  const render = (props) => {
    setTimeout(() => {
      ReactDOM.render(
        <Modal
          {...props}
          visible={visible}
          transparent
          onCancel={() =>
            destroy({
              onCancel: props.onCancel,
            })
          }
          onClose={() =>
            destroy({
              onCancel: props.onCancel,
            })
          }
        >
          {props.content}
        </Modal>,
        div
      );
    });
  };

  function destroy(config) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    if (config.onCancel && typeof config.onCancel ==='function') {
      config.onCancel();
      setVisible(false);
    }

    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  const getConfirmFunc = React.useCallback(
    () =>
      function hookConfirm(config) {
        render(config);
        destroyFns.push(close);
        return {
          destroy: () => destroy(config),
        };
      },
    []
  );

  useEffect(()=>{
    return ()=>destroy();
  },[])

  const fns = React.useMemo(
    () => ({
      open: getConfirmFunc(),
    }),
    []
  );

  return [fns];
}

import React, { useState, useRef } from "react";
import { List } from "antd-mobile";
import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./index.less";

export default () => {
  const [iconActive, setIconActive] = useState(styles.navList_icon_default);
  const ListRef1 = useRef(null);
  const ListRef2 = useRef(null);
  const [active, setActive] = useState(0);

  const [dataNavList, setDataNavList] = useState([
    {
      ref: ListRef1,
      key: 1,
      height: 0,
      changeStyle: styles.show,
      styleDisplay: styles.test1,
      // icon: styles.navList_icon_default,
      list: [
        {
          key: 1,
          text: "content 1",
        },
        {
          key: 4,
          text: "content 2",
        },
        {
          key: 2,
          text: "content 3",
        },
        {
          key: 3,
          text: "content 322",
        },
      ],
    },
    {
      ref: ListRef2,
      key: 2,
      height: 0,
      changeStyle: styles.show,
      styleDisplay: styles.test1,
      // icon: styles.navList_icon_default,
      list: [
        {
          key: 12,
          text: "content 16111",
        },
        {
          key: 124,
          text: "content 212",
        },
        {
          key: 221,
          text: "content 3111",
        },
        {
          key: 311,
          text: "content 321112",
        },
        {
          key: 228901,
          text: "content 3111",
        },
        {
          key: 31166,
          text: "content 321112",
        },
      ],
    },
  ]);

  const change = (i) => {
    const cloneArr = [...dataNavList];

    const item = cloneArr[i];
    const currentRef = item.ref?.current;
    const height = currentRef?.firstChild?.scrollHeight;
    item.changeStyle = styles.show;

    setIconActive((pre) => {
      if (pre === styles.navList_icon_default) {
        return styles.navList_icon_active;
      } else {
        return styles.navList_icon_default;
      }
    });

    setActive(i);

    if (item.height === 0) {
      item.height = height;
      item.styleDisplay = styles.test3;
      setIconActive(styles.navList_icon_active);
    } else {
      item.height = 0;
      item.styleDisplay = styles.test1;
      setIconActive(styles.navList_icon_default);
    }

    if (i === 0) {
      cloneArr[1].height = 0;
      cloneArr[1].styleDisplay = styles.test1;
    } else {
      cloneArr[0].height = 0;
      cloneArr[0].styleDisplay = styles.test1;
    }

    cloneArr[i] = item;
    setDataNavList(cloneArr);
  };

  const NavListData = [
    {
      text: "状态排序",
      key: 1,
    },
    {
      text: " 按发布/接单时间排序",
      key: 2,
    },
  ];

  const list = () => {
    return (
      <>
        {dataNavList.map((item, index) => (
          <div ref={item.ref} key={item.key} className={styles.head}>
            <List
              className={`${item.changeStyle} ${item.styleDisplay}`}
              style={{
                height: item.height,
              }}
            >
              {item.list.map((item) => (
                <List.Item key={item.key}>{item.text}</List.Item>
              ))}
            </List>
          </div>
        ))}
      </>
    );
  };
  return (
    <>
      <div className={styles.navList}>
        {NavListData.map((item, index) => (
          <div
            onClick={() => change(index)}
            className={`${styles.navList_item} ${
              active === index && styles.navList_active
            }`}
            key={item.key}
          >
            {item.text}
            <CaretDownOutlined
              className={`${index === active && iconActive}`}
            />
          </div>
        ))}
      </div>
      {list()}
    </>
  );
};

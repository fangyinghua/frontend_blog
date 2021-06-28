/**
 * 队伍入驻
 */
import React, { useRef, useState } from "react";
import { message } from "antd";
import { List } from "antd-mobile";

import FixedButton from "@/components/FixedButton";
import Form, {
  useForm,
  InputItem,
  Picker,
  TextareaItem,
  Radio,
  ImagePicker,
  Uploader,
} from "@/components/Form/components";
import AreaTree from "@/components/AreaTree";

import { useTitle } from "@/hooks/useTitle";

import { IDCard } from "@/utils/rules";
import { typeEnum, organizationLevelEnum, registerStatusEnum } from "./content";

import { uploadPicture } from "@/services/global";

import styles from "./index.less";

export default ({ route }) => {
  useTitle(route.title);
  const [form] = useForm();
  const registerStatusRef = useRef();
  const [files, setFiles] = useState([]);
  const [filename, setFilename] = useState("");
  const headImageRef = useRef();
  const applyFileRef = useRef();
  const inputRef = useRef();

  const onSubmit = async () => {
    console.log(form);
    const result = form.getFieldsValue();
    // const result = await form.validateFields();

    console.log(result);
  };

  const onChangePickerImg = async (files) => {
    const hide = message.loading("上传图片中", 0);
    const formData = new FormData();
    const fileItem = files[0];
    if (fileItem.file) {
      formData.append("file", fileItem.file);
      const result = await uploadPicture(formData);
      if (result?.status === 200 && result?.data?.success) {
        headImageRef.current = result?.data?.data;

        setFiles(files);
        setTimeout(() => {
          hide();
        }, 100);
      } else {
        hide();
        message.error("上传图片失败");
      }
    }
  };

  const onChangeRegisterStatus = (v) => {
    registerStatusRef.current = v;
  };

  const uploaderApplyFile = async (e) => {
    const files = e.target.files[0];
    if (files) {
      const formData = new FormData();
      formData.append("file", files);

      const result = await uploadPicture(formData);
      if (result?.status === 200 && result.data?.success) {
        applyFileRef.current = result.data.data;
        setFilename(files.name);
      }
    }
  };

  const handlerClick = () => {
    const target = inputRef.current;
    target.click();
    target.onchange = uploaderApplyFile;
  };

  return (
    <Form form={form} onFinish={onSubmit} name="basic">
      <List className={styles.wrap}>
        <InputItem
          name="contactorName"
          rules={[{ required: true, message: "请输入您的组织名称" }]}
          placeholder="请输入您的组织名称"
          title="组织名称"
        ></InputItem>

        <Radio
          name="registerStatus"
          rules={[{ required: true, message: "请选择您组织的登记状态" }]}
          title="登记状态"
          data={registerStatusEnum}
          onChange={onChangeRegisterStatus}
        ></Radio>

        <Picker
          name="teamType"
          rules={[{ required: true, message: "请输入您组织的组织类型" }]}
          extra="请选择您组织的组织类型"
          data={typeEnum}
          title="组织类型"
        ></Picker>
        <Picker
          name="areaLevel"
          rules={[{ required: true, message: "请选择您的组织层级" }]}
          extra="请选择您的组织层级"
          data={organizationLevelEnum}
          title="组织层级"
        ></Picker>

        <AreaTree
          rules={[{ required: true, message: "请选择所在省市区" }]}
          name="areaCode"
          extra="请选择组织所在省市区"
          onOk={(value) => {
            form.setFieldsValue({
              areaCode: value,
            });
          }}
          label={
            <>
              <span className={styles.require}>*</span>组织所在省市区
            </>
          }
        />

        <InputItem
          name="name"
          rules={[{ required: true, message: "请输入联系人" }]}
          placeholder="请输入联系人"
          title="联系人"
        ></InputItem>

        <InputItem
          name="contactorIdNumber"
          rules={[
            { required: true, message: "请输入您的身份证号码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (IDCard.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("请输入正确的身份证号"));
                }
              },
            }),
          ]}
          placeholder="请输入您的身份证号码"
          title="身份证号码"
        ></InputItem>

        <InputItem
          name="contactorMobile"
          rules={[{ required: true, message: "请输入手机号" }]}
          placeholder="请输入手机号"
          title="手机号"
        ></InputItem>

        <InputItem
          name="contactorEmail"
          rules={[{ required: true, message: "请输入您的邮箱" }]}
          placeholder="请输入您的邮箱"
          title="邮箱"
        ></InputItem>

        {/* 申请函 */}
        <Uploader
          name="applyFile"
          rules={[{ required: true, message: "请上传您的组织申请函" }]}
          onchange={uploaderApplyFile}
          filename={filename}
          title="组织申请函"
          placeholder="上传"
        ></Uploader>

        <ImagePicker
          files={files}
          name="headImage"
          rules={[{ required: true, message: "请选择组织logo" }]}
          title="组织logo"
          onChange={onChangePickerImg}
          size={1}
        ></ImagePicker>

        <TextareaItem
          name="introduction"
          rules={[{ required: true, message: "请输入组织介绍，不少于50字" }]}
          placeholder="请输入组织介绍，不少于50字"
          title="组织介绍"
        ></TextareaItem>

        <TextareaItem
          name="count"
          rules={[{ required: true, message: "请输入申请原因，不少于15字" }]}
          placeholder="请输入申请原因，不少于15字"
          rows={3}
          title="申请原因"
          count={15}
        ></TextareaItem>
      </List>
      <FixedButton text="提交" onClick={onSubmit}></FixedButton>
    </Form>
  );
};

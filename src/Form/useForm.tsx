import React, { useRef } from "react";

class FormStore {
  // stroe 用来存储表单数据，它的格式：{"username": "lion"}
  private store: any = {};
  // 用来存储每个 Field 的实例数据，因此在store中可以通过 fieldEntities 来访问到每个表单项
  private fieldEntities: any = [];

  // 表单项注册到 fieldEntities
  registerField = (entity: any) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item: any) => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  // 获取单个字段值
  getFieldValue = (name: string) => {
    return this.store[name]
  }
  // 获取所有字段值
  getFieldsValue = () => {
    return this.store
  }
  // 设置字段的值
  setFieldsValue = (newStore: any) => {
    // 更新store的值
    this.store = {
      ...this.store,
      ...newStore,
    }
    // 通过 fieldEntities 获取到所有表单项，然后遍历去调用表单项的 onStoreChange 方法更新表单项
    this.fieldEntities.forEach((entity: any) => {
      const { name } = entity.props
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange()
        }
      })
    })
  }
  // 提交数据，这里只简单的打印了store中的数据。
  submit = () => {
    console.log(this.getFieldsValue());
  }
  // 提供FormStore实例方法
  getForm = (): any => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    registerField: this.registerField,
    submit: this.submit,
  });
}
// 创建单例formStore
export default function useForm(form: any) {
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm() as any;
    }
  }
  return [formRef.current]
}

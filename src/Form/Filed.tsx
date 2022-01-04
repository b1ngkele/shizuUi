import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  // Filed 组件获取 FieldContext
  static contextType = FieldContext;

  private cancelRegisterFunc: any;
  // Field 挂载时，把自己注册到FieldContext中，也就是上面提及的 fieldEntities 数组中。
  componentDidMount() {
    const { registerField } = this.context;
    this.cancelRegisterFunc = registerField(this);
  }
  // Field 组件卸载时，调用取消注册，就是从 fieldEntities 中删除。
  componentWillUnmount() {
    if (this.cancelRegisterFunc) {
      this.cancelRegisterFunc()
    }
  }
  // 每个 Field 组件都应该包含 onStoreChange 方法，用来更新自己
  onStoreChange = () => {
    // 主动更新一下组件
    this.forceUpdate()
  }
  // Field 中传进来的子元素变为受控组件，也就是主动添加上 value 和 onChange 属性方法
  getControlled = () => {
    const { name } = this.props as any;
    const { getFieldValue, setFieldsValue } = this.context
    return {
      value: getFieldValue(name),
      onChange: (event: any) => {
        const newValue = event.target.value
        setFieldsValue({ [name]: newValue })
      },
    }
  }

  render() {
    const { children } = this.props as any;
    return React.cloneElement(children, this.getControlled())
  }
}

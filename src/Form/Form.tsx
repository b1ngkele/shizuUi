import React from "react";
import useForm from "./useForm";
import FieldContext from './FieldContext';

export default function Form(props: any) {
  const { form, children, ...restProps } = props;
  const [formInstance] = useForm(form) as any;

  return <form
    {...restProps}
    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      // 调用了formInstance 提供的submit方法
      formInstance.submit();
    }}
  >
    {/* formInstance 当做全局的 context 传递下去 */}
    <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
  </form>
}


## Form

Demo:

```tsx
import React,{useEffect} from 'react';
import { Foo, Form, Field, useForm } from 'shizuUI';


export default (props) => {
  const [form] = useForm()
  const Input = props => {
    const { value, ...restProps } = props;
    return <input {...restProps} value={value} />;
  };
  useEffect(() => {
    form.setFieldsValue({username: 'lion'})
  }, [])

  return (
    <Form form={form}>
      <Field name='username'>
        <Input placeholder='请输入姓名' />
      </Field>
      <Field name='password'>
        <Input placeholder='请输入密码' />
      </Field>
      <button>提交</button>
    </Form>
  )

};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo

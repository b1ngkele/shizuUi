import * as React from 'react';

const warningFunc: any = () => {
  console.log("warning");
};

const Context = React.createContext<any>({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  setFieldsValue: warningFunc,
  registerField: warningFunc,
  submit: warningFunc,
});

export default Context;

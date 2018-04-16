import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);//values:查询字段的值
      }
    });
  }

  // 支持字母、数字、下划线
  handleVerify = (rule, value, callback) => {
    const reg = /[^A-Z|a-z|0-9|_]+/g;
    if (value && value.match(reg)) {
      callback('只允许输入字母、数字、下划线');
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const required = {
      required: true,
      message: 'Please input your username!',
    };

    return (
      <Form onSubmit={this.handleSubmit} >
        <FormItem {...formItemLayout}>
          {getFieldDecorator('userName', {
            rules: [
              required,
              { validator: this.handleVerify },
            ],
          })(
            <Input placeholder="Username" style={{width:300}}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));


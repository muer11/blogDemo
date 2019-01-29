
import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import axios from 'axios';
import Qs from 'qs';
import Register from '../register/index';
import ModelContent from '../modal/index';
import WrappedChangePasswordForm from '../changePassword/index';
require('./login.scss');

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', Qs.stringify(values));
        axios.post('/user/doLogin', Qs.stringify(values), {
          'Content-Type': 'application/x-www-form-urlencoded'
        }).then(function (res) {
          console.log(res);
          // changeNameInfo(rule, res.data, callback);
          switch (res.data) {
            case 1:
              this.changeNameInfo('登录成功');
              break;
            case -1:
              this.changeNameInfo('该账号未注册');
              break;
            case -2:
              this.changeNameInfo('用户名或密码错误');
              break;
            case -3:
              this.changeNameInfo('服务器错误');
              break;
            default:
              this.changeNameInfo();
          }
        });
      }
    });
  }

  changeNameInfo (rule, value, callback) {
    callback(value);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <ModelContent tips="修改密码" name='修改密码'><WrappedChangePasswordForm /></ModelContent>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <ModelContent tips="注册" name='注册'><Register/></ModelContent>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

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
  state = {
    promptMsg: "",
    show: false,
    isModel: false,
  }

  //登录提交
  handleLoginSubmit = (e) => {
    const _this = this;
    e.preventDefault();
    _this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/user/doLogin', Qs.stringify(values), {
          'Content-Type': 'application/x-www-form-urlencoded'
        }).then(function (res) {
          _this.changeNameInfo(res);
        });
      }
    });
  }

  //登录信息反馈
  changeNameInfo(res) {
    console.log(res);
    let value="";
    switch (res.data.ret_code) {
      case 0:
        value = '登录成功';
        this.props.callback(res.data);
        break;
      case -1:
        value = '用户名或密码错误'; //实则“该账号未注册”，尽可能降低提示信息的准确性
        break;
      // case -2:
      //   value = '用户名或密码错误';
      //   break;
      // case -3:
      //   value = '服务器错误';
      //   break;
      default:
        value = '用户名或密码错误';
    }
    this.setState({
      promptMsg: value,
      show: true,
    })
  }
  //及时关闭登录失败提示语
  changeInput() {
    if (this.state.show) {
      this.setState({
        show: false,
      })
    }
  }

  //显示弹出框
  showModel(bool){
    console.log("showModel------------");
    console.log(bool);
    this.setState({
      isModel: bool
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleLoginSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"  onChange={this.changeInput.bind(this)}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={this.changeInput.bind(this)}/>
            )}
          </FormItem>
          {/* 登录失败提示语 */}
          <p className={this.state.show ? "show": "hide" } style={{color: "red"}}>{this.state.promptMsg}</p>  
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
          </FormItem>
        </Form>
        <div className="register">
            或 <ModelContent tips="注册" name='注册' isModel={this.state.isModel}><Register showModel={this.showModel.bind(this)}/></ModelContent>
        </div>    
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import axios from 'axios';
import Qs from 'qs';
import Register from '../register/index';
import ModelContent from '../modal/index';
import WrappedChangePasswordForm from '../changePassword/index';
import { loginFunc } from './../../api/api';
import {connect} from "react-redux";
import {addUser} from "../../redux/actions/user-actions";
import PerTips from "../../containers/personal/tips"; 
require('./login.scss');

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    promptMsg: "",
    show: false,
    isModel: false,
  }

  initState = state =>{
    return 
  }

  //登录提交
  handleLoginSubmit = async (e) => {
    e.preventDefault();
    // let _this = this;
    let formdata = null; 
    this.props.form.validateFields((err, values) => {
      if(!err){
        formdata = values;
      }
    })
    // let data = null;
    if (formdata != null) {
      //异常捕获
      try{
        let res = await loginFunc(formdata);
        if(res.success){
          if(res.code === 0){
            this.props.callback(res);
          }
          this.setState({
            promptMsg: res.msg,
            show: true,
          });
          
          // const mapStateToProps = (state) => {
          //   return {
          //     data: [{...state.user},data.data],
          //     show: true,
          //   }
          // }
          
          // const mapDispatchToProps = (dispatch) => {
          //   return {
          //     onClick: () => {
          //       // dispatch(setVisibilityFilter(ownProps.filter))
          //       console.log(1111);
          //     }
          //   }
          // } 
          // connect(
          //   mapStateToProps,
          //   mapDispatchToProps
          // )(PerTips)
        }else{
          console.log(res.msg);
        }
      }catch(err){
        console.log("login error:"+err);
      }
    }
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
    // console.log("showModel------------");
    // console.log(bool);
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
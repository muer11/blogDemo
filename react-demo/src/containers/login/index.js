
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import Register from '../register';
import ModelContent from '../../components/modal';
// import WrappedChangePasswordForm from '../changePassword/index';
// import { loginFunc } from './../../api/api';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {loginUser} from "../../redux/actions/user-actions";
// import PerTips from "../../containers/tip/tip"; 
require('./login.scss');

const FormItem = Form.Item;

class LoginForm extends React.Component {
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
    // console.log("formdata");
    // console.log(formdata);
    // console.log(this.props);
    const {dispatch} = this.props;
    // let data = null;
    if (formdata != null) {
      dispatch(loginUser(formdata));
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
    console.log("render");
    console.log(this.props)
    // const {handleLoginSubmit} = this.props;
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
            {/* <ModelContent tips="修改密码" name='修改密码'><WrappedChangePasswordForm /></ModelContent> */}
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

const Login = Form.create()(LoginForm);

const mapStateToProps = state => {
    console.log("mapStateToProps state")
    console.log(state)
    return {
        // articleList: state.article.articleList
    }
}

// const mapDispatchToProps = dispatch => {  
//     return {
//         handleLoginSubmit: e => {
//           e.preventDefault();
//           console.log(e);
//           let formdata = null;
//           // this.props.form.validateFields((err, values) => {
//           //   if(!err){
//           //     formdata = values;
//           //   }
//           // })
//           // console.log(formdata);
//             // dispatch(listTag(id))
//         } 
//     }
// }

Login.PropTypes = {
    handleLoginSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Login);
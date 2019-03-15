import React from 'react';
import {Form, Input, Select, Button} from 'antd';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {addUser} from "../../redux/actions/user-actions";
import {registerFunc} from './../../api/api';
const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  //注册
  handleRegisterSubmit = async (e) => {
    // const _this = this;
    e.preventDefault();
    let formData = null;
    let {form, dispatch} = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        formData = values;
      }
    });
    if(formData != null){
      dispatch(addUser(formData));
      this.props.showModel(false);
      // console.log(formData)
      // let data = await registerFunc(formData);
      // console.log(data);
      // if (data.code == 0) {
      //   this.props.showModel(false);
      // }
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  //密码比对
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码不一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  // handleWebsiteChange = (value) => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    return (
      <Form onSubmit={this.handleRegisterSubmit}>
        <FormItem {...formItemLayout} label={(<span>用户名</span>)}>
          {getFieldDecorator('username', {rules: [{ required: true, message: '请输入用户名!', whitespace: true }],})(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {rules: [{required: true, message: '请输入密码!'}, {validator: this.validateToNextPassword}]})(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码">
          {getFieldDecorator('confirm', {rules: [{required: true, message: '请确认密码!'}, {validator: this.compareToFirstPassword}]})(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator('email', {rules: [{type: 'email', message: '该E-mail不可用!'}, {required: true, message: '请输入E-mail!'}]})(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="电话号码">
          {getFieldDecorator('phone', {rules: [{required: true, message: '请输入你的电话号码!'}]})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
    );
  }
}

const Register = Form.create()(RegistrationForm);
Register.PropTypes = {
  // currentUser: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
const mapStateToProps = state => {
  console.log("mapStateToProps state")
  console.log(state)
  return {
    // articleList: state.article.articleList
  }
}
export default connect(mapStateToProps)(Register);
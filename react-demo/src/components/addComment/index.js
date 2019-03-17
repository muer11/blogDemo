import React from 'react';
import {
  Comment, Avatar, Form, Button, List, Input, Icon, Tooltip
} from 'antd';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addComment} from "../../redux/actions/comment-actions";

const TextArea = Input.TextArea;
const Editor = ({
    onChange, onSubmit, submitting, value,
  }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange}/>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"  
        >
          发表
        </Button>
      </Form.Item>
    </div>
  );

class AddComment extends React.Component{
    state={
        comments: [],
        value: "",
        submitting: false,
    }

    //改变留言内容
    handleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
          value: e.target.value,
        });
    }

    //发表评论
    handleSubmit = async () => {
        const commentText = this.state.value;
        let {dispatch} = this.props;
        if (!commentText) {
            return;
        }
        this.setState({
            submitting: true,
        });

        let formData = {
            "commentText": commentText,
            "articleId":  this.props.articleId,
            "parentId": this.props.parentId ? this.props.parentId : null,
            "toUserId": this.props.toUserId ? this.props.toUserId : null,
        };
        dispatch(addComment(formData));
        // let res = await doCommentFunc(formData);
        // // console.log(res);

        // setTimeout(() => {
        // this.setState({
        //     submitting: false,
        //     value: '',
        //     comments: [
        //     {
        //         author: this.state.username,
        //         avatar: this.state.avatar,
        //         content: this.state.value,
        //         datetime: moment().fromNow(),
        //         like: 0,
        //     },
        //     ...this.state.comments,
        //     ],
        // });
        // }, 1000);
    }

    render(){
        const { comments, submitting, value } = this.state;
        return (<Comment
        // actions={actions}
        avatar={(
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            // alt={this.state.author}
          />
        )}
        // author={this.state.author}
        content={(
          <Editor  
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
          />
        )}
      />)
    }
}

const mapStateToProps = state => {
    console.log("mapStateToProps state")
    console.log(state)
    return {
        // : state.article.articleList
    }
}

AddComment.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    // comments: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(AddComment);
import React from 'react';
import { Modal, Button } from 'antd';
require('./modal.scss');

class ModelContent extends React.Component {
  state = { 
    visible: false,
    name: this.props.name,
    type: this.props.children,
    tips: this.props.tips,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className="registerTip">
        {/* <Button type="primary" onClick={this.showModal}>
          {this.props.name}
        </Button> */}
        <a href="javascript:;" onClick={this.showModal}>{this.state.tips}</a>
        <Modal
          title={this.state.name}
          visible={this.state.visible}
          footer={null}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.type}
        </Modal>
      </div>
    );
  }
}

export default ModelContent;
import React from 'react';
import RcUeditor from 'react-ueditor-wrap';
import './ueditor.scss';

class Ueditor extends React.Component {

  hanldeChage = (value) => {
      console.log('RcUeditor', value);
  }

  render() {
      return (
          <div className='ueditor'>
              <RcUeditor onChange={this.hanldeChage} />
          </div>
      );
  }
}

export default Ueditor;
import React from "react";
import PropTypes from 'prop-types';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const Tab = ({tagInfo}) => {
    let TabPane = tagInfo.map((item, index) => {
         (
            <TabPane tab={item.name} key={index}>
                {item.content}
            </TabPane>
        )
    })
    return (
        <Tabs defaultActiveKey="0" onChange={this.showList.bind(this)}>
            {this.TabPane}
        </Tabs>
    )
        
}

Tab.PropTypes = {
    tagInfo: PropTypes.object.isRequired,
}

export default Tab;
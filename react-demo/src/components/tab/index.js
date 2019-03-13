import React from "react";
import PropTypes from 'prop-types';
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const Tab = ({tags, listTags}) => {
    console.log("tags:");
    console.log(tags);

    return (
        <div>
            <Tabs defaultActiveKey="0" onChange={listTags}>
                {tags.map(
                    (tag, index) => {
                        return (<TabPane tab={tag.name} key={index}>Content of Tab Pane {index}</TabPane>)
                    })
                }
            </Tabs>
        </div>
    )  
}

Tab.PropTypes = {
    tags: PropTypes.object.isRequired,
}

export default Tab;
import React from "react";
import PropTypes from 'prop-types';
import {Tabs} from 'antd';
import ArticleList from "../../containers/articleList";

const TabPane = Tabs.TabPane;
const Tab = ({tags, listTagArticles}) => {
    // console.log("tags:");
    // console.log(tags);
    // console.log(listTagArticles);

    return (
        <div>
            <Tabs defaultActiveKey={tags[0]._id} onChange={listTagArticles}>
                {tags.map(
                    (tag, index) => {
                        return (<TabPane tab={tag.name} key={tag._id}><ArticleList/></TabPane>)
                    })
                }
            </Tabs>
        </div>
    )  
}

Tab.PropTypes = {
    tags: PropTypes.object.isRequired,
    listTagArticles: PropTypes.func.isRequired,
}

export default Tab;
import React from "react";
import PropTypes from 'prop-types';
import {List,Icon} from 'antd';

// const TabPane = Tabs.TabPane;
const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} theme={theme}/>
    {text}
  </span>
);

const Lists = ({tags, listTags}) => {
    console.log("tags:");
    console.log(tags);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 6,
            }}
            dataSource={this.state.listData}
            renderItem={item => (
                <List.Item
                    key={item.title} 
                    actions={
                        item.isLike ? ([
                            <IconText type="null" text={item.type} />, 
                            <IconText type="like" text={item.likeNum} theme="filled"/>, 
                            <IconText type="message" text={item.replyNum} />, 
                            <IconText type="time" text={item.date} />
                        ]): ([
                            <IconText type="null" text={item.type} />, 
                            <IconText type="like-o" text={item.likeNum} />, 
                            <IconText type="message" text={item.replyNum} />, 
                            <IconText type="time" text={item.date} />
                        ]) 
                    }
                >
                    <List.Item.Meta
                        title={<a onClick={()=>{this.showArticle(item.articleId)}}>{item.title}</a>} 
                    />
                </List.Item>
            )}
        />
    ) 
}

Lists.PropTypes = {
    lists: PropTypes.object.isRequired,
}

export default Lists;
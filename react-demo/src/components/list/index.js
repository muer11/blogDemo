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

const Lists = ({articleList, listTags}) => {
    // console.log("articleList:");
    // console.log(articleList);
    let listData = [];
    articleList.map(function (value, index) {
        listData.push({
            articleId: value._id,
            title: value.title,
            type: value.tagName, //类型
            date: new Date(value.date).toLocaleString(),
            likeNum: value.likeNum, //点赞数
            replyNum: value.replyNum ? value.replyNum : 0, //评论数
            isLike: value.isLiked,
        })
    });
    // console.log("listData:")
    // console.log(listData)
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
            dataSource={listData}
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
                        title={<a onClick={()=>{
                            // this.showArticle(item.articleId)
                            console.log(item.articleId)
                        }}>{item.title}</a>} 
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
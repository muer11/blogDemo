// 首页文章列表
import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon } from 'antd';
import Article from '../article/index';
import './contentList.scss';
import { getTagArticleFunc } from '../../api/api';


// const listData = [];
// const href = {Article};
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: "/article?type=JavaScript&id=1",
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description: '121Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ type, text, theme }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} theme={theme}/>
    {text}
  </span>
);

class ContentList extends React.Component{
    state = {
        tagId: this.props.tagId,
        listData: [],
        
    }

    showArticle(articleId){
        this.props.showArticle(false, articleId);
    }

   async componentDidMount(){
        var _this = this;
        let params = "isPublished=true&tagId=" + this.state.tagId;
        let res = await getTagArticleFunc(params);
        const data = res.data;
        let listData = [];
        data.map(function(value, index){
            listData.push({
                articleId: value.id,
                title: value.title,
                type: value.tagName, //类型
                date: new Date(value.date).toLocaleString(),
                likeNum: value.likeNum, //点赞数
                replyNum: value.replyNum ? value.replyNum : 0, //评论数
                isLike: value.isLiked,
                // message: value.content, //评论数
                // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                // description: '121Ant Design, a design language for background applications, is refined by Ant UED Team.',
                // content: ''
            })
        });
        // console.log(listData);
        _this.setState({
            listData: listData
        });
        
        console.log(listData);
        // axios.get("/api/article/getTagArticle?isPublished=true&tagId=" + this.state.tagId).then(function (res) {
        // })
    }


    render(){

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
                // footer={<div><b>ant design</b> footer part</div>}
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
                        // extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        title={<a onClick={()=>{this.showArticle(item.articleId)}}>{item.title}</a>} 
                        // description={item.description}
                        />
                        {/* {item.content} */}
                    </List.Item>
                )}
            />
        )
    }
}

export default ContentList;
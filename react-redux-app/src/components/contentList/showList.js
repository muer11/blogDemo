// 首页文章列表

import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon } from 'antd';
import Article from '../article/index';
import './contentList.scss';

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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ContentList extends React.Component{
    state = {
        tagId: this.props.tagId,
        listData: []
    }

    componentWillMount(){
        console.log("tagId:"+this.state.tagId);
        var _this = this;
        axios.get("http://localhost:3000/getTagArticle?isPublished=true&tagId=" + this.state.tagId).then(function (res) {
            const data = res.data.allResult;
            let listData = [];
            data.map(function(value, index){
                console.log(value);
                listData.push({
                    href: "/article?articleId="+value.id,
                    title: value.title,
                    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    // description: '121Ant Design, a design language for background applications, is refined by Ant UED Team.',
                    content: ''
                })
            });
            _this.setState({
                listData: listData
            })
        })
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
                footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        // title={<a href={item.href}>{item.title}</a>} onClick={(id)=>{this.changeContent(id)}}
                        title={<a href={item.href}>{item.title}</a>} 
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
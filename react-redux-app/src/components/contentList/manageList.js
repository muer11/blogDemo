import React from 'react';
import { List, Avatar, Icon, Button } from 'antd';
import './manageList.scss';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ManageList extends React.Component{
    render(){
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 10,
                }}
                dataSource={listData}
                // footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />, <IconText type="time" text="2018-12-19 15:27" />, <a>编辑</a>, <a>删除</a>, <a>查看</a>]}
                >
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                    />
                    <div>{item.content}</div>
                </List.Item>
                )}
            />
        )
    }
}

export default ManageList;
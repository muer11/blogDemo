// admin 文章列表

import React from 'react';
import { List, Avatar, Icon, Button, Select } from 'antd';
import axios from 'axios';
import Qs from 'qs';
import './manageList.scss';

const listData = [];
const Option = Select.Option;
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}



class ManageList extends React.Component{
    handleTypeChange = (value) => {
        console.log(`selected ${value}`);
    }
    handleSortChange = (value) => {
        console.log(`selected ${value}`);
    }

    componentWillMount(){
        axios.get("http://localhost:3000/getArticle?'userId'=1&'isPublished'=true").then(function (res) {
            console.log(res);
        });
    }

    render(){
        return (
            <div>
                <div className="selectItem">
                    文章分类：
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={this.handleTypeChange}
                        // defaultValue = "Javascript"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Javascript">Javascript</Option>
                        <Option value="Css">Css</Option>
                        <Option value="React">React</Option>
                        <Option value="Vue">Vue</Option>
                        <Option value="Node">Node</Option>
                    </Select> 
                    排序：
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择"
                        optionFilterProp="children"
                        onChange={this.handleSortChange}
                        defaultValue = "时间"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="时间">时间</Option>
                        <Option value="阅读量">阅读量</Option>
                        <Option value="点赞量">点赞量</Option>
                    </Select> 
                </div>
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
            </div>
        )
    }
}

export default ManageList;
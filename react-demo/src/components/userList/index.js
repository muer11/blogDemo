import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { getUsersFunc, deleteUserFunc } from '../../api/api';
require("./userList.scss")

class UserList extends React.Component{
    state = {
        titleName: [{
            title: '名字',
            dataIndex: 'username',
            key: 'username',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: '电话号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>{this.editUser(record.id)}}>编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={()=>{this.deleteUser(record.id)}}>删除</a>
                </span>
            ),
        }
            // {
            //     title: 'Tags',
            //     key: 'tags',
            //     dataIndex: 'tags',
            //     render: tags => (
            //         <span>
            //         {tags.map(tag => {
            //             let color = tag.length > 5 ? 'geekblue' : 'green';
            //             if (tag === 'loser') {
            //             color = 'volcano';
            //             }
            //             return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
            //         })}
            //         </span>
            //     ),
            // }, 
        ],
        data : null
    }
    editUser(id){
        console.log(id);
    }

    async deleteUser(id){
        console.log(id);
        let res = await deleteUserFunc(id);
        console.log(res);
    }
    async componentDidMount(){
        let res = await getUsersFunc();
        console.log(res);
        this.setState({
            data: res.data
        });

    }

    render(){
        return <Table columns={this.state.titleName} dataSource={this.state.data} />
    }
}

export default UserList;
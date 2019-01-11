import React from 'react';
import AdminMenu from '../../components/menu/index';
import ManageList from '../../components/contentList/manageList';
import EditableTagGroup from '../../components/tag/index';
import AddArticle from '../../components/ueditor/index';
import Drafts from '../../components/drafts/index';
import './index.scss';

class Personal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemName: 'article'
        }
    }
    
    renderContent(itemName) {
        // console.log("itemName:" + itemName);
        switch (itemName) {
            case 'article': // 已发表
                return <ManageList className = 'list' /> ;
            case 'unpublishArticle': // 草稿箱
                return <Drafts/>;
            case 'addArticle': // 写文章
                return <AddArticle/>;
            case 'tag': // 标签管理
                return <EditableTagGroup/>;
            case 'comment': // 评论管理
                return <EditableTagGroup/>;
            default:
                return null;
        }
    }

    getMenuItem(item){
        this.setState({
            itemName: item.itemName
        });
        // console.log(this.state.itemName);
        this.renderContent(this.state.itemName)
    }

    render(){
        return (
            <div className='personal'>
                <AdminMenu onClick={this.getMenuItem.bind(this)}/>
                {/* <ManageList className='list'/>
                <EditableTagGroup/>
                <Ueditor/>  */}
                {this.renderContent(this.state.itemName)}
            </div>
        )
    }
}

export default Personal;
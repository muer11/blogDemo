import React from 'react';
import AdminMenu from '../../components/menu/index';
import ManageList from '../../components/contentList/manageList';
import EditableTagGroup from '../../components/tag/index';
import AddArticle from '../../components/ueditor/index';
import './index.scss';

class Personal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            itemName: 'article'
        }
    }
    
    renderContent(itemName) {
        switch (itemName) {
            case 'article':
                return <ManageList className = 'list' /> ;
            case 'tag':
                return <EditableTagGroup/>;
            case 'comment':
                return <EditableTagGroup/>;
            case 'addArticle':
                return <AddArticle/>;
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
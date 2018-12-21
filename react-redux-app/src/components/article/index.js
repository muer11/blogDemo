import React from 'react';
import AddComment from '../addComment/index';
import ShowComment from '../showComment/index';
require('./article.scss');

class Article extends React.Component{
    render(){
        return (
            <div>
                <div class="content">
                    <h1>关于js知识点</h1>
                    <p>11111111111111vfffffffffffffffwerrrrrrrrrrrrrrrrrr42rbsgggggggggggggggggn</p>
                </div>
                <ShowComment />
                <AddComment />
            </div>
        );
    }
}

export default Article;
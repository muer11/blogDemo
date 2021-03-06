import React from 'react';
// import Carousel from 'antd/lib/carousel';
import { Carousel } from 'antd';
require('./slider.scss');

const imgs = [
    {
        url: '/',
        name: '南山竹海',
        src: require('../../static/images/indexBg.jpg')
    }
];

const imgsItems = imgs.map((item, index)=>(
    <div className='imgItem' key={index}>
        <img src={item.src} alt={item.name}/>
    </div>
));

class Slider extends React.Component{
    render(){
        return (
            <Carousel autoplay>
                {imgsItems}
            </Carousel>
        )
    }
}

export default Slider;
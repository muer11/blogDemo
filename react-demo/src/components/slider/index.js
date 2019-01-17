import React from 'react';
// import Carousel from 'antd/lib/carousel';
import { Carousel } from 'antd';
require('./slider.scss');

const imgs = [
    {
        url: '/',
        name: 'img1',
        src: 'static/images/mac.jpg'
    },{
        url: '/',
        name: 'img2',
        src: 'static/images/time.jpg'
    }
];

const imgsItems = imgs.map((item, index)=>(
    <div className='imgItem' key={index}>
        <img src={item.src} title={item.name}/>
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
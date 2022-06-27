import './banner.js'
import './tab.js'
// 1. 引入jqcls
import $ from 'jquery'
// 2.加样式
// $('#swiper').css('background-color', 'orange')

// 处理css
// import './styles/index.css';
import './styles/index.less';

import imgUrl from './assets/1.gif';
let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

import imgUrl1 from './assets/logo_small.png';
let img1 = document.createElement('img');
img1.src = imgUrl1;
document.body.appendChild(img1);

// 引入字体图标文件
import './assets/fonts/iconfont.css'

class App {
    static a = 123
}
console.log(App.a)

import vue from './app.vue'
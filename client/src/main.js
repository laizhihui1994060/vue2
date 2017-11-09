import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'


import routePage from "./routePage";
import uuid from './../static/js/uuid.js';


Vue.config.productionTip = false; //关闭vue提示开发模式；

// 根据屏幕改变fontSize大小，rem的使用
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

Vue.use(VueRouter);

var bus = new Vue({
    data:{
        enableRemind: false
    }
});
window.bus = bus;


require('./vue-util.js');

new Vue({ 
	router:require('./vue-route-config.js')(VueRouter),
	el:'#app',
	render: h => h(App)
});




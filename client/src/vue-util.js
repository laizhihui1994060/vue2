
global.config = require('../config-version.js');

if(!global.config.debug){
	window.console.log = function(){};
	window.console.warn = function(){};
}



import  Paging from "../static/js/util/Paging.js"; //分页表格

// import 'bootstrap/dist/css/bootstrap.css';  //bootstrap
// import 'bootstrap/dist/js/bootstrap';      

// import "../static/css/bootstrap-datetimepicker.min.css";  //bootstrap时间插件
// import "../static/js/bootstrap-datetimepicker.min.js";

import "../static/css/reset.css";     //公用样式
import  "../static/js/util/page-config.js"; //权限配置
import  "../static/js/util/cookie.js";    //封装cookie
import  "../static/js/util/localStorage.js";  //封装本地存储
import  "../static/js/util/ajax.js"; //ajax
import  "../static/js/util/util.js"; //util
import  "../static/js/util/alert.js"; //重写alert
import  "../static/js/util/order_operation.js";


moment.locale('zh-cn') // 日历导入中文

import "../static/js/base64.js";  //base64

if(!Array.prototype.includes){
	Array.prototype.includes = function(value){
		return this.indexOf(value) != -1;
	}
}

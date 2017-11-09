import routePage from "./routePage";
import {_getMapAllPoiny} from "./common_component/map.js";





module.exports = function(object){

	const router = new object({ 
		mode: 'hash',
		routes:routePage 
	});
 
	router.beforeEach((to, from, next) => {

		bus.$off();
         // console.log(_getMapAllPoiny())

		/*
		 ** 路由跳转面包屑 Start
		 */

		// 列表
		const listRouter = [ { name: '员工信息', code: 'employee' }, { name: '客户', code: 'customer' }, { name: '服务商', code: 'supplier' }, { name: '车辆列表', code: 'listVehicles' }
		, { name: '驻车地管理', code: 'registration' }, { name: '核算订单', code: 'accounting_order' }, { name: '对账单', code: 'account_statement' }, { name: '收入', code: 'income' }
		, { name: '支出', code: 'expenditure' }, { name: '订单管理', code: 'orderanagement' }, { name: '行程任务', code: 'taskTrip' }, { name: '当前任务', code: 'CurrentTask' }
		, { name: '部门管理', code: 'departmentManagement' }, { name: '报价公式维护', code: 'quotationFormula' }, { name: '拍照模板', code: 'photoTemplate' }
		, { name: '救援车型管理', code: 'rescueVehicle' }, { name: '被救车型管理', code: 'rescuedCar' }, { name: '分享任务', code: 'shareTask' } 
		, { name: '4S店员工', code: 'customer_contact_list' }, { name: '公众号企业用户', code: 'weChat_contact_list' } 
		, { name: '收现统计', code: 'collection_statistics' } ];

		const fromRouterCode = from.name;

		listRouter.some( (obj, index) => {
			if(obj.code == fromRouterCode){
				local.setItem('from', {
					text: obj.name,
					path: from.path
				});
				return true;
			}
		});

		/* 
		 * 路由跳转面包屑 End
		 */

		if($('.amap-sug-result'))$('.amap-sug-result').remove();
		if($('.datetimepicker'))$('.datetimepicker').remove();
		if($('.ui-helper-hidden-accessible'))$('.ui-helper-hidden-accessible').remove();

		to.path == '/'? $('body').css({background:'#DFF5FD'}) :  $('body').css({background:'#F4F4F4'});
		let path = to.path.split('/LoginFinish');
		if(to.path !== '/' && path.length != 1){
			if(typeof socket == 'undefined'){
				require('../static/js/util/socket.js');    // 导入请求以及消息socket
                require('../static/js/util/worker_socket.js');    // 导入’订阅发布‘socket

			}

			if(from.path == '/LoginFinish/UnderSingle' && $('#locationMap').length){
				_getMapAllPoiny();
				local.removeItem('PAGEITEM');
			}

			if(path[1] !== '/calendar' && path[1] !== '/404' && path[1] !== '/PersonalCenter' && !(/\/help\/*/.test(path[1]))){
				let page = path[1].split('/').slice(1);
            	if(page.length >1 && page[1] != 'orderanagement' && page[1] != 'currentTask' &&  page[1] != 'accounting_order' 
            		&&  page[1] != 'account_statement' &&  page[1] != 'income' &&  page[1] != 'expenditure' &&  page[1] != 'invoice' &&  page[1] != 'reimbursement'
            		&& page[1] != 'customer' && page[1] != 'employee' && page[1] != 'listVehicles' && page[1] != 'registration'){

            		local.setItem('CURRENT_PAGE',page[1]);
            		if(path[1].split('orderDetails').length > 1){
            			local.setItem('CURRENT_PAGE','orderDetails');
            		}
            	}



				if(path[1].split('orderDetails').length > 1)return next();

				let newPage = ConfigPage.isExist(page);
				if(newPage && page.join('/') != newPage && !to.name){
					next({ path: '/LoginFinish/' + newPage });
				}else{

					newPage ? next() : next({ path: '/LoginFinish/404' });
				}
			}else{

				next();
			}
		}else{
			next();
		}
	});


	return router;
}






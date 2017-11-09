import {pathPlanning,addCoordinate,_Autocomplete,clearMap} from "../../../src/common_component/map.js";

global.order_operation = {};
var is = false;
var fieldSituation = null;
var settleMethod = null;

order_operation.isExtsts = function(el){
	var element = document.getElementById(el);
	return element ?  element : false;

};

order_operation.form_disabled = function(el,bool){
	var element = el ? el : order_operation.element;
	element.find('button').attr('disabled',bool);
    element.find("input").attr('disabled',bool);
    element.find('textarea').attr('disabled',bool);
    element.find('.img_show').attr('hover',!bool);
};

order_operation.form_clear = function(self,bool){
    const btn = order_operation.element.find('button[type]');
    for(let i=0;i<btn.length;i++){
        btn[i].innerHTML = btn[i].getAttribute('title');
        btn[i].style.color="rgb(153, 153, 153)";
    };

    const input = order_operation.element.find("input:not(.searchQuery)");
    for(let i=0;i<input.length;i++){
        if(input[i].getAttribute('type') == 'text'){
            if(input[i].getAttribute('name') != 'orderScheduleTime') input[i].value = '';
        }else if(input[i].getAttribute('type') == 'checkbox'){
            input[i].checked = false;
        }else if(input[i].getAttribute('name') == 'carOwnerPhone'  || input[i].getAttribute('name') == 'callPersonContact'   ){
            input[i].value = '';
        }
        // if(input[i].getAttribute('name') == 'address')continue;
        // input[i].setAttribute('placeholder',input[i].getAttribute('text') ? input[i].getAttribute('text') : input[i].getAttribute('title'))

    };
	// order_operation.element.find('button[type]').text('').text(order_operation.element.find('button[type]').attr('title'));
 //    order_operation.element.find('input').val('').text(order_operation.element.find('input').attr('text'));;
    order_operation.element.find('textarea').val('');
    order_operation.resetDate(self,bool);
};

order_operation.resetDate = function(self,bool){
	
    self.messageType = '';
    ++self.number
    
    self.orderItem = {
        order:{
            "towOrderId": "",
            "sysTenantId": "",
            "fieldSituation":"路面",
            "bookMethod":"platform",
            "sysOrgId": "",
            "created": "",
            "createdby": "",
            "updated": "",
            "updatedby": "",
            "isActive": "",
            "orderConfirmedBy": "",
            "orderConfirmedDatetime": "",
            "orderCode": "",
            "orderType": "INSTANT",
            "orderScheduleTime": "",
            "jobType": "",
            "sourceType": "",
            "incidentAddrProvince": "",
            "incidentAddrCity": "",
            "incidentAddrDistrict": "",
            "incidentAddrTown": "",
            "incidentAddrAddress": "",
            "incidentAddrGps": {
                "type": "",
                "value": "",
                "x": "",
                "y": ""
            },
            "destinationAddrProvince": "",
            "destinationAddrCity": "",
            "destinationAddrDistrict": "",
            "destinationAddrTown": "",
            "destinationAddrAddress": "",
            "destinationAddrGps": {
                "type": "",
                "value": "",
                "x": "",
                "y": ""
            },
            "callInPhoneNo": "",
            "callInTime": "",
            "customerId": "",
            "contactId": "",
            "customerCaseNo": "",
            "callPersonName": "",
            "callPersonContact": "",
            "qtyOfVehicles": "1",
            "hasBackJob": "",
            "oilType": "",
            "oilNo": "",
            "orderStatus":"",
            "price": 0,
           "settleMethod": "CASH",
            "settlePrice": "",
            "pricingMethod": "FIXED_PRICE",
            "quotationId": "",
            "cashReceived": "",
            "cashPaymentMethod": "",
            "cashInvoiced": 0,
            "cashInvoiceAmount": "",
            "cashNoInvoices": "",
            "signInvoiceAmount": "",
            "signInvoiceDate": "",
            "sendDocumentRequired": "",
            "balance": "",
            "receivedAmountTotal": "",
            "paymentStatus": "",
            "lastDispatchType": "",
            "lastDispatchStatus": "",
            "lastDispatchTime": "",
            "lastRejectReason": "",
            "predictArriveTime": "",
            "predictSetOffTime": "",
            "predictJobDoneTime": "",
            "needAssistWheel": "",
            "numWheels": "",
            "needPull": "",
            "needLift": "",
            "needFloor": "",
            "qtyPassengers": 0,
            "isAccident": "",
            "needInspect": "",
            "fieldPhotos": [],
            "specialServiceRequired": "",
            "specialServiceDesc": "",
            "timeJobCancel": "",
            "jobCancelBy": "",
            rescueType:[] ,

            "jobCancelReason": ""
        },
        vehicles:{
            "towOrderVehicleId": "",
            "towOrderId": "",
            "created": "",
            "createdby":"" ,
            "updated":"" ,
            "updatedby":"" ,
            "isActive": "",
            "vehicleId": "",
            "vehiclePlateNo": "",
            "vehicleColor": "",
            "vehicleModelCode": "",
            "vehicleName": "",
            "vehicleBrand": "",
            "vehicleCategory": "",
            "vehicleInsuranceDesc": "",
            "vehicleCargoWeight": "",
            "disclose": "",
            "meetPerson": "",
            "meetPersonContact": "",
            "takePerson": "",
            "takePersonContact": "",
            "carOwnerName": "",
            "carOwnerPhone": "",
            "isBackjob": "",
            "qty": "1"
        },
        comments:[{
            "commentId": "",
            "comment": "",
            "commentType": "TEXT"
        }]
    }

    order_operation.clearResult(self,bool);
}

order_operation.clearResult = function(self,bool){
    self.result = {
        id :"",//
        fieldSituation:'路面' ,
        sourceType :"",//
        orderType : bool ? 'INSTANT' : '',// 订单类型 ,
        orderScheduleTime :"",// 预定救援时间 ,
        jobType :'',// 业务类型 ,
        incidentAddrProvince :"",// 救援地-省 ,
        incidentAddrCity :"",// 救援地-市 ,
        incidentAddrDistrict :"",// 救援地-县/区 ,
        incidentAddrTown :"",// 救援地-镇/乡 ,
        incidentAddrAddress :"",// 救援地-详细地址 ,
        rescueLnt :"",// 救援地-经度 ,
        rescueLat :"",// 救援地-纬度 ,
        destinationAddrProvince :"",// 目的地-省 ,
        "orderStatus":"",
        destinationAddrCity :"",// 目的地-市 ,
        destinationAddrDistrict :"",// 目的地-县/区 ,
        destinationAddrTown :"",// 目的地-镇/乡 ,
        bookMethod:"platform",
        destinationAddrAddress :"",// 目的地-详细地址 ,
        destinationLnt :"",// 目的地-经度 ,
        destinationLat :"",// 目的地-纬度 ,
        callInPhoneNo :"",// 客户呼入电话号码 ,
        callInTime :"",// 客户呼入时间 ,
        customerId :"",// 客户id ,
        contactId :"",// 客户联系人id ,
        customerCaseNo :"",// 案件号/财务号 ,
        callPersonName :"",// 委派人姓名 ,
        callPersonContact :"",// 委派人电话 ,
        price :0,// 报价 ,
        settleMethod :   bool ? 'CASH' : '',// 结算方式（现金/签单） ,
        settlePrice :"",// 结算价格/实际价格 ,
        cashInvoiced :0,// 收现有无开发票 ,
        sendDocumentRequired :"",// 是否需要送单 ,
        needAssistWheel :"",// 是否需要小轮 ,
        numWheels :"",// 小轮数量 ,
        quotationId :"",// 报价公司表id ,
        pricingMethod : bool ? 'FIXED_PRICE' : '',// 计价方式（一口价、报价公式） ,
        needPull :"",// 是否需要牵引(0-否，1-是) ,
        needLift :"",// 是否需要托吊(0-否，1-是) ,
        needFloor :"",// 是否需要全落地(0-否，1-是) ,
        qtyPassengers :0,// 随车人员数量 ,
        oilType :"",// 燃油类型 ,
        oilNo :"",// 燃油标号 ,
        isAccident :"",// 是否事故(0-否，1-是) ,
        needInspect :"",// 是否带查勘(0-否，1-是) ,
        fieldPhoto :"",// 事故现场照片 ,
        specialServiceRequired :"",// 是否需要特殊服务(0-否，1-是) ,
        specialServiceDesc :"",// 特殊服务内容 ,
        "comments": [{
            "commentId": "",
            "comment": "",
            "commentType": "TEXT"
        }],
        hasBackJob :"",// 是否有返程任务 ,
        rescueType:[] ,
        qtyOfVehicles : bool ? 1 : 0,// 被救车总数量
        faultCar : {
           	carOwnerName :"",// 车主姓名 ,
            carOwnerPhone :"",// 车主电话 ,
            vehicleId :"",// 车辆识别码（车架号） ,
            vehiclePlateNo :"",// 故障车牌 ,
            vehicleColor :"",// 故障车颜色 ,
            vehicleModelCode :"",// 车型代码 ,
            vehicleName :"",// 车型名称 ,
            vehicleBrand :"",// 车辆品牌 ,
            vehicleCategory :"",// 车辆类型 ,
            vehicleInsuranceDesc :"",// 保险说明 ,
            vehicleCargoWeight :"",// 货重/吨 ,
            isBackjob :"",// 是否回程（0-否，1-是） ,
            disclose :"",// 是否秘密运输 ,
            meetPerson :"",// 接车人 ,
            meetPersonContact :"",// 接车人联系方式 ,
            takePerson:"",// 交车人称呼 ,
            takePersonContact :"",// 交车人联系方式 ,
            qty : bool ? 1 : 0,// 数量
        },
        fieldPhoto: []
    };
};


order_operation.isExtsts_el = function(){      
    return order_operation.isExtsts('trailer') || order_operation.isExtsts('TractionBase') || order_operation.isExtsts('predicamentRescue') || order_operation.isExtsts('fastRepai') ||  order_operation.isExtsts('commercialVehicle')
}


order_operation.watchAddress = function(self){    //监听地图的点击

	var name = order_operation.isExtsts_el() ? '_' + order_operation.isExtsts_el().id : '';

	bus.$on('updataAdress' + name , function (type,item,provincial) {
        if(!is)return;
        if(type == 'rescue'){
        	self.result.incidentAddrProvince = provincial.province;
        	self.result.incidentAddrCity   = provincial.city;
        	self.result.incidentAddrDistrict   = provincial.district;
        	self.result.incidentAddrTown   = provincial.town;
        	self.result.incidentAddrAddress    = item.address;
        	self.result.rescueLnt  = item.Longitude.split(',')[0];   
        	self.result.rescueLat  = item.Longitude.split(',')[1];   


            self.orderItem.order.incidentAddrAddress   = item.address;
        }
        if(type == 'destination' && self.code && self.code.toString().indexOf('02') == -1){
        	self.result.destinationAddrProvince  = provincial.province 
        	self.result.destinationAddrCity  = provincial.city  
        	self.result.destinationAddrDistrict  = provincial.district  
        	self.result.destinationAddrTown  = provincial.town  
        	self.result.destinationAddrAddress  = item.address   
        	self.result.destinationLnt  = item.Longitude.split(',')[0];      
        	self.result.destinationLat  = item.Longitude.split(',')[1];  

            self.orderItem.order.destinationAddrAddress   = item.address;

        };

        self.$nextTick(function(){
            self.quotation = order_operation.isNull('#baojia');
        });
        order_operation.getQuote(self);

    });
}

order_operation.watchEl = function(self,items){         //监测是下单还是查看订单

    if(!items)return;
	if(!items.el)return;
    self.code = items.code;
    order_operation.element = $('#' + items.el +' .body');

    if(fieldSituation){

        self.fieldSituation = fieldSituation;
        self.settleMethod = settleMethod
    }else{
        order_operation.getFieldType(self);
        order_operation.getSettleMethod(self);
    }

    self.rescueType = items.el;
	if(items.orderId){
        is = false;
        self.clearInfo();
		if(self.result.id == items.orderId)return;

        self.isReturn = true;
        self.result.id=items.orderId;

            send({
                type:'get',
                url:'order:/order/info/' + items.orderId
            },function(err,res){
                if(err)return console.log(err);
                if(res.status == 200){
                    console.log(JSON.stringify(res));



                    self.messageType = items.messageType;
                    if(items.shareActionId)self.shareActionId = items.shareActionId;
                    self.minDate = res.content[0].order.created;
                    self.orderItem.order = res.content[0].order;
                    self.orderItem.vehicles = res.content[0].vehicles[0];
                    if(res.content[0].remarks)self.orderItem.comments = res.content[0].remarks;

                    if(!self.orderItem.order.pricingMethod)self.orderItem.order.pricingMethod = 'FIXED_PRICE'
                    if(!self.orderItem.order.price)self.orderItem.order.price = 0


                    self.isModify = false;
                    self.$nextTick(function(){
                        self.quotation = order_operation.isNull();
                        $('.modifyOptions').height('auto');
                        if($('#locationMap').height() <= $('.operationPageAnime .body').height()){
                            $('.modifyOptions').css({height:'0'});
                            self.showOpation = false;
                        }

                        self.$nextTick(function(){

                            
                            order_operation.element = order_operation.element.attr('id') ? order_operation.element.find('.body') : order_operation.element;
                            order_operation.form_disabled(order_operation.element,true);
                            _Autocomplete('Autocomplete_rescue');
                            _Autocomplete('Autocomplete_destination');

                            if( self.orderItem.order.rescueType){
                                console.log(self.orderItem.order.rescueType)
                                self.orderItem.order.rescueType.forEach(function(it,index){
                                    order_operation.element.find('input[value="'+ it.code +'"]')[0].checked = true;
                                });
                            }

                            self.orderItem.comments.forEach(function(it,index){
                                if(it.commentType == 'VOICE')order_operation.element.find('.VOICE').show();
                            });

                        });
                    });


                   
                }else{
                    alert(res.msg);
                };
            });


	}else{
        is = true;
        self.isModify = true;
        self.clearInfo(true);
		self.result.id="";
		self.orderItem.order.fieldSituation = "路面";
        self.isReturn = false;

        send({
            type:'post',
            url:'control:/sys/param/org',
            param:['/order/auto_share']
        },function(err,res){
            if(!err && res.status == 200){
            console.log(res.content[0].orgParam)
                
                self.auto_dispatchCar = res.content[0].orgParam.value.default?res.content[0].orgParam.value.default :  res.content[0].orgParam.value.values[0].code;
                self.auto_dispatchCar = self.auto_dispatchCar == 'yes' ? false:true;
            }
            // self.auto_dispatchCar
        })
        self.minDate = new Date().getTime();
        self.$nextTick(function(){
            order_operation.form_disabled(order_operation.element,false);
            order_operation.element.find('#save_dispatchCar').hide();
            $('.modifyOptions').height('auto');

            if($('#locationMap').height() <= $('.operationPageAnime .body').height()){
                $('.modifyOptions').css({height:'0'});
                self.showOpation = false;
            }
            _Autocomplete('Autocomplete_rescue');
            _Autocomplete('Autocomplete_destination');


        });
	}
}

order_operation.metchStatus = function(self,name,item){       //匹配字段做相应的操作
    console.log( name, item)
    if(!order_operation.element)return;
    if( !self.isModify )return;
    self.quotation = order_operation.isNull('#baojia,#gongsi');


    if(name.indexOf('comments') != -1){
        var newArr = name.split(':')
        self.orderItem.comments[newArr[1]].commentType = newArr[2];
        self.orderItem.comments[name.split(':')[1]].comment = item;
        return;
    }

	switch(name){
        case 'orderType':
            self.result['orderType'] = item
            if(item === 'INSTANT') delete self.result.orderScheduleTime;
            break;
		case 'incidentAddrAddress':
            global.rescueType = 'rescue';
                self.result.incidentAddrProvince = '';
                self.result.incidentAddrCity   = '';
                self.result.incidentAddrDistrict   = '';
                self.result.incidentAddrTown   = '';
                self.result.incidentAddrAddress   = item;
                self.result.rescueLnt  = 0;   
                self.result.rescueLat  = 0;  

                self.orderItem.order.incidentAddrProvince = '';
                self.orderItem.order.incidentAddrCity   = '';
                self.orderItem.order.incidentAddrDistrict   = '';  
                self.orderItem.order.incidentAddrTown   = '';
                self.orderItem.order.incidentAddrAddress   = item;
                self.orderItem['order']['incidentAddrGps'].x = 0;
                self.orderItem['order']['incidentAddrGps'].y = 0;
                order_operation.getQuote(self);

		  	break;
        case 'destinationAddrAddress':
            global.rescueType = 'destination';
            
                self.result.destinationAddrProvince  = '';
                self.result.destinationAddrCity  = '';
                self.result.destinationAddrDistrict  = '';
                self.result.destinationAddrTown  = '';  
                self.result.destinationAddrAddress  = item;   
                self.result.destinationLnt  = 0;      
                self.result.destinationLat  = 0;   

                self.orderItem.order.destinationAddrProvince  = '';
                self.orderItem.order.destinationAddrCity  = '';
                self.orderItem.order.destinationAddrDistrict  = '';
                self.orderItem.order.destinationAddrTown  = '';  
                self.orderItem.order.destinationAddrAddress  = item;
                self.orderItem['order']['destinationAddrGps'].x = 0;
                self.orderItem['order']['destinationAddrGps'].y = 0;
                order_operation.getQuote(self);

            break;
        case 'quotationId':
            self.result['quotationId']= item.sysQuotationId;
            self.orderItem.order['quotationId'] = item.sysQuotationId;
            order_operation.getQuote(self);
            break;
		case 'pricing':
		  	self.result['pricingMethod']= item.en;
            self.orderItem.order['pricingMethod'] =  item.en;
		  	if(item === 'FORMULA') {
                self.result.price = '';
                self.orderItem.order.price = '';
            }
		  	if(item === 'FIXED_PRICE') {
                self.result.quotationId = '';
                self.orderItem.order['quotationId'] = '';
            }
		  	break;
        case 'fieldSituation':
            self.result[name]= item;
            self.orderItem.order.fieldSituation = item;
            break;
        case 'rescueType':
            let str = '';
            if(item){
                if(item == 'TOW')str = '拖车';
                if(item == 'LIFT')str = '托吊';
                if(item == 'OTHER')str = '其他';
                // console.log( name,item )
                self.result[name].push({
                    "code": item,
                    "desc": str
                });
                self.orderItem.order[name].push({
                    "code": item,
                    "desc": str
                });
            }else{
                self.result[name] = [];
                self.orderItem.order[name] = [];
                order_operation.element.find('input[name="rescueType"]').each(function(index, el) {
                    console.log(el)
                    if(el.checked){
                        if(el.value == 'TOW')str = '拖车';
                        if(el.value == 'LIFT')str = '托吊';
                        if(el.value == 'OTHER')str = '其他';
                        // console.log( name,item )
                        self.result[name].push({
                            "code": el.value,
                            "desc": str
                        });
                        self.orderItem.order[name].push({
                            "code": el.value,
                            "desc": str
                        });
                    }  
                });;
            }
            break;
		case 'needAssistWheel':
		  	self.result[name]= item;
            self.orderItem.order[name] =  item;
		  	break;
		case 'jobType':
		  	self.result[name]= item.code;
		  	self.RL = item.code == '0202' ? true : false;
            self.code = item.code;
		  	break;
		case 'customerId':
		  	self.result[name]= item.partnerId;
            if(item.vehicleCategory)self.orderItem.vehicles.vehicleCategory= item.vehicleCategory;
            if(item.vehicleBrand)self.orderItem.vehicles.vehicleBrand= item.vehicleBrand;
            self.orderItem.order['contactId']= item.contactList && item.contactList.length ? item.contactList[0].contactId:'' ;
            self.result['settleMethod']= item.settlementMethod ? item.settlementMethod.toLocaleUpperCase() : 'CASH' ;
            self.result['contactId']= item.contactList && item.contactList.length ? item.contactList[0].contactId:'' ;
            self.orderItem.order['contactId']= item.contactList && item.contactList.length ? item.contactList[0].contactId:'' ;
            self.orderItem.order['settleMethod'] =  item.settlementMethod ?  item.settlementMethod.toLocaleUpperCase()  : 'CASH' ;

            if(item.destination){
                self.result.destinationAddrProvince  = item.province;
                self.result.destinationAddrCity  = item.city;
                self.result.destinationAddrDistrict  = item.district;
                self.result.destinationAddrTown  = '';  
                self.result.destinationAddrAddress  = item.customerAddress;   
                self.result.destinationLat  = item.customerPoint.lat;      
                self.result.destinationLnt  = item.customerPoint.lng;   

                self.orderItem.order.destinationAddrProvince  = item.province;
                self.orderItem.order.destinationAddrCity  = item.city;
                self.orderItem.order.destinationAddrDistrict  = item.district;
                self.orderItem.order.destinationAddrTown  = '';  
                self.orderItem.order.destinationAddrAddress  = item.customerAddress;
            }

            self.updateNumber ++;
         
            order_operation.getQuote(self);
		  	break;
        case 'vehicleCategory':
            self.result['faultCar'][name]= item.code;
            order_operation.getQuote(self);

            break;
        case 'qtyOfVehicles':
             self.result['faultCar']['qty']  = item;
             self.result['qtyOfVehicles']  = item;
            break;
		case 'vehicleModelCode':
            if(typeof item == 'object'){
                self.result['faultCar'][name]= item.code;
                self.result['faultCar']['vehicleName'] = item.name;
                self.orderItem.vehicles.vehicleCategory= item.categoryCode;
                self.orderItem.vehicles.vehicleBrand= item.brandName;
            }else{
                self.result['faultCar']['vehicleName'] = item;
            }
		  	break;
		case 'specialServiceRequired':
		  	self.result[name]= item;
            self.orderItem.order[name] =  item;
		  	break;
		case 'qtyPassengers':
		  	self.result[name]= item;
            self.orderItem.order[name] =  item;
		  	break;
    
		case 'vehicleBrand':
            self.result['faultCar'][name]= item.name;
		  	break;
		default:
			if(name == 'carOwnerName' ||name == 'carOwnerPhone'||name == 'vehicleId'||name == 'vehiclePlateNo'||name == 'vehicleColor'||name == 'vehicleModelCode'||name == 'vehicleName'||name == 'vehicleBrand'||name == 'vehicleCategory'||name == 'vehicleInsuranceDesc'||name == 'vehicleCargoWeight'||name == 'isBackjob'||name == 'disclose'||name == 'meetPerson'||name == 'meetPersonContact'||name == 'takePerson'||name == 'takePersonContact'||name == 'number' ){
				self.result['faultCar'][name]= item;
			}else{
                if(name == 'cashInvoiced' || name == 'isAccident' || name == 'needInspect' || name == 'settleMethod'){
                    self.result[name]= item;
                    self.orderItem.order[name] =  item;
                }else{
                    self.result[name]= item;
                    self.orderItem.order[name] =  item;
                }
			}
	}



};

order_operation.getQuote = function(self){
       

    if( !self.result.quotationId || !self.result.incidentAddrAddress  || !self.code){
        order_operation.clone(self);
    }
    if( !self.result.quotationId || !self.result.incidentAddrAddress  || !self.code)return;

    if(self.result.pricingMethod != 'FORMULA')return;


    order_operation.clone(self);
    if(self.code.toString().indexOf('02') == -1){

        if(!self.result.destinationAddrAddress)return;
        if(self.result.rescueLnt &&self.result.rescueLat && self.result.destinationLnt &&  self.result.destinationLat){

            let ar = parseInt(self.result.destinationLnt) > parseInt(self.result.destinationLat) ? [self.result.destinationLnt,self.result.destinationLat] : [self.result.destinationLat,self.result.destinationLnt]

            pathPlanning(false,[[self.result.rescueLnt,self.result.rescueLat],ar],function(data){
                let param = {
                    "sysPartnerId": self.result.customerId,
                    "sysQuotationId": self.result.quotationId,
                    "businessType": self.code,
                    "carType": self.result['faultCar']['vehicleCategory'],
                    "rescueArea": self.result.incidentAddrDistrict,
                    "destinationArea": self.result.destinationAddrDistrict,
                    "milageTowing": data.routes[0].distance/1000,
                    "milageGoto" : 0 ,
                    "milageBack" : 0
                };
                getPrice(param)

            });
        }else{
            let param = {
                "sysPartnerId": self.result.customerId,
                "sysQuotationId": self.result.quotationId,
                "businessType": self.code,
                "carType": self.result['faultCar']['vehicleCategory'],
                "rescueArea": self.result.incidentAddrDistrict,
                "destinationArea": self.result.destinationAddrDistrict,
                "milageTowing": 0,
                "milageGoto" : 0 ,
                "milageBack" : 0
            };

            getPrice(param)
        }

    }else{

        if(!self.result.incidentAddrAddress)return alert('请输入救援地');

        let param = {
            "sysPartnerId": self.result.customerId,
            "sysQuotationId": self.result.quotationId,
            "businessType": self.code,
            "carType": self.result['faultCar']['vehicleCategory'],
            "rescueArea": self.result.incidentAddrDistrict,
            "destinationArea": 0,
            "milageTowing": 0,
            "milageGoto" : 0 ,
            "milageBack" : 0
        }

     
    }

    function getPrice(param){
        param.businessType = util.matchRescueType(param.businessType).cn;
        console.log(param)
        send({
            type:'post',
            url:'control:/quota/quota/getquotabymessage',
            param:param
        },function(err,res){
            if(err)return console.log(res);
            if(res.status == 200){
                self.orderItem.order.price = res.content[0].quota;
                self.result.price = res.content[0].quota;
            }else{
                console.log(res);
                alert(res.msg);
            }
        });
    }



};
order_operation.accept = function(self,status,isDispatch){

    if(!order_operation.isNull())return alert('信息不完整!!!');
    self.disabled = true;


    send({
        type:'post',
        url:'order:/share/bid/response',
        param:{
            shareActionId :self.shareActionId,
            bidApproveStatus:status
        }
    },function(err,res){
        self.disabled = false;
        if(err)return console.log(err);
        if(res.status == 200){
            if(status == 'BID_APPROVED'){
                self.$emit('delectMsg', self.messageType);
                if(isDispatch){
                    order_operation.dispatchCar(self);
                }else{
                    self.$emit('toggleView','');
                    alert(res.msg,'success');
                }
            }else{
                alert(res.msg);
                self.$emit('toggleView');
            }
        }else{
            console.log(res);
            alert(res.msg);
        }
    });
}


order_operation.showOpationToggle = function(self,oHeight){   //下单界面收缩显示。
	self.showOpation = !self.showOpation;
    self.showOpation ?  $('.modifyOptions').height('0') :$('.modifyOptions').height('auto');
}


order_operation.isNull = function(id,bool,parentEl){      //监测必填项是否为空
	order_operation.element = parentEl ? parentEl : $(order_operation.isExtsts_el()).find('.body');
	var bool = true;
	order_operation.element.find('[isVerify="1"]:not(' + id +')').each(function(index,el){
        // if(el.getAttribute('name') == 'address')$(el).removeClass('setbg');

		// el.style.border = 'none';
        // el.style.border = '1px solid transparent';
        $(el).removeClass('verificationInput');
		if( el.tagName.toLocaleLowerCase() != 'input' && ( (el.innerHTML && el.innerHTML == el.getAttribute('title'))  || !el.innerHTML)){
            // el.style.border = '1px solid #f9bcbc';
            $(el).addClass('verificationInput');
			bool = false;
		}
        if( (el.tagName.toLocaleLowerCase() == 'input')){
            if( !el.value){
                if(el.value === 0 ){
                   
                }else{
                    $(el).addClass('verificationInput');
                    // el.style.border = '1px solid #f9bcbc';
                    bool = false;
                }
            }

        }
	});

    if(typeof id === "boolean"){
        const els = ['orderType','isAccident','needInspect','qtyPassengers','specialServiceRequired','settleMethod','pricing'];

        els.forEach(function(it,index){
            let el = order_operation.element.find('input[name=' + it  +']');
            if(el.length){
                if(order_operation.element.find('input[name=' + it  +']:checked').val() || order_operation.element.find('input[name=' + it  +']:checked').val() == 0){
                    el.prev().css({color:'rgb(102, 102, 102)'});
                    el.next().css({color:'rgb(102, 102, 102)'});
                }else{
                    el.prev().css({color:'rgba(255, 0, 0, 0.258824)'});
                    el.next().css({color:'rgba(255, 0, 0, 0.258824)'});
                    bool = false;
                }
            }
        });
    }

	return bool;
}


order_operation.getFieldType = function(self){
    if(fieldSituation)return;
    send({
        type:'post',
        url:'control:/sys/param',
        param:['/order/field_type'],
    },function(err,res){
        if(err)return console.log(res);
        if(res.status == 200){
            fieldSituation = res.content[0].value.values;
            self.fieldSituation = fieldSituation;
        }else{
            console.log(res);
        }
    });

}

order_operation.getSettleMethod = function(self){
    if(settleMethod)return;
    send({
        type:'post',
        url:'control:/sys/param/org',
        param:['/order/settle_method'],
    },function(err,res){
        console.log(res);
        if(err)return console.log(res);
        if(res.status == 200){
            settleMethod = res.content[0].orgParam.value.default ? res.content[0].orgParam.value.default : res.content[0].orgParam.value.values;
            console.log(settleMethod)
            self.settleMethod =  settleMethod;
        }else{
            console.log(res);
        }
    });
}





order_operation.mathResuceType = function(self,result){            //匹配救援类型，相应 的地图操作
	self.currentTaskInfo=result;
    self.currentCarInfo ={     
        currentCar:{},  //当前车辆   
        selectCar:[],    //选中车辆
    };
    console.log(result);
    switch(result.type){
		case 'trailer' || 'TractionBase' || 'predicamentRescue' :
                if(result.rescueLnt && result.rescueLat && result.destinationLnt && result.destinationLat){
                    pathPlanning({hideMarkers:false,isCircle:true},[[result.rescueLnt,result.rescueLat],[result.destinationLnt,result.destinationLat]],function(data){
                        const time = data.routes[0].time ? util.formatSeconds(data.routes[0].time) :0;
                        $('.topInfo').html('<p style="margin:0">'+ result.incidentAddrAddress + ' / ' + result.destinationAddrAddress + '&nbsp;&nbsp;&nbsp;&nbsp;预计里程：' + data.routes[0].distance/1000 +'公里 / ' + time +' </p>');
                    });
                }else{
                    console.error('此订单无经纬度',result)
                    $('.topInfo').html('<p style="margin:0">'+ result.incidentAddrAddress + ' / ' + result.destinationAddrAddress);
                }

	  		break;
		case 'fastRepai' :
            if(result.rescueLnt && result.rescueLat){
                addCoordinate({
                    address:result.incidentAddrAddress,
                    Longitude:result.rescueLnt + ',' + result.rescueLat
                },true);
            }else{
                    console.error('此订单无经纬度',result)
            }
            $('.topInfo').html('<p style="margin:0">'+ result.incidentAddrAddress);
	  		break;
		case 'commercialVehicle' :
            if(result.rescueLnt && result.rescueLat && result.destinationLnt && result.destinationLat){
                pathPlanning({hideMarkers:false,isCircle:true},[[result.rescueLnt,result.rescueLat],[result.destinationLnt,result.destinationLat]],function(data){
                        const time = data.routes[0].time ? util.formatSeconds(data.routes[0].time) :0;
                    $('.topInfo').html('<p style="margin:0">'+ result.incidentAddrAddress + ' / ' + result.destinationAddrAddress + '&nbsp;&nbsp;&nbsp;&nbsp;预计里程：' + data.routes[0].distance/1000 +'公里 / ' + time +' </p>');
                });
            }else{
                console.error('此订单无经纬度',result)
                $('.topInfo').html('<p style="margin:0">'+ result.incidentAddrAddress + ' / ' + result.destinationAddrAddress);
            }

	  		break;
		
		default:
			return;
	}
};



order_operation.modify = function(self){

    if(!self.isModify){
        order_operation.clearResult(self);
        order_operation.form_disabled(null,false);
        self.isModify = !self.isModify;
        is = true;
        return ;
    }
  	order_operation.clone(self);

    if(!order_operation.isNull())return alert('信息不完整!!!');

    self.disabled = true;
    fileUp(self.flies,function(images){

        console.log(self.result)
        self.result.fieldPhoto = images;

        send({
            type:'put',
            url:'order:/order',
            param:self.result
        },function(err,res){
            self.disabled = false;

            if(err)return alert('服务器出错，请联系管理员');
            if(res.status == 200){
                console.log(res)
                alert(res.msg,'success');
                order_operation.form_disabled(null,true);
                self.isModify = !self.isModify;
                is = false;
            }else{
                alert('修改失败');
                console.log(res);
            }
        })
    });

};

order_operation.cancel = function(self){

    confirm('是否取消订单',function(){
        self.disabled = true;
        console.log( self.orderItem.order.towOrderId )
        send({
            type:'put',
            url:'order:/order/cancel',
            param:{
                "orderId": self.orderItem.order.towOrderId,
                "cancelBy": "AGENT",
                "cancelReason": 'CANCEL_NOFEE',
                "jobResult":'CANCEL_NOFEE'
            }
        },function(err,res){
            self.disabled = false;

            if(err)return console.log(res);
            if(res.status == 200){
                self.$emit('toggleView','');
                if(self.messageType)self.$emit('delectMsg', self.messageType);
                alert(res.msg,'success');
                console.log(res);
            }else{  
                console.log(res);
                alert(res.msg);
            }
        })

    },true)
    // $('#cancel').modal('show');
    // $('#towOrderId').text(self.orderItem.order.towOrderId)
};

order_operation.delete = function(self){

    confirm('是否删除订单',function(){
        self.disabled = true;
        send({
            type:'put',
            url:'order:/order/false',
            param:{
                orderIds:[self.orderItem.order.towOrderId]
            }
        },function(err,res){
            self.disabled = false;

            if(err)return console.log(res);
            if(res.status == 200){
                self.$emit('toggleView','');
                console.log('~~~~~~~~~~~~~',self.messageType)
                if(self.messageType)self.$emit('delectMsg', self.messageType);
                alert(res.msg,'success');
                console.log(res);
            }else{  
                console.log(res);
                alert(res.msg);
            }
        })

    },true)
    // $('#cancel').modal('show');
    // $('#towOrderId').text(self.orderItem.order.towOrderId)
};

order_operation.dispatchCar = function(self,isSave,isDispatch){
 //    console.log(self.orderItem['order'])
	// if(self.orderItem['order']['incidentAddrGps']['x'] && self.orderItem['order']['incidentAddrGps']['y']){
	// };
    order_operation.clone(self);
    if(isSave){
        order_operation.send(function(err,res){
            self.disabled = false;
            if(err)return alert('服务器出错，请联系管理员！');
            if(res.status == 200){
                if(isDispatch){
                    clearMap();
                    self.$emit('completeOrder',self.result,res.content[0].id,res.content[0].orderCode);
                }else{
                    alert(res.msg,'success');
                    self.clearInfo(true);
                    console.log(socket.id)
                }
            }else{
                alert(res.msg);
                console.log(res);
            }

        },self);
    }else{
        if(!order_operation.isNull())return alert('信息不完整');;

        self.result['type'] = self.rescueType;
        self.result['jobType'] = self.code;
        clearMap();
        self.$emit('completeOrder',self.result,self.orderItem.order.towOrderId,self.orderItem.order.orderCode,self.messageType);   
    }   

};

// order_operation.saveOrder = function(self){


// 	order_operation.send(function(err,res){
// 	    if(err)return alert('服务器出错，请联系管理员！');
// 	    if(res.status == 200){
// 	        alert('保存订单成功');
// 	    }else{
// 	        alert('保存订单失败');
// 	        console.log(res);
// 	    }
// 	},self);
// }

order_operation.send = function(fn,self){

    if(!self.result.orderScheduleTime ||  (new Date().getTime() - self.result.orderScheduleTime > 0 && self.result.orderScheduleTime + 300000 > new Date().getTime()) ){
        self.result['orderType'] = 'INSTANT'
        delete self.result.orderScheduleTime;
    }else{
        self.result['orderType'] = 'SCHEDULED'
    }
    if(!order_operation.isNull())return alert('信息不完整!!!');
    self.disabled = true;
    self.result.id = global.uuid();
    console.log(self.result)
    
    fileUp(self.flies,function(images){
        self.result['type'] = self.rescueType;
        if(self.code)self.result['jobType'] = self.code;
        self.result.fieldPhoto = images;
        send({
            type:'post',
            url:'order:/order/unified_order',
            param:self.result
        },fn);
    });
}
order_operation.importAudit = function(self,isDispatch,ev){
    if(!order_operation.isNull('',true)){
        is = true;
        console.log("???")

        order_operation.form_disabled(null,false);
        return alert('信息不完整!!!');
    }
    self.disabled = true;


    order_operation.clone(self);

    self.result.orderStatus = 'NEW_APPROVED';
    // if(self.rescueType != 'fastRepai'){
    //     if(!self.result.rescueLnt || !self.result.rescueLat || !self.result.destinationLnt ||  !self.result.destinationLat)return alert('救援地经纬度或目的地经纬度不合法，请重新选择');
    // }else{
    //     if(!self.result.rescueLnt || !self.result.rescueLat)return alert('救援地经纬度不合法，请重新选择');
    // }

    fileUp(self.flies,function(images){


        self.result.fieldPhoto = images;
        console.log( self.result )
        send({
            type:'put',
            url:'order:/order',
            param:self.result
        },function(err,res){
            self.disabled = false;
            if(err)return console.log(res);
            if(res.status == 200){
                // alert(res.msg);
                order_operation.form_disabled(null,true);
                self.isModify = !self.isModify;
                console.log(self.messageType)


                send({
                    type:'put',
                    url:'order:/order/check/' + self.orderItem.order.towOrderId,
                    param:{}
                },function(err,res){
                    if(err)return console.error('审核订单失败');
                    if(res.status == 200){
                        console.log(res);
                        self.$emit('delectMsg', self.messageType);
                        if(isDispatch){
                            order_operation.dispatchCar(self);
                        }else{
                            alert(res.msg,'success');
                            $('.sweet-alert .confirm').one('click',function(){
                                self.$emit('toggleView','');
                            });
                            


                            
                        }
                        is = false;
                    }else{
                        alert(res.msg);
                        console.log(res);
                    }
                });


               
            }else{
                alert('修改失败');
                console.log(res);
            }
        })
    });




}

order_operation.clone = function(self){
	 for(var i in self.result ){
        if(i == 'faultCar'){
            for(var j in self.result['faultCar']){

                if(!self.result['faultCar'][j]){
                    if(typeof self.orderItem['vehicles'][j] == 'boolean'){
                        self.result['faultCar'][j] = self.orderItem['vehicles'][j] ? 1 : 0;
                    }else{
                        self.result['faultCar'][j] = self.orderItem['vehicles'][j];
                    }
                }
            }
        } else if(i == 'comments'){
            self.result[i] = self.orderItem['comments'];
        }else if(i == 'fieldPhoto' && !self.result['fieldPhoto'] && !self.result['fieldPhoto'].length){
             self.result[i] = self.orderItem['order']['fieldPhotos'];

        }else{
            if(!self.result[i]){
                if(typeof self.orderItem['order'][i] == 'boolean'){
                    self.result[i] = self.orderItem['order'][i] ? 1 : 0
                }else{
                    if(i == 'rescueLat'){
                        self.result[i] = self.orderItem['order']['incidentAddrGps'] ? self.orderItem['order']['incidentAddrGps']['y']: 0;
                    }else if(i == 'rescueLnt'){
                        self.result[i] = self.orderItem['order']['incidentAddrGps'] ?self.orderItem['order']['incidentAddrGps']['x']:0;
                    }else if(i == 'destinationLat'){
                        self.result[i] = self.orderItem['order']['destinationAddrGps'] ? self.orderItem['order']['destinationAddrGps']['y']:0;
                    }else if(i == 'destinationLnt'){
                        self.result[i] = self.orderItem['order']['destinationAddrGps'] ? self.orderItem['order']['destinationAddrGps']['x']:0;
                    }else if(i == 'id'){
                        self.result[i] = self.orderItem['order']['towOrderId'];
                    }else{
                        self.result[i] = self.orderItem['order'][i];
                    }
                }
            }
        }
    }
};

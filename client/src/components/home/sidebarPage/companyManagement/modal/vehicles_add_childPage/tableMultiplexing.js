//提供数据收集、自动填单等方法

export default {
	data () {
		return {
			cateCount:0,
			cateSelectValBind:"", //保养类型
			addMode:"post",
			form_min_view:"hours",
			remindUnit:"Day",//"Day" or "Minute"
			submit_block:false,
			operateLeftOption:["edit"],
			form_param_common:{
					truckId         : this.towTruckId,
					remindTime      : 30,
					effectiveTime   : 365,
					startTime       : "",
					endTime         : "",
					status          : "NA",
					notice          : false
				},
		}
	},
	methods:{
		initParam (type) {
				const _extend = {   
						// truckId         : this.towTruckId,
						calendarType    : type, //年审
						id              : uuid(),
						calendarId      : uuid(),
						noticeType      : "TIME",
						status          : "NA",
						remind          : false,
				}

				this.form_param = Object.assign(
					{},
					this.form_param_common,
					_extend
				);
				this.$nextTick(()=>{this.cateSelectValBind = " "});// sees doesn't work, don't know why
				//补充特有字段
				switch(type) {
					case "VERIFICATION" : {
						 /* do nothing */ 
					};break;
					case "INSURANCE"    : {
						this.form_param.code = "";
					};break;
					case "PASS_CHECK"   : {
						this.form_param.code = "";
					};break;
					case "REPAIR"       : {
						/* waiting aquire */
						this.form_param.code = "";
						this.form_param.remindMileage = 0;
						this.form_param.effectiveMileage = 0;

					};break;
				}
				console.log("初始化参数",this.form_param)
				return this.form_param;     
		},
		request_record(calenType){              
			let params = {
					id          : this.towTruckId,
					pageSize    : 1000,
					pageIndex   : 1,
					calendarType: calenType
				}
			console.log("请求事件参数：",params)
			send({
					type:'post',
					url:'client:/calendar/event_type/records',
					param: params
				},(err,res)=>{
					if(err) return alert(err);
					if(res.status === 200){
						console.log("查询" + calenType + "结果",res);
						if(!res.content){
							console.log("走这里");
							this['List' + calenType] = [];
							
						} else {
							this.ListDisplay = [];
							let count = new Set();//种类计数
							this['List' + calenType] = res.content.map((it,index,arr)=>{
								var displayItem = {
									codeName        : it.codeName,
									startTime       : it.startTime,
									endTime         : it.endTime,
									effectiveMileage: it.effectiveMileage,
									effectiveTime   : it.effectiveTime,
									remindTime      : it.remindTime,
									remindMileage   : it.remindMileage,
									status          : it.status
								}
								if( index === arr.length-1 && calenType === "VERIFICATION" && !!it.startTime){
									this.form_param.startTime = it.endTime;
									this.form_param.endTime = this.form_param.startTime + (365*24*3600*1000);
								}
								if(it.code){
									count.add(it.code);
								}
								if(calenType === "VERIFICATION"){
									delete displayItem.codeName;
								}
								if(calenType !== "REPAIR"){
									delete displayItem.effectiveMileage;
									delete displayItem.remindMileage;
								} else {
									delete displayItem.effectiveTime;
								}
								this.ListDisplay.push(displayItem);
								return {
									code          : it.code,
									truckId       : (it.truckId?it.truckId:this.towTruckId),
									remindTime    : it.remindTime,
									effectiveTime : it.effectiveTime,
									startTime     : it.startTime,
									endTime       : it.endTime,
									status        : it.status,
									calendarType  : (it.calendarType?it.calendarType:this.data_cate),
									id            : it.id,
									calendarId    : it.calendarId,
									noticeType    : (it.noticeType?it.noticeType:'TIME'),
									remind        : it.remind
								}
							})//this.dummy_list.slice();
							this.cateCount = count.size;
						}
						// this.form_param.startTime = new Date("2016/10/10")//模拟给个上次的到期时间
					} else {
						console.log("查询关键字：",params.calendarType)
						if(calenType === "VERIFICATION"){
							this.form_param.startTime = new Date().setHours(0,0,0,0)
							this.form_param.endTime = this.form_param.startTime + (365*24*3600*1000)
						}
						console.log("ERROR：",res)
					}
				})
				
				
			},
		updateUtilParam (name, item, preventWatch=false) {
				console.log("updateUtilParam",name,item)
				/*//有效期校验*/
				if ( name === "effectiveTime" && !!this.form_param.startTime) {
					item = parseInt(item);
					let start = this.form_param.startTime;
					let end = start + parseInt(item)*1000*60*60*24;//计算结束时间戳
					this.setKeyVal('endTime', end);
					// this.updateUtilParam('remind',parseInt(item*0.3334) ) 
				}
				//时间校验
				if ( /start|end/.test(name) ) {
					let curr = item;
					let referen = name === "startTime"? this.form_param.endTime : this.form_param.startTime;
					let dayDiff = stamp => Math.abs(Math.ceil( stamp/24/60/60/1000 ));
					//推算结束时间
					if ( this.data_cate !== "VERIFICATION" && 
							name === "startTime" && 
							item !== this.form_param.startTime && 
							!this.form_param.endTime) {
						this.setKeyVal("endTime", item + this.form_param.effectiveTime*24*3600*1000);
					//判断时间错位
					} else if ( !!this.form_param.endTime &&
								!!this.form_param.startTime &&
								(name === "startTime" && item > this.form_param.endTime ||
								 name === "endTime" && item < this.form_param.startTime ) ) {
						let msg = name === "startTime"?"开始时间不能超过到期时间":"到期时间不能早于开始时间";
						return alert(msg);
					//推算期限
					} else if ( name === "startTime" && !!this.form_param.endTime ||
								name === "endTime" && !!this.form_param.startTime ) {
						this.setKeyVal('effectiveTime', dayDiff(curr - referen));
					}
				}
				// if (this.form_param.noticeType === "MILEAGE" && name === "effectiveMileage") {
				//     console.log("updating mileage")
				//     this.setKeyVal( "remindMileage", parseInt(item/10) )
				// }
				this.setKeyVal(name,item);
				// this.form_param[name] = item;
		},
		setDefaultRemind (name) {
			console.log("给个提醒默认值")
			if ( ParseInt(this.form_param.effectiveTime) >= 30) {
				this.updateUtilParam("remindTime",30);
			}
		},

		filterFunc (param,name) {
			if ( name === "remindTime" || name === "effectiveTime" ) {
				return parseInt( (param/60/24).toFixed(0) ) + "天";
				// return param + "天"
			}
			if ( /start|end/.test(name) ) {
				return new Date(param).Format("yyyy-MM-dd");
			}
			if ( name === "status" ) {
				switch(param) {
					case "CHECKED"   : return this.data_cate==="VERIFICATION"?"已年审":"已办理";
					case "NA"        : return this.data_cate==="VERIFICATION"?"未年审":"未到期";
					case "EXPIREING" : return "即将到期";
					case "EXPIRED"   : return "已到期";
				}
			}

			return param;
		},

		editRow (index,param) {
			console.log("编辑行",param)
			this.addMode = "put"
			var fillParam = Object.assign({},this["List"+this.data_cate][index])  
			fillParam.remindTime = Number( (fillParam.remindTime/1440).toFixed(0) )
			fillParam.effectiveTime = Number( (fillParam.effectiveTime/1440).toFixed(0) ) 

			this.form_param = Object.assign({},fillParam);
			this.$nextTick(()=>{this.cateSelectValBind = param.codeName})
			if(this.data_cate === "REPAIR"){
				$('[name="form_keeping_noticeType"][value="TIME"]').prop("checked",true)
			}
		},
		validateParam (cate, param, extra=true) {
			var result = true, msg = "表单填写错误";
			if (cate === "VERIFICATION") {
				if ( !extra && !param.startTime ) {
					msg = "请填写年审时间";
					result = false;
				} else if ( !param.endTime ) {
					msg = "请填写到期时间"
					result = false;
				}
			   
			} else if ( cate === "INSURANCE" ) {
				msg = "INSURANCE"
			} else if ( cate === "PASS_CHECK" ) {
				msg = "PASS_CHECK"
			} else if ( cate === "REPAIR" ) {
				msg = "REPAIR"
			}
			if( this.remindUnit === "Day" && param.remindTime > param.effectiveTime ){
				msg = "提醒时间超过了持续时间"
				result = false;
			} else if ( param.remindMileage > param.effectiveMileage ){
				msg = "提醒里程超过了有效里程"
				result = false;
			}
			return { 
				result,
				msg
			};
		},
		doSend (sendParam) {
			this.submit_block = true;
			console.log("请求方式：",this.addMode)
			send({
					type: this.addMode,
					url:'client:/calendar/event_type',
					param:sendParam
				},(err,res)=>{
					if (err) {
						return alert(err);
					}
					if (res.status === 200) {
						alert( (this.addMode==="post"?"添加成功":"修改成功") ,"success")
						console.log("添加" + this.data_cate + "成功\n",res)
						this.request_record(this.data_cate)                        
					} else {
						console.log("添加失败",res)
						alert(res.msg)
					}
					this.initParam(this.data_cate);
					this.forceRefreshBtnSelect(this.data_cate)
					this.addMode = 'post'
					this.submit_block = false;
			})
		},

		//hack for category btn_selects' innerText don't work
		forceRefreshBtnSelect(cate){
			let formName = ""
			if(cate === "VERIFICATION"){
				return;
			}
			switch(cate){
				case "PASS_CHECK" 	: formName = "form_carpass_code" 	; break;
				case "INSURANCE" 	: formName = "form_insurance_code" 	; break;
				case "REPAIR" 		: formName = "form_keeping_code" 	; break;
			}
			if($(`[name=${formName}]`).html().trim()){
				$(`[name=${formName}]`).html("")
			}
		}
	}
}
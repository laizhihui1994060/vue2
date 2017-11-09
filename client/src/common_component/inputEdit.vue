<!-- 只用于显示和修改单个选项 -->
<template>
	<div class="input_edit" el='inputEdit' :style='{display: type == "textarea" ? "block" : "inline-block"}'>
			<label v-html='label + "："' :style="{marginRight:0}"></label>	
			<div v-if='type != "textarea"' class='content' @click='modify' @blur='save' >
				
				<span class='spanShow' v-if='type != "date"' v-show='isShow' v-html='(type == "input" || type =="map") ? (value || value == 0 ? (value + " " + unit) : ( value === 0 ? 0 : "　" ) ) : (btnValue ? btnValue : "　")'></span>

				<!-- input -->
				<input  v-show='isInput' :class='[ inputClass , "input"]' :value='nowInputVal' :type='inputType' @keyup.enter='saveEnter' @focus='bool = true'   @blur.stop.prevent='save' :style='{ backgroundColor: inputBackground, minWidth: inputMinWidth, maxWidth: inputMaxWidth , paddingTop:inputType == "number" ? "2px": 0, borderColor: "transparent" }' />

				

				<!-- date -->	
				<datetimepicker
				    v-if='type == "date"'
				    padding='4px'
				    :minView='minView'
				    :width='dateWidth'
				    :value='value'
				    border='none'
				    background='#fff !important'
				    @updata = 'changeDate'
				    :indexTwo='indexTwo'
				    height='18px'
				    :disabled='disabled' /> 

				 <!-- button 下拉 -->
				<div  id='dropDown' v-if='type == "btn" '>
					<a class=" btn dropdown-toggle caretPar"
					        data-toggle="dropdown" style="" >
					    <span class="caret"></span>
					</a>
					<ul class='dropdown-menu' role="menu" > 
						<li v-if="dataSource && !arr " class="special" >
						    <input class="form-control searchQuery"   placeholder="搜索关键字" v-model="searchQuery">
						</li>
						<!-- object Array -->
						<template v-if="typeof dataSource[0] == 'object'">
							<li  v-for="(attr,index) in showDataSource" :key='attr' >
								<a  href="javascript:;" v-text="attr[objName]" @click.stop="toggleText(attr,$event)" ></a>
							</li>
						</template>
						<!-- string Array -->
						<template v-if="typeof dataSource[0] == 'string'">
							<li  v-for="(attr,index) in showDataSource" :key='attr'>
								<a href="javascript:;" v-text="attr" @click.stop="toggleText(attr,$event)" ></a>
							</li>
						</template>
					</ul>
				</div>

				<!-- 编辑icon -->
				<span  v-if='!disabled' class='edit' style="position:absolute;right:-1px;top:0px;cursor:pointer;"></span> 
			</div>

			<textarea 
				class='textarea'
				v-if='type == "textarea" '
				:name="name" :value='nowInputVal'
				@focus='bool = true'   @blur.stop.prevent='save' >
			</textarea>

			<!-- 地图 -->
			<modelMap v-if='type == "map"' :id='mapId' :text='mapText' :doubleClick='true' />
	</div>
</template>

<script>
	import datetimepicker from './datetimepicker.vue'
	import modelMap from './model_map.vue'
	import "./../../static/js/jquery.flextext"
	export default {
		props: {
			label: {},
			name: {},
			// input的背景颜色
			inputBackground: {},
			// 直接显示的值
			value: {
				default: '　'
			},
			// input、textarea、btn、date、map
			type: {
				default: 'input'
			},
			inputMinWidth: {

			},
			inputMaxWidth: {

			},

			/*
			 * input
			 */
			inputType: {
				default: 'text'
			},
			inputClass: {

			},
			// 单位
			unit: {
				default: ''
			},
			// 验证
			inputCheck: {

			},
			inputMaxNumber: {},
			// 验证提示
			inputCheckTip: {},


			/*
			 * btn
			 */

			// 请求的路径
			url: {

			},
			// 请求方法
			method: {
				default: 'get'
			},
			// 请求参数
			params: {

			},
			// 直接传入的数组
			arr: {

			},
			index: {},
			maxBtnHeight: {
				default:'215px'
			},
			btnWidth: {
				type: String,
				default:'74px'
			},
			// 返回的字段，如没有，则返回obj
			fieldName: {
				
			},

			// 相当于obj.code 中的code 
			objCode: {

			},
			// 相当于 obj.name 中的 name
			objName: {

			},
			// 匹配的搜素
			searchCode: {

			},


			/*
			 *	date
			 */
			minView:{
			},
			dateWidth: {},

			/*
			 * map
			 */	
			 mapId: {
			 	default: 'rescue'
			 },
			 mapText: {
			 	default: '设为目的地'
			 },
			 // 区别两个地图的ID
			 diffMapId: {

			 },

			// disabled, 不能修改, 为了某些不能修改，只展示的使用
			disabled: {
				type: Boolean,
				default: false
			},
			indexTwo: {

			},
		},
		components: {
			datetimepicker,
			modelMap
		},

		data(){
			return {
				isShow: true,
				isInput: false,
				isBtn: false,


				dataSource: [],
				showDataSource: [],

				btnValue: '',

				nowInputVal: '',
				saveEnterBool: false,
				saveBool: true,

				searchQuery: '',

				$el: null,
				bool:false
			}
		},
		mounted(){
			const that = this;
			this.nowInputVal = this.value;
			const $el = $(that.$el);


			

			setTimeout(function(){

				let time = null;

				if(!that.disabled){
					// 没有禁用
					
					$el.find('.content').hover(function(e){
						$el.find('.edit').css('display', 'inline-block');
						$el.find('.content').css({
							'borderColor': '#ccc'

						});
						clearTimeout(time);
						$el.find('#dropDown').show();
					}, function(e){

						time = setTimeout(function() {
							if(that.bool)return; 

							$el.find('#dropDown').hide();
							$el.find('.edit').hide();
							$el.find('.content').css({
								'borderColor': 'transparent',
							});
							$el.find('#dropDown').removeClass('open');
						}, 100);

					});

					// document.addEventListener('click', (e) => {
					//        if (!that.$el.contains(e.target)){
					//        	 $el.find('#dropDown').hide();
					//        }
					// });
				}

				if(that.type == 'btn'){
					if(that.url){
						// 请求数据
						that.getData(function(){
							that.searchValue();
						});
					}else if(that.arr){
						that.dataSource = that.showDataSource = that.arr;

						if(!that.value) {

							that.searchValue();
						}
					}
				}else if(that.type == 'map'){
					bus.$on('updataAdress', function(type, addressObj, details){

						const arr = addressObj.Longitude.split(','),
							   lnt = arr[0],
						         lat = arr[1],
						         address = addressObj.address;
						const data = {
							type: type,
							gps: {
								lnt: lnt,
								lat: lat
							},
							address: address
						}
						console.warn(type, that.diffMapId)
						if(type == that.diffMapId){
							$(that.$el).find('.spanShow').text(address);
						}
						
						$('#' + that.mapId).modal('hide');

						that.$emit('updata',that.name, data, this.index, this.indexTwo);
					});
				}

				that.$nextTick(function(){
				    if(that.searchCode){
				        that.searchValue();
				    }else if(that.type == 'btn' && that.value){
				    	  that.btnValue  = that.value;
					}
					$('textarea').flexText();
				});
			}, 500)
		},
		methods: {

			modify(e){
				if(this.disabled) return;

				const that = this;
				const $el = $(that.$el);
				const $currentTarget = $(e.currentTarget);


				if(that.type == 'input'){
					that.isInput = true;
					that.isShow = false;
					$el.find('.content').css({
						'borderColor': '#999'
					});
					$currentTarget.css('border', '1px solid #999');
					that.$nextTick(() => {
						$currentTarget.find('input').focus();
					});
				}else if(that.type == 'btn'){

					$currentTarget.find('#dropDown').css('display', 'inline-block')
				}else if(that.type == 'map'){
					$('#' + that.mapId).modal('show');
				}
			},
			// input enter save
			saveEnter(e){
				const that = this;
				that.isInput = false;
				that.isShow = true;

				// 判断是enter
				that.saveEnterBool = true;
				that.saveBool = true;


				const target = e.target,
					   val = target.value;

				console.log(e.target.value,  this.nowInputVal)

				if(e.target.value == this.nowInputVal) return;
				
				// 验证
				if(that.inputCheck){
					const pattern = new RegExp(that.inputCheck);
					
					if(!pattern.test(val)){
						alert(that.inputCheckTip || '不符合规范!');
						that.saveBool = false;
					    	return;
					}
				}else if(that.inputMaxNumber){
					if(val >= that.inputMaxNumber){
						alert(that.inputCheckTip || '不能大于' + that.inputMaxNumber);
						that.saveBool = false;
					    	return;
					}
				}
				that.nowInputVal = val;
				that.$emit('updata',that.name, that.nowInputVal, that.index, that.indexTwo );
				$(that.$el).find('.spanShow').text(that.nowInputVal.toString().trim() ? that.nowInputVal : '　');
				$(that.$el).find('.input').val(that.nowInputVal);

			},
			// blur save
			save(e){
				const that = this;
				$(that.$el).find('.content').css({
					'borderColor': 'transparent'
				});
				that.isInput = false;
				that.isShow = true;

				that.bool = false;

				$(that.$el).find('.edit').hide();
				
				if(e.target.value == this.nowInputVal) return;

				const target = e.target,
					    val = e.target.value;

				// 验证
				if(this.inputCheck){
					const pattern = new RegExp(this.inputCheck);
					if(!pattern.test(val)){
						alert(this.inputCheckTip || '不符合规范!');
					   	return;
					}
				}else if(that.inputMaxNumber){
					if(val >= that.inputMaxNumber){
						alert(that.inputCheckTip || '不能大于' + that.inputMaxNumber);
					    	return;
					}
				}
				// blur 触发
				$(this.$el).find('.spanShow').text(val.toString().trim() ? val : '　');
				$(this.$el).find('.input').val(val);
				this.nowInputVal = val;
				this.$emit('updata',this.name, val , this.index, this.indexTwo );
			},
			// btn save
			toggleText(object, $event){

				const result = this.fieldName ? object[this.fieldName] : object
				this.$emit('updata', this.name, result, this.index, this.indexTwo );

				$(event.currentTarget).parentsUntil('#dropDown').eq(1).parent().hide();
				// 改变
				const value = $event.currentTarget.innerHTML;
				this.btnValue = value;
			},
			getData(complete){
				const that = this;
				send({
				    type: that.method,
				    url:that.url,
				    param: that.params
				},function(err,res){
				    if(err)return console.log(that.url,err);
				    if(res.status == 200 || res.status == 412 || res.status == 404 ){
				        if(!res.content || !res.content[0]){
				            that.dataSource = that.showDataSource = [];
				        }else if(res.content[0].orgParam && res.content[0].orgParam.value && res.content[0].orgParam.values){
				            that.dataSource = that.showDataSource = res.content[0].orgParam.value.values;
				        }else if(res.content[0].value && res.content[0].value.values){
				            that.dataSource = that.showDataSource = res.content[0].value.values;
				        }else if(res.content[0].orgParam && res.content[0].orgParam.value && res.content[0].orgParam.value.oil_type_list ){
				            that.dataSource = that.showDataSource =  res.content[0].orgParam.value.oil_type_list;
				        }else{
				            that.dataSource = that.showDataSource = res.content;
				        }
				    }else{
				        console.log(that.url,res)
				    }

				    if(complete) complete();
				});
			},
			searchValue(){
				const that = this;
				const arr = that.arr ? that.arr : that.dataSource;
				if(!that.searchCode) return;
				arr.some( (obj, index) => {
					if(obj[that.objCode] == that.searchCode){
						that.btnValue = obj[that.objName];
						return true;
					}
				});
			},
			changeDate(name, timestamp){
				this.$emit('updata',this.name, timestamp, this.index, this.indexTwo )
			}
		},
		watch: {
			searchCode(newVal, oldVal){
				this.searchValue();
			},
			value(newVal, oldVal){
				if(this.type == 'btn'){
					this.btnValue = newVal;
				}else{
					this.nowInputVal = newVal;
				}
			},
			// 筛选
			searchQuery(newVal, oldVal){
				const that = this;
				if(typeof that.dataSource[0] == 'object'){
					that.showDataSource = that.dataSource.filter( (obj, index) => {
						return obj[that.objName].indexOf(newVal) != -1;
					});
				}else if(typeof that.dataSource[0] == 'string'){
					that.showDataSource = that.dataSource.filter( (value, index) => {
						return value.indexOf(newVal) != -1;
					});
				}
				
			},

			// 改变disabled
			disabled(newV){
				const that = this;
				const $el = $(that.$el);
				if(!that.disabled){
					// 没有禁用
					
					$el.find('.content').hover(function(e){
						$el.find('.edit').css('display', 'inline-block');
						$el.find('.content').css({
							'borderColor': '#ccc'

						})
					}, function(e){
						$el.find('.edit').hide();
						$el.find('.content').css({
							'borderColor': 'transparent',
						})
					});

					document.addEventListener('click', (e) => {
					       if (!that.$el.contains(e.target)){
					       	 $el.find('#dropDown').hide();
					       }
					});
				}else{
					$el.find('.content').off('mouseenter').unbind('mouseleave');
				}
			}
		}
	}

</script>

<style scoped>
	.edit{
		display: none;
		width: 24px;
		height: 24px;
		background: #ccc url('../assets/edit.png') no-repeat center;
		background-size: 70%;
		border-radius: 0 4px 4px 0;

	} 
	#dropDown{
		float: right
	}
	.content{
		display: inline-block;
		min-width: 100px;
		position: relative;
		left: 1px;
		border:  1px solid transparent;
		border-radius: 4px;
		padding-right:23px;
		height: 26px;
		padding-left: 4px;
		
	}
	
	.input{
		background-color: #fff;
		
	}
	.input[type='number']{
		border: none;
	}

	/*
	 *  btn
	 */

	  button{
	      min-height: 24px;
	  }
	  .filter{
	      border:1px solid rgb(57, 182, 229);
	      background: #fff !important;
	  }
	  .filter[disabled]{
	      background-color:  #e9e9e9 !important;
	      border:1px solid transparent !important;
	  }
	  button[disabled]{
	      background-color: #C3C3C3 !important;
	  }
	  .caretPar{
	      padding: 3px 5px;
	      line-height: 16px;
	      border-radius: 0;
	  }
	  .special{
	  	min-width: 100px;
	      border-radius: 0;
	  }
	  .special input{
	      width: 100%;
	      background: #fff !important;
	  }
	  .dropdown-menu .form-control{
	      border-right: 0;
	      border-width: 0;
	      /*box-shadow: 0 0 11px rgba(57, 182, 229,.6);*/
	  }
	 .dropdown-menu.arr li{
	     cursor: pointer;
	     text-align:center;
	     
	 }
	 .arr{
	    padding:5px;
	    width:100px !important;
	 }

	  #dropDown{
	  	display: none;
	  }
	  .setColor{
	      color: #333;
	  }
	  .btn-group .dropdown-toggle.grayBtn{
	      background-color:#999;
	  }
	  .setWidth{
	      padding-left: 15px;
	      overflow: hidden;
	      white-space: nowrap;
	      text-overflow: ellipsis;
	      padding-right: 0;
	      text-align: left;
	      line-height: 10px !important;
	  }
	  .btn-group .setWidth .filter .grayBtn{
	      border:1px solid #999;
	      background-color:transparent;
	      height:24px;
	  }
	  .special input{
	      padding-left: 6px;
	      border-radius: 0;
	      box-shadow: 0 0 11px rgba(57, 182, 229,.6);
	      font-size: 12px;
	      line-height: 13px;
	      height: auto;
	  }
	  .after:after{
	      content: '';
	      background: url('../assets/img.png') 0 -20px;
	      width: 7px;
	      height: 7px;
	      position: absolute;
	      left: 0;
	      top: 7px;
	  }
	  .inputSelect{
	      float: left;
	      border-width: 0;
	      background-color: rgb(223, 245, 253);
	      line-height: 23px;
	      padding-left: 16px;
	      font-size: 12px;
	  }
	  .inputSelect[disabled]{
	      background-color: #e9e9e9 !important;
	  }
	  .btn-group > .btn:hover, .btn-group-vertical > .btn:hover, .btn-group > .btn:focus, .btn-group-vertical > .btn:focus, .btn-group > .btn:active, .btn-group-vertical > .btn:active, .btn-group > .btn.active, .btn-group-vertical > .btn.active{
	      z-index: 0;
	  }
	  .dropdown-menu{
	  	width: 100%;
	  	left: -1px;
	  }
	  .spanShow{
	  	margin-right: 8px;
	  	line-height: 24px;
	  	display: inline-block;
	  }
	  .caretPar{
	  	background: none !important;
	  	color: #000 !important;
	  }
	  .textarea{
		  padding:5px;
		  border: 1px solid #ccc;
	  }
</style>
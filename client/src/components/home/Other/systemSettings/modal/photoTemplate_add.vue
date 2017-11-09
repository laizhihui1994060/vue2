<template>
	<div id="photoTemplateAdd">
		<breadcrumb
		    :arr="[{path:'/LoginFinish/systemSettings/photoTemplate',text:'拍照模板'},{path:'',text:isCreate ? '添加模板':'查看模板'}]"/>
		<article>基本信息</article>
		<div class='details'>
			<div class="details-body">
				<div class="row">
					<div class="col-xs-8" id="isNull">
						<form-label-input  
							:after='true'
						    label='模板名称' 
						    inputWidth='8rem'
						    name='templateName'
						    :value='chosen.templateName'
						    @updata="integrationDate"/>
					</div>
					<div class="col-xs-2">
						<checkbox top='0px' text='标准模板' :checked='chosen.standard' name='standard' @updata="integrationDate"/></checkbox>	
					</div>
					<div class="col-xs-2">
						<checkbox top='0px' text='启用' :disabled='true' :checked='chosen.active' name='active' @updata="integrationDate"/></checkbox>	
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<form-label-input  
						    label='模板说明' 
						    inputWidth='15rem'
						    name='templateDesc'
						    @updata="integrationDate"
						    :value='chosen.templateDesc'
						    />
					</div>
				</div>
				<div class="row"> 
					<div class="col-xs-12">
						<div style='width:70px;display:inline-block'>业务类型</div>
						<div style='' class="inline" v-for="i in jobList" :key='i.code'>
							<radio top='0px	' @updata="integrationDate" :value='i.code' :text='i.name'  name="jobType" :checked='i.code == chosen.jobType'/>
						</div>
					</div>
				</div>
				<hr />
				<div class="modal-footer" style="padding-top: 0">
				    <div class="btns">
				        <button type="button" style="margin: 0 50px;" class="btn"  @click="addModifyTemplate">{{ isCreate ? '添加' : '修改' }}</button>
				        <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/photoTemplate' }" active-class=' ' class='btn' >返回</router-link>
				    </div>
				</div>


				<template v-if='hasTemplateId'>
					<div class="row" style='border-top:1px solid #ccc; border-bottom: 1px solid #ccc;padding:10px 0;'>

						<!-- <div class="col-xs-10" style="margin: 20px 0">
							<btn-select
								label="模板类型"
							/>
						</div> -->

						<div class="col-xs-12 mustInput">
							<span class='feedback'>反馈环节</span>
							<div class="feedback_details">
								<div class="pull-left" style='margin-left:30px;margin-top:10px;'>
									<ul>
										<li v-for='(obj,index) in feedback' :class="{'actice':currentSectionIndex == index}" :key='obj'>
											<a  @click.stop.prevent="serializationSection(obj.code,index)" href="javascrfipt:;" class="setFont">{{obj.desc}}</a>
											<a v-if="currentSectionIndex == index"  @click.stop.prevent="addTemplateItem" href="javascrfipt:;" style="font-size:12px;">(添加拍照项)</a>
											<ul style='margin-left:20px;'>
												<li 
													v-for='(item,i) in chosen.item[obj.code]'
													:key='item' 
													@click.stop.prevent="serializationItem(item,i,obj.code,index)" >
													<a v-text="item.desc ?item.desc : '请输入拍照项目'"  :class="{'actice':currentItemIndex === i}"></a>
												</li>
											</ul>	
										</li>
									</ul>
								</div>
								<div class="pull-left" style='margin-left:50px;' v-show="currentCode && currentItem.photoTemplateId">
									<div class="row">
										<div class="col-xs-12">
											<form-label-input  
											    label='拍照项目' 
											    inputWidth='9.5rem'
											    name='desc'
											    :after='true'
											    @updata='integrationItemDate'
											    :value='currentItem.desc'/>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-12">
											<form-label-input  
											    label='注意事项' 
											    inputWidth='9.5rem'
											    name='notes'
											    @updata='integrationItemDate'
											    :value='currentItem.notes'/>
										</div>
									</div>
									<div class="row">
										<div class="col-xs-12">
											<span style="vertical-align: top;display: inline-block;width:69px;">样板照片</span>
											<input-img display='inline-block' :limit='1' :clear="clearNumber" :arr="currentItem.exampleImgId ? [{imageId:currentItem.exampleImgId}] : []"  @updata="watchImg"/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
					    <div class="btns" v-if="currentItemIndex !== ''">
					        <button type="button" class="btn radius-btn" @click="modifyTemplateItem" v-text="add ? '添加':'修改'"></button>
					        <button type="button" class="btn radius-btn" @click="deleteTemplateItem">删除</button>
					    </div>
					</div>
				</template>
			</div> 
		</div>
			
	</div>
</template>

<script>
	var is = true;
	import breadcrumb from '../../../../../common_component/breadcrumb.vue'
	import formLabelInput from '../.././../../../common_component/form-label-input.vue'
	import checkbox from '../../../../../common_component/checkbox.vue'
	import radio from '../../../../../common_component/radio.vue'
	import inputImg from '../../../../../common_component/inputImg.vue'
	import btnSelect from '../../../../../common_component/btn_select'
	export default {
		data(){
			return {
				templateName: '',
				hasTemplateId: false,
				templatePath:["/sys/photo/driver_actions"],
				chosen: {
					templateId:'',
					templateName:'',
					templateDesc:'',
					standard:true,
					jobType:'01',
					jobTypeName:'',
					active:true,
					item:{

					}
				},
				chosenItem:{
					photoTemplateId:'',
					photoTemplateItemId:'',
					typeTowDriver:'',
					notes:'',
					desc:'',
					itemId:'',
					exampleImgId:''
				},
				isCreate: true,
				isItemCreate: true,
				res:{},
				clearNumber:0,
				currentSectionIndex:null,
				itemres:{},
				itemimagearray:[],
				feedback: [],
				feedbackItems: [],
				jobList:[],
				flies:[],
				itemAddparam:[],


				currentCode:'',
				currentItem:{
					desc:'',
					exampleImgId:'',
					itemId:'',
					notes:'',
					photoTemplateId:'',
					photoTemplateItemId:'',
					typeTowDriver:''
				},
				add: true,
				currentItemIndex:'',
				el:null
			}
		},
		components: {
			breadcrumb,
			formLabelInput,
			checkbox,
			inputImg,
			radio,
			btnSelect
		},
		methods:{
			watchImg(name,flies,i){  
				console.log(flies)
                this.flies = flies;
            },
			
			integrationDate(name,item){
                this.res[name]= item;
            },
            integrationItemDate(name,item){
                this.currentItem[name] = item;
            },
            addModifyTemplate(){},
			addTemplate(){
				var self = this;

				let bool = true;

				$('#isNull').find('[verify="true"]').each(function(index, el) {
					el.style.border = 'none';
					if(!el.value){
            			el.style.border = '1px solid #f9bcbc';
            			bool = false;
					}					
				});

				if(!bool)return alert('请先完善数据');
				
				send({
					type:'post',
					url:'control:/photo_template',
                    param: this.res
				},function(err,res){
					if(err)return console.log(err);
					if(res.status == 200){
						console.log(res);
						/*console.log(res.content.id);
						this.res.templateId = res.content.id;
						*/
						self.hasTemplateId = true;
						self.isCreate = false ;
						self.addModifyTemplate = self.modifyTemplate;
						self.chosen.templateId = res.content[0].id;
						self.res.templateId = res.content[0].id;
						alert('添加成功！', 'success');
					}else{
						console.log(res);
						alert(res.msg);
					}
				});

			},
			modifyTemplate(){
				var self = this;
				let bool = true;

				$('#isNull').find('[verify="true"]').each(function(index, el) {
					el.style.border = 'none';
					if(!el.value){
            			el.style.border = '1px solid #f9bcbc';
            			bool = false;
					}					
				});

				if(!bool)return alert('请先完善数据');
				

				if(self.res){
					for(var key in self.res){
						self.chosen[key] = self.res[key];
					}

					self.res.templateName = self.res.templateName ? self.res.templateName : self.chosen.templateName;
				
					send({
						type:'put',
						url:'control:/photo_template/'+this.chosen.templateId,
	                    param: self.chosen
					},function(err,res){
						if(err)return console.log(err);
						if(res.status == 200){
							console.log(res);
							alert(res.msg, 'success');
						}else{
							console.log(res);
							alert(res.msg);
						}
					});
				}else{
					alert("无修改的数据!");
				}
			},
			addTemplateItem(){
				if(!is){
					$('#photoTemplateAdd').find('input[name="desc"]').focus().select();
					return alert('请逐条添加');
				}
				is =false;
				this.flies = [];
				++this.clearNumber;

				if(!this.chosen.item[this.currentCode])this.chosen.item[this.currentCode] = [];
				this.chosen.item[this.currentCode].push({
					desc:'新建照片项',
					exampleImgId:'',
					itemId:this.chosen.item[this.currentCode].length + 1,
					notes:'',
					photoTemplateId:this.chosen.templateId,
					typeTowDriver:this.currentCode
				});
				this.currentItem = this.chosen.item[this.currentCode][this.chosen.item[this.currentCode].length-1];
				this.$nextTick(function(){
					$('#photoTemplateAdd').find('input[name="desc"]').focus().select();
				});
				this.add = true;
				this.currentItemIndex = this.chosen.item[this.currentCode].length-1;
			},
			
			modifyTemplateItem(){

				const self = this;
				let bool = true;
				$('#photoTemplateAdd').find('[verify="true"]').each(function(index,el){
				    el.style.backgroundColor = '#DFF5FD';
				    if(!el.innerHTML && !el.value){
				        el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
				        bool = false;
				    }
				});
				console.log(this.currentItem)
				if(this.currentItem.desc == "新建照片项"){
					$('#photoTemplateAdd').find('input[name="desc"]').focus().select();
					return alert('拍照项目不合法，请重新命名');
				}
				if(bool){
					if(this.flies.length > 0 ){
						// 上传图片
						var promise = new Promise( (resolve, reject) => {
							global.fileUp(this.flies,function(res){
				              	self.currentItem["exampleImgId"] = res[0].imageId;
				              	resolve();
			              	});
						});
					}else{
						var promise = new Promise( (resolve, reject) => {
							resolve();
						});
					}
					if(!this.add){

						
						promise.then( () => {
							

							send({
								type:'put',
								url:'control:/photo_template/item',
			                    param: [self.currentItem]
							},function(err,res){
								if(err)return console.log(err);
								if(res.status == 200){
									console.log(res);
									alert(res.msg, 'success');
									self.add = true;
								}else{
									console.log(res);
									alert(res.msg);
								}
							});
						});

					}else{

						promise.then( () => {
		              		
	  		              	send({
	  							type:'post',
	  							url:'control:/photo_template/item',
	  				            param: [self.currentItem]
	  						},function(err,res){
	  							if(err)return console.log(err);
	  							if(res.status == 200){
									self.add = true;
	  								alert(res.msg, 'success');
	  								self.chosen.item[self.currentCode][self.chosen.item[self.currentCode].length-1].photoTemplateItemId = res.content[0].id
	  								console.log(res);
									is = true;
									self.add = false;
	  							}else{
	  								console.log(res);
	  								alert(res.msg);
	  							}
	  						});
		              	});

					}
				}else{
					alert('请填写完整数据');
				}

				
			},
			deleteTemplateItem(){
				const self = this;

				if(!self.currentItem.photoTemplateItemId)return alert('请先添加模板','warning');
				send({
					type:'delete',
					url:'control:/photo_template/item',
		        	param: [self.currentItem.photoTemplateItemId]
				},function(err,res){
					if(err)return console.log(err);
					if(res.status == 200){
						console.log( self.currentItemIndex )
						var len = self.currentItemIndex ? self.currentItemIndex : self.chosen.item[self.currentCode].length-1;
						console.log(self.el);
						// return 
						// self.el.remove();
				
						self.chosen.item[self.currentCode].splice(len,1);

						self.currentCode = '';
						self.currentItem = {
							desc:'',
							exampleImgId:'',
							itemId:'',
							notes:'',
							photoTemplateId:'',
							photoTemplateItemId:'',
							typeTowDriver:''
						};
						console.log(res);
						alert(res.msg, 'success');
					}else{
						console.log(res);
						alert(res.msg);
					}
				});
				
			},
			serializationSection(item,index,ev){
				is=true;
				if(this.currentCode && this.chosen.item[this.currentCode] && this.chosen.item[this.currentCode].length && this.chosen.item[this.currentCode][this.chosen.item[this.currentCode].length-1].desc == '新建照片项' && this.chosen.item[this.currentCode][this.chosen.item[this.currentCode].length-1].notes == '' && !this.flies.length)this.chosen.item[this.currentCode].pop();

				if( this.chosen.item[this.currentCode] && this.chosen.item[this.currentCode].length && !this.chosen.item[this.currentCode][this.chosen.item[this.currentCode].length-1]['photoTemplateItemId'] ) {
				console.log( this.chosen.item[this.currentCode][this.chosen.item[this.currentCode].length-1])
					this.chosen.item[this.currentCode].pop();
				}

				this.currentCode = item;
				this.currentSectionIndex = index;
				this.flies = [];

				this.currentItem = {
					desc:'',
					itemId:'',
					notes:'',
					photoTemplateId:'',
					photoTemplateItemId:'',
					typeTowDriver:''
				};
				this.currentItemIndex = '';


				var ev = ev ||event;
				if($(ev.target).next()[0] && $(ev.target).next()[0].tagName == 'UL' && $(ev.target).next().find('li').length  ){

					this.el = $(ev.target);
					console.log( $(ev.target).next().find('li').length )
					this.currentItem = this.chosen.item[item][0];
					this.currentItemIndex = 0;
					this.add = false;
				}
				

			

			},
			serializationItem(item,index,code,index1,ev){
				this.serializationSection(code,index1);
				var ev = ev ||event;
				this.el = $(ev.target);
				this.currentSectionIndex = index1;

				this.currentItem = item;
				this.currentItemIndex = index;
				this.add = false;
			},
			clearItem(){

					this.itemimagearray = [];
					/*this.isItemCreate = true;*/
					this.chosenItem = {
						desc: '',
						exampleImgId: '',
						itemId: '',
						notes: '', 
						photoTemplateId: '',
						photoTemplateItemId: '',
						typeTowDriver: ''
					}

			}
		},
		created(){
			const self = this;
			is = true;
			self.isCreate = self.$route.params.isCreate && self.$route.params.isCreate.toString() === 'true';
			self.id = self.$route.params.id;
            if(self.isCreate){
                self.addModifyTemplate = self.addTemplate;
            }else{
                self.addModifyTemplate = self.modifyTemplate;
                // 获取数据
                
	            send({
	            	type:'get',
	            	url:'control:/photo_template/' + self.id,
	            },function(err,res){
	            	if(err)return alert('服务器出错，请联系管理员');
	            	if(res.status == 200){
	            		let content = res.content[0];
	            		
	            		if( content && content.item){
	            			for(let i in content.item){
	            				if(content.item[i] instanceof Array && content.item[i].length ){
	            					content.item[i] = content.item[i].sort(function(a,b){
	            						return a.itemId - b.itemId
	            					});
	            				}
	            			}
	            		}
	            		self.chosen = content;
            			self.hasTemplateId = true;
            			console.log(res)
	            	}else{
	            		console.log(res);
	            		alert(res.msg);
	            	}
	            });
            }



			send({
				type:'get',
				url:'control:/job/type/grade'
			},function(err,res){
				if(err)return console.log(err);
				if(res.status == 200){
					self.jobList = res.content;
				}else{
					alert(res.msg);
					console.log(res)
				}
			});

			// 反馈环节
			send({
				type:'post',
				url:'control:/sys/param',
				param: ["/sys/photo/driver_actions"]
			},function(err,res){
				if(err)return alert('服务器出错，请联系管理员');
				if(res.status == 200){
					self.feedback = res.content[0].value.values;
				}else{
					alert(res.msg);
					console.log(res)
				}
			})
		}
	}
</script>

<style>
	#photoTemplateAdd{
		font-size: 14px;
	}
	#photoTemplateAdd .details{
		background:#fff;
		padding:50px;
	}
	#photoTemplateAdd .row{
		margin:10px 0;
	}
	#photoTemplateAdd .my_checkbox{
		margin:0 10px;
	}

	#photoTemplateAdd .feedback{
		position: relative;
		cursor: pointer;
	}
	#photoTemplateAdd .feedback_details li{
		cursor: pointer;
	}
	#photoTemplateAdd .feedback_details li a:hover{
		color:#39B6E5;
	}
	#photoTemplateAdd .feedback_details li a{
		color:#999999;
		font-size: 12px;
	}
	#photoTemplateAdd .feedback:after{
		content: '';
		display: block;
		position: absolute;
		width:8px;
		height: 6px;
		background: url(../../../../../assets/img.png) no-repeat 0 -45px;
		top:8px;
		left:-10px;
	}
	#photoTemplateAdd .input_img > div h2{
		line-height: 62px;
	}
	#photoTemplateAdd .feedback_details li li a{
		color: #999999;
	}
	#photoTemplateAdd .inline{
		display: inline-block;
	}
	#photoTemplateAdd .feedback_details .actice > a:nth-child(1){
        color: #39B6E5;
        font-size:16px;
	}
	#photoTemplateAdd .actice > a:nth-child(2){
        color: blue;
	}
	#photoTemplateAdd .actice ul a:hover{
		color: #333
	}
	#photoTemplateAdd .actice ul .actice{
		color: #333;
		font-size: 14px;
	}
	#photoTemplateAdd .feedback_details .itemActice a{
		/*background: #DFF5FD;*/
        color: blue;
        font-size:20px;
	}
	#photoTemplateAdd .feedback_details li .setFont{
		color: #555 ;
		font-size: 14px !important;
	}
</style>
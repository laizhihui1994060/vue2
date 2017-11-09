<template>
  	<div class="downChoice">	
	  	<div id="addClient">
	  	 	<form style='padding-left:20px'>
				<template v-if="people!=='staff'">
					<form-label-input  
					    label='单位名称' 
					    placeholder="请输入公司名称" 
					    inputWidth='170px'
					    name='companyName'
					    :after='true'
					    @updata="integrationDate"
					    :value="paramter.companyName"/>
				</template>
  
		  	 	<form-label-input  
		  	 		style='margin:10px 0'
				    label='姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名' 
				    placeholder="请输入联系人姓名" 
				    inputWidth='170px'
				    name='name'
				    :after='true'
				    @updata="integrationDate"
				    :value="paramter.name"/>
				<form-label-input  
				    label='电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话' 
				    placeholder="请输入联系人电话" 
				    inputWidth='170px'
				    name='phone'
				    :after='true'
				    type='number'
				    @updata="integrationDate"
				    :value="paramter.phone"/>
 	    	</form> 
 	       	<div style="margin-top:10px;padding-left:20px;">
 	       		<div>
	 	       		<radio 
	                    text="客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户" 
                        :checked="paramter.isCustomer ? 'checked':''"
	                    name="type"
	                    value="isCustomer"
	                    @updata="integrationDate"
	                    :imgLeft="true"/>
 	       		</div>
 	       		<div>
	 	       		<radio 
	                    text="服&nbsp;&nbsp;务&nbsp;&nbsp;商" 
                        :checked="paramter.isProvider ? 'checked':''"
	                    value="isProvider"
	                    name="type"
	                    @updata="integrationDate"
	                    :imgLeft="true"/>
 	       		</div>
 	       		<div>
	 	       		<radio 
	                    text="员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工" 
	                    value="isEmployee"
	                    name="type"
                        :checked="paramter.isEmployee ? 'checked':''"
	                    @updata="integrationDate"
	                    :imgLeft="true"/>
 	       		</div>
        	</div>
        	<div class="footer">
        		<button class="btn" type="button" @click='addClient' v-text="footerTxt" :style="{marginLeft:data?'10px' : '30px'}"></button>
        		<button class="btn" type="button" @click='del' v-if="data" style="margin:0 15px;">删除</button>
 	        	<button class="btn" type="button" v-text="data ? '返回': '取消'" @click="isreturn" :style="{marginLeft:data?0 : '70px'}"></button>
        	</div>
 	       
       </div>
      
  	</div>
</template>
<script>
 import formLabelInput from '../../../common_component/form-label-input.vue'
 import radio from '../../../common_component/radio.vue'

    export default {
    	props:['data'],
 		components:{
 			formLabelInput,
 			radio
 		},
	  	mounted(){
	  		const self = this;

	  		this.$nextTick(function(){

		  		if(self.data){
		  			$('#addClient input').attr('disabled',true);
		  			self.paramter = JSON.parse(JSON.stringify(self.data));
		  			self.footerTxt = '修改';
		  		}
	  		});

	  	},
	    data(){
		    return {
		    	uuid: uuid(),

		    	footerTxt: '添加',
		      	people:'client',
		      	paramter:{},
		      	
		    }
	    },
	    methods:{
	    	integrationDate(name, item){
	            if(item =='isProvider' || item =='isCustomer' || item =='isEmployee'){
	            	this.paramter['isProvider'] = false;
	    			this.paramter['isCustomer'] = false;
	    			this.paramter['isEmployee'] = false;
	    			this.paramter[item] = true;
	            }else{
	            	this.paramter[name]= item;
	            }
	    		
	        },
	        del(){
	        	const self = this;
	        	send({
		            type:'delete',
		            url:'client:/phonebook/' + this.paramter.phoneBookId,
		        },function(err,res){
		            if(err)return console.log(err);
		            if(res.status == 200){
		                console.log(res);
                		self.$emit('changeView','client');
		                alert(res.msg, 'success');
		            }else{
		            	alert(res.msg)
		                console.log(res)
		            }
		        });
	        },
	        isreturn(){
                this.$emit('changeView','client');
	        },
	    	addClient(){
	    		console.log(this.paramter)
	    		const self = this;
	    		if(this.data){
	    			// 修改
		  			if($('#addClient input').attr('disabled') == 'disabled'){
		  				self.footerTxt = '保存';
		  				$('#addClient input').attr('disabled',false);
		  				return ;
		  			}
		    		send({
			            type:'put',
			            url:'client:/phonebook/' + this.paramter.phoneBookId,
			            param: this.paramter
			        },function(err,res){
			            if(err)return console.log(err);
			            if(res.status == 200){
			                console.log(res);
			                self.$emit('changeView','client');
			                alert(res.msg, 'success');
			            }else{
			                console.log(res.msg ? res.msg : '修改失败，请联系管理员！');
			            }
			        });
	    		}else{
	    			// 添加
	    			let bool = true;
	    			console.log($('#phone-menu-list input[verify="true"]'))
	    			$('#phone-menu-list input[verify="true"]').each(function(index, ele){
	    				const $ele = $(ele);
	    				console.log($ele.val(), ele)
	    				if(!$ele.val()){
	    					$ele.css('background', 'rgba(255, 0, 0, 0.26)');
	    					console.log('ssss')
	    					bool = false;
	    				}else{
	    					$ele.css('background', 'rgb(223, 245, 253)')
	    				}
	    			}); 
	    			console.log(bool);	
	    			if(!bool) return;

	    			this.paramter.phoneBookId = this.uuid;

		    		send({
			            type:'post',
			            url:'client:/phonebook',
			            param: this.paramter
			        },function(err,res){
			            if(err)return console.log(err);
			            if(res.status == 200){
			                console.log(res);
			                self.$emit('changeView','client');
			                alert(res.msg, 'success');
			            }else{
			                console.log(res.msg ? res.msg : '修改失败，请联系管理员！');
			            }
			        });
	    		}
	    	}
	    }
  	}
</script>
<style scoped>
#addClient .downChoice label{
	color: #333333;
	width:70px;
	line-height:14px;
	letter-spacing:0;
}
#addClient .bigfont{
	font-size:14px;
}
#addClient .my_radio label{
	min-width: 60px;
}
#addClient{
  	width:100%;
  	height:100%;
	padding: 20px 10px;
  	background:white; 
  	z-index:499;
  	box-shadow:0px 3px 20px rgba(174,225,244,.8);
}
#addClient label{
	margin-bottom: 7px;
}
#addClient form input[type=text]:not(:first-child){
	background: #DFF5FD;
	border:none;
	width:140px;
	font-size:12px;
	display:inline-block;
	height:22px;
	padding:5px;
	margin-bottom:8px;
}


#addClient .radius{
	position:relative;
	top:5px;  
	display:inline-block;
	zoom:1;
	width:18px;
	height:18px;
	border:1px solid #39B6E5;
	border-radius:9px; 
	padding:3px;
	cursor:pointer;
}

#addClient .sub_radius{
	width:10px;
	height:10px;
	border:1px solid #39B6E5;
	border-radius:5px; 
	background-color: #39B6E5;
}
#addClient .footer{
	padding-top: 26px;
	margin:0;
}
#addClient .footer button{
	width:72px;
	font-size:12px;
	text-align:center;
	border:1px solid #1785F7;
	background:none;
	color:#1785F7;
}
#addClient .pull-right{
	margin-right:0px;
}
</style>
<template>
    <div class="form-group resetPadding" v-if="filtrationCondition"> 
    	<div class="toggleView clearfix">
    	</div> 
        <div class="inline search_vue_table" v-if="serverView == 'condition_server'">
            
            <!-- 时间搜索框 -->
            <start-end-time 
            	ref="startEndRef"
            	:enableTimeRange="enableTimeRange" 
            	@updata="integrationDate" 
            	@timeRangeSearch="rangeSet"
            	:startName='startEndClass.start' 
            	:endName='startEndClass.end'
            	:rangeConfig='rangeConfig'  
            	:currentRange='currentRange'
            	:minute="'day'"
            	:label="false" 
            	v-if='isTime' />
            <!-- 过滤搜索栏   -->
            <div class="inline"  v-for="(item,index) in filterBtns" :key="index">
                <template v-if='!item.vIf'>
                    <btn-select
                        v-show="item.show ? PrimaryValue ==item.show ? true:false  : true"
                        :url="item.url" 
                        :filter="item.filter" 
                        :filterName='item.filterName'
                        :name="item.name"
                        :method="item.method"
                        :params="item.params"
                        :arr="item.arr"
                        :width='item.width'
                        
                        :isSend="item.isSend"
                        :hasAll='item.hasAll'
                        @updata="integrationDate"
                        :title="item.title"  
                        :no="item.no"
                        :value="item.default"
                        :uuid="item.uuid"
                        :field="item.field"
                        :defaultCode='item.defaultCode'
                        :ourOrg='item.ourOrg'
                        :isEmpty='item.isEmpty'
                        :updataKey='item.updataKey'
                        :list-width="item.listWidth"  v-if="item.type!='date'"></btn-select>
                </template>
				
            </div>


        </div>


        <!-- 快速搜索栏 -->
		<template v-if="serverView == 'quick_search'">
			<div class="inline quick"     v-for="(item,index) in filterInput" :key="index">
				<form-label-input 
					:name="item.name" 
					@updata="integrationDate" 
					:label="item.label"
					input-width="120px" 
					pmarginRight="24px"/>
			</div>
		</template>
        
        <div class="btn-group searchConditions">
            <!-- 添加/删除搜索条件按钮 -->
            <!-- <button v-if="serverView == 'condition_server'" class="multi-select" data-toggle="modal"  data-target="#multi-select"></button> -->
            <button type="button" id="server_filter" class="btn default-btn radius-btn"  style='background:rgb(23, 134, 247);border-radius:4px;' @click="paramSubmit">搜索</button>
            <button type="button" id="clear_filter" class="btn default-btn radius-btn" style='background:#fff; color:#1785F7;border-radius:4px;' @click="clearFilter">重置</button>
            
            <!-- <template  v-if="location.hash.indexOf('rescueManagement') != -1 "> -->
			<template  v-if="0">
                <button 
                    type="button" 
                    id="clear_filter" 
                    class="btn default-btn" 
                    data-toggle="modal" 
                    data-target="#saveHisModal"
                    v-if="historySearchEnable">保存条件</button>
            </template>
            <save-his-modal></save-his-modal>        
        </div> 


	
            
            <div style="display: inline-block" v-for="(item,index) in rightBtns" :key='item' >
            	<button type="button" style="color:#1785F7;border-color:#1785F7;background: rgb(23, 134, 247);padding:5px 24px;font-size: 12px;color:#fff;line-height: 12px;" class="btn" @click="emitFunc(event,item.funcName)">{{item.text}}</button>
            </div>

    </div>
</template>
<script>
	import startEndTime from "./startEndTime.vue";
	import btnSelect from "./btn_select.vue";
	import formLabelInput from "./form-label-input.vue";
	import saveHisModal from "./saveHisModal.vue";
	export default {
		components:{
			startEndTime,
			btnSelect,
			formLabelInput,
			saveHisModal,
		},
		props:{
			rightBtns:{
				type:Array
			},
			filterInput:{
				type:Array,
				default: function () {
					return []
				}
			},
			rangeConfig:{
				type:Array,
				default: function(){
					return [{text:'当日',param:'TODAY'},
	                // {text:'未来一周',param:'NXWEEK'},
	                {text:'过去一周',param:'PREWEEK'},
	                {text:'近一月',param:'MONTH'},
	                {text:'近三月',param:'TRIPLEMON'},
	                {text:'近一年',param:'YEAR'}]
				}
			},
			filterBtns:{
				type:Array,
				default: function(){
					return []
				}
			},
			startEndClass:{
				type:Object,
				default:function(){
					return {
						start:"startTime",
						end:"endTime"
					}
				}
			},
			filtrationCondition:{
				type:Boolean,
				default:true
			},
			isTime:{
				type:Boolean,
				default:true
			},
			isQuickSearch:{
				type:Boolean,
				default:true
			},
			enableTimeRange:{
				type:Boolean,
				default:false
			},

		},

		data(){
			return {
				params:{},
				items : [],
				PrimaryValue: "",
				// rangeConfig:[
	   //              {text:'当日',param:'TODAY'},
	   //              // {text:'未来一周',param:'NXWEEK'},
	   //              {text:'过去一周',param:'PREWEEK'},
	   //              {text:'近一月',param:'MONTH'},
	   //              {text:'近三月',param:'TRIPLEMON'},
	   //              {text:'近一年',param:'YEAR'}
	   //          ],
	            currentRange:"MONTH",
				serverView:"condition_server",

			}
		},
		methods:{
			integrationDate(name,item){
				// console.log("name:",name)
				// console.log("item:",new Date(item))
				this.params[name] = item
				if(typeof item === "undefined"){
					this.params[name] = ""
				}
			},
			clearFilter(){

				if(this.serverView == "condition_server"){

					/*重置时间*/
					if(this.isTime){
						let startName = this.startEndClass.start, endName = this.startEndClass.end
						$('.date_active_query').removeClass('date_active_query');
						$(`[name=${startName}],[name=${endName}]`).css("color","rgb(0,0,0)").val("")
						


						this.integrationDate(startName,new Date("2012.1.1").getTime());//具体默认开始时间还需确认
						this.integrationDate(endName,new Date().getTime());
					}
					/*清空条件框*/
					this.filterBtns.forEach((item,index)=>{
						var $ele = $(`[name=${item.name}]`);
						$ele.css("color","rgb(153,153,153)").html($ele.attr('title'));
						this.integrationDate(item.name,"");
					});

				} else {
					this.filterInput.forEach((item,index)=>{
						var $ele = $(`[name=${item.name}]`);
						$ele.css("color","rgb(153,153,153)").val($ele.attr('placeholder'));
					});
				}
				this.paramSubmit() //触发搜索
			},
			emitFunc(event,name){
				this.$emit("rightBtnEmit",event,name)
			},
			paramSubmit(){
				console.log("表单提交，参数为：",this.params);
				this.$emit('paramSubmit',this.params)
			},
			rangeSet(event,startName,endName,range){
	            let currTarget = event
	            var _gr = util.getRange(range)
	            this.currentRange = range;
	            this.$nextTick(()=>{
	                $(`[name=${startName}]`)
	                    .val( new Date(_gr.start).Format("yyyy-MM-dd hh:mm"))
	                    .css('color','#000000' );
	                $(`[name=${endName}]`)
	                    .val( new Date(_gr.end).Format("yyyy-MM-dd hh:mm"))
	                    .css('color','#000000' );
	            })

	            
	            if(currTarget){
	                console.log("search",currTarget)
	                this.integrationDate(startName,_gr.start);
	                this.integrationDate(endName,_gr.end);
	                this.paramSubmit()
	            }
	            return {
	                [startName]:_gr.start,
	                [endName]:_gr.end
	            }
	        },
			toggleServerView(mode){
				this.params = {}
				this.serverView = mode;
			}
		},
		mounted(){

		}
	}
</script>
<style scoped>
	.search_vue_table{
		margin-bottom: 10px;
	}
	.searchConditions{
		margin-left: 20px;
	}
	.searchConditions button{
	    margin-right:20px;
	}
</style>
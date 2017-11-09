<template>

<!-- Modal -->
    <div class="modal fade" id="listDisplayOptions" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">列表显示配置<small style="color:#ff6c00">(拖拽排序)</small></h4>
                </div>
                <div class="modal-body" >
                	<template v-if='listOptions.value.values'>
                        <template v-for='(obj, index) in listOptions.value.values'>
                            <div class="setWidth" draggable="true" :data-index='index' :key='obj' >
                                <checkbox 
                                    :text="obj.desc" 
                                    style="margin-right:0"
                                    direction="left"
                                    label-left="2px"
                                    :name="obj.desc"
                                    :checked='obj.isChoose'
                                    @updata="integrationDate"/>	
                            </div>
                        </template>
                	</template>
                </div >
                <div class="modal-footer">
                    <div class="pull-left">
                         <checkbox 
                            text="全选" 
                            style="margin-right:0"
                            direction="left"
                            label-left="2px"
                            name="setting_all" 
                            @updata="integrationDate"/>
                    </div>
                    <div class="btns pull-right">
                        
                        <button type="button" class="btn"  data-dismiss="modal" @click="save(true)" >确定</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import excel from '../../static/js/excel.js'
import  checkbox from "./checkbox.vue";
    export default {
        props:{
            listDisplayOptions:{
                type:Object
            },
            tableIterationField:{

            }
        },
        components:{
            checkbox
        },
        data () {
            return {
            	tableIterationFieldFade: [],
                listOptions: {
                    pathDesc: '',
                    value: {
                        values: []
                    }
                }
            }
        },
        created(){
        	const that = this;
        	this.mainOrgSystemSend(this.listDisplayOptions.path, function(content){
        	 	that.listOptions = content;
                
                that.$nextTick( () => {
                    that.save(false, true);
                    const valueLength = that.listOptions.value.values.length;
                    console.log(valueLength, $('#listDisplayOptions input:checked:not([name=setting_all])').length)
                    if($('#listDisplayOptions input:checked:not([name=setting_all])').length == valueLength){
                        $('#listDisplayOptions').find('[name="setting_all"]')[0].checked = true;
                    }else{
                        $('#listDisplayOptions').find('[name="setting_all"]')[0].checked = false;
                    }

                    // 拖拽
                    const elements = document.querySelectorAll('#listDisplayOptions .setWidth');
                    let moveTarget;
                    
                    [...elements].forEach( (ele, index) => {
                        ele.addEventListener('dragstart',function(e){
                            moveTarget = e.currentTarget
                        });
                        
                        ele.addEventListener('dragover',function(ev){
                            const evt = ev || event
                            evt.preventDefault();  //阻止默认行为，使得drop可以触发  
                        });
                        ele.addEventListener('drop', function(e){

                            const index = e.currentTarget.dataset.index,
                                  targetMoveIndex = moveTarget.dataset.index;
                            const arr = that.listOptions.value.values;

                            const temp = arr[index];
                            console.log(index, targetMoveIndex);
                            arr.splice(index, 1, arr[targetMoveIndex]);
                            arr.splice(targetMoveIndex, 1, temp);
                            console.log(arr);
                        });
                    });
                });

        	});
        	this.tableIterationFieldFade = this.tableIterationField.map( (obj, index) => {
                return obj;
            })

        },
        mounted(){
             
        },
        methods:{
            integrationDate(name,value){
                console.log()
                if(name == 'setting_all'){
                    $('#listDisplayOptions').find('[type="checkbox"]').each(function(index, el) {
                        el.checked = value 
                    });
                }else{
                    if(!value) $('#listDisplayOptions').find('[name="setting_all"]')[0].checked = false;
                }
                const parent = $(event.currentTarget).parentsUntil('.setWidth');
                if(parent.length == 1){
                    const index = $(parent).parent()[0].dataset.index;
                    this.listOptions.value.values[index].isChoose = value;
                }
            },
            save(isSaveParams,isCreated){
                let arr = [];
                $('#listDisplayOptions input:checked:not([name=setting_all])').each(function(index, el){
                    arr.push( $(el).siblings('label').text() );
                });
                if(arr < 1){
                    return alert('至少选择一个');
                }

                // 前端显示的字段
                let resultArr = this.tableIterationFieldFade.map( (obj, index) => {
                    let result_obj, arrIndex;
                    const bool = arr.some( (value, index) => {
                        if((value.indexOf(obj.tr) != -1 )){
                            arrIndex = index;
                            return true;
                        }
                    });
                    obj.arrIndex = arrIndex;
                    if(bool){
                        // 特殊情况(订单核算)
                        if(obj.tr == '总成本费用'){
                            result_obj = JSON.parse(JSON.stringify(obj));
                            if(!arr.includes('总成本费用-现金')){
                                result_obj.table.splice(0, 1);
                            }
                            if(!arr.includes('总成本费用-签单')){
                                const index = result_obj.table.length == 1 ? 0 : 1;
                                result_obj.table.splice(index, 1);
                            }

                            if(result_obj.table.length == 1){
                                result_obj.colspan = false;
                                result_obj.rowspan = false;
                            }else if(result_obj.table.length == 0){
                                result_obj = null;
                            }
                        }else if(obj.tr == '总救援费用'){
                            result_obj = JSON.parse(JSON.stringify(obj));
                            if(!arr.includes('总救援费用-现金')){
                                result_obj.table.splice(0, 1);
                            }
                            if(!arr.includes('总救援费用-签单')){
                                const index = result_obj.table.length == 1 ? 0 : 1;
                                result_obj.table.splice(index, 1);
                            }

                            if(result_obj.table.length == 1){
                                result_obj.colspan = false;
                                result_obj.rowspan = false;
                            }else if(result_obj.table.length == 0){
                                result_obj = null;
                            }
                        }
                        
                        return result_obj ? result_obj : obj;
                    }
                }).filter( (result_obj, index) => {
                    return result_obj;
                }).sort( (obj_1, obj_2) => {
                    return obj_1.arrIndex - obj_2.arrIndex;
                });
                
                

                let listOptionsArr = [], listOptions = JSON.parse(JSON.stringify(this.listOptions) );
                
                listOptions.value.values.forEach( (obj, index) => {
                    if(arr.includes(obj.desc)){
                        delete obj.isChoose;
                        listOptionsArr.push(obj);
                        return true;
                    }
                });
                listOptions.value.values = listOptionsArr;

                console.log( JSON.parse(JSON.stringify(resultArr)));

                // 后台的值
                if(isSaveParams) this.saveParams(listOptions);

                resultArr.forEach( (result, result_index) => {
                    result.thWidth = listOptionsArr[result_index].thWidth;
                })
	            this.$emit('update:tableIterationField', resultArr, listOptionsArr, isCreated, listOptions);
            },
            // 上传到后台
            saveParams(listOptions){
                console.log(JSON.parse(JSON.stringify(listOptions)));
                send({
                    url: 'client:/sys/param/user',
                    type: 'put',
                    param: listOptions
                }, function(err ,res){
                    console.log(res);
                })
            },
            // 获取数据
            mainOrgSystemSend(path, callback, param){
                    const _this = this;
                    param = param || 'values';
                    personSend(path, function(err, res){
                        console.log(err, res, path);
                        if(res.content.length != 0 ){

                            const path = res.content[0].path;

                           // 正常情况
                            let content_system = res.content[0], values_system = content_system.value[param];
                            let content_org = res.content[0].orgParam, values_org = content_org.value[param];
                            if(param == 'available_columns'){
                                callback(content_system);
                                return;
                            }
                            
                            resolve(content_system, values_system, content_org, values_org);
                            

                           content_system.value.values =content_system.value.values.sort( (obj_1, obj_2) => {
                                return obj_1.index - obj_2.index;
                            });
                            console.log(JSON.parse(JSON.stringify(content_system) ) );
                            callback(content_system);

                            function resolve(content_system, values_system, content_org, values_org){
                                values_system.forEach( (obj_system, index_system) => {
                                    values_org.some( (obj_org, index_org) => {
                                        if(obj_org.desc == obj_system.desc){
                                            values_system[index_system] = {
                                                desc: obj_system.desc,
                                                code: obj_system.code,
                                                index: index_org,
                                                index_system: index_system,
                                                isChoose: true,
                                                thWidth: obj_org.thWidth
                                            }
                                            return true;
                                        }else{
                                            values_system[index_system] = {
                                                desc: obj_system.desc,
                                                code: obj_system.code,
                                                index: values_system.length,
                                                index_system: index_system,
                                                isChoose: false,
                                                thWidth: obj_org.thWidth
                                            }
                                        }
                                    });
                                });
                            }
                        }else{
                            callback(res);
                        }
                    });
             }
        }
    }
    function personSend(path, callback){
        send({
            url: 'client:/sys/param/user',
            type: 'post',
            param: [path] 
        }, callback)
    }
    function isSame(obj_1, obj_2){
        if( Object.prototype.toString.call(obj_1) != '[object String]' ){

            return JSON.stringify(obj_1) === JSON.stringify(obj_2) ? true : false;
        }else{
            return obj_1 == obj_2 ? true : false;
        }
    }
</script>
<style scoped>
    .setWidth{
        width: 123px;
        display: inline-block;
    }
    .modal-body{
        padding: 30px;
        padding-right: 10px;
    }
    .modal.in .modal-dialog{
        width: 536px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   #exportExcelPage .modal-header, #exportExcelPage .modal-footer{
        border-width: 1px;
        padding:24px 30px; 
   }
   .btns button:nth-child(2){
        margin-left: 16px;
   }
   body .modal-header, body .modal-footer{
       border-width: 1px;
   }
</style>
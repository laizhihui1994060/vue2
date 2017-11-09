<template>
    <div class='sms_bill'>
        <div class="input-append">
            <start-end-time></start-end-time>
            <div class="form-group" >
                <btn-select 
                    title='收发方向'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyType" 
                    @updata="integrationDate"   
                    />
                <btn-select 
                    title='内容类型'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyType" 
                    @updata="integrationDate"   
                    />
            </div>
            <div class="btn-group" >
                  <button type="button" class="btn search">搜索</button>
            </div>
        </div>
        <div class='table'>
            <table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>对方号码</th>
                        <th>姓名</th>
                        <th>操作类型</th>
                        <th>收发方向</th>
                        <th>状态</th>
                        <th>短信内容</th>
                        <th>计费</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2016/09/01 03:00:00</td>
                        <td>系统</td>
                        <td>000001</td> 
                        <td>现金</td>
                        <td>章国栋</td>
                        <td>章国栋</td>
                        <td>章国栋</td>
                        <td>章国栋</td>
                    </tr>
                </tbody>
            </table>
            <paging-component all=10></paging-component>
        </div>
    </div>
</template>

<script>

import btnSelect from '../../../../../common_component/btn_select.vue'
import startEndTime from '../../../../../common_component/startEndTime.vue'
import pagingComponent from '../../../../../common_component/paging_component'
    export default{
        data(){
            return {
                res:{}
            }
        },
        methods: {
            integrationDate(name, item){
                this.res[name]= item;
                console.log(this.res);
            }
        },
        components:{
            btnSelect,
            startEndTime,
            pagingComponent
        },
    }
</script>

<style>

</style>
<template>
    <div class='phone_bill'>
        <div class="input-append">
            <start-end-time></start-end-time>
            <div class="form-group" >
                <btn-select 
                    title='呼叫方向'
                    url="/item" 
                    filter="SVC_NAME"
                    width='auto'
                    name="conpamyType" 
                    @updata="integrationDate"   
                     />
                <btn-select 
                    title='分机用户'
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
                        <th>分机号码</th>
                        <th>分机用户</th>
                        <th>对方号码</th>
                        <th>对方姓名</th>
                        <th>呼叫方向</th>
                        <th>通话时长</th>
                        <th>录音</th>
                        <th>订单</th>
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
                        <td>
                            <audio src='' class='play' controls></audio>
                            <span></span>
                            <audio src='' class="download" controls></audio>
                            <span></span>
                        </td>
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

<style >
    .phone_bill .table tbody tr td audio{
        width: 24px;
        height: 24px;
        opacity: 0;
    }
    .phone_bill .table tbody tr td audio + span{
        display: inline-block;
        width: 24px;
        height: 24px;
        position: relative;
        left: -24px;
        background: url('../../../../../assets/img.png') no-repeat 0 -969px;
    }
    .phone_bill .table tbody tr td .download + span{
        background: url('../../../../../assets/img.png') no-repeat 0 -945px;
    }
</style>
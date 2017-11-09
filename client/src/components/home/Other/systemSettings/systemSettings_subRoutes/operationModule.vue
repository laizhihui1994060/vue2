<template>
    <div class='operation_module'>
        <div class="input-append date form_datetime">
            <div class='time'>
                <label for="">时间范围  从</label>
                <input size="16" class='beginTime' type="text" value="2016-12-09 00:00" readonly>
                <label for="">　--　</label>
                <input size="16" class='endTime' type="text" value="2016-12-09 00:00" readonly>
            </div>
            <div class="form-group" >
                <select class="form-control"> 
                 <option>呼叫方向</option> 
                 <option>李小军1</option> 
                 <option>李小军</option> 
                 <option>李小军</option> 
                 <option>李小军</option> 
                </select>
            </div>
            <div class="form-group" >
                <select class="form-control"> 
                  <option>分机用户</option> 
                  <option>登录</option> 
                  <option>登录</option> 
                  <option>登录</option> 
                  <option>登录</option> 
                </select>
            </div>
            <div class="btn-group" >
                  <button type="button" class="btn btn-primary search">搜索</button>
            </div>
        </div>
        <div class='table'>
            <table id="operation_module_table"></table>
        </div>
    </div>
</template>

<script>

    import { phone_bill } from '../js/table_bootstrap.js'

    export default{
        data(){
            return {
                myData: [
                    {
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },{
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },{
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },{
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },{
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },{
                        time: ['2016-09-21 03:00:00','2016-09-21 03:00:00'],
                        extension: '02089102035',
                        extensionName: '李师傅',
                        phone: '18664728088',
                        name: '王先生',
                        direction: '外呼',
                        talkTime: '23s',
                        soundRecording: [],
                        order: '发送',
                        charging: '0.06'
                    },
                ]
            }
        },
        mounted(){

            this.$nextTick(function(){
                    
                $(".beginTime, .endTime").datetimepicker({
                    format: "yyyy-mm-dd hh:ii",
                    autoclose: true,
                    todayBtn: true,
                    language: 'cn',
                    // minView: 'minutes',
                    pickerPosition: "bottom-left",
                    autoclose:true
                });

                phone_bill({
                    tableId: '#operation_module_table', 
                    myData: this.myData
                });
            })

        }
    }
</script>

<style >
    #operation_module_table{
        background:transparent;
    }
    #operation_module_table thead th:first-child div.th-inner{
        width:180px;
    }
    .operation_module{
        font-size:14px;
    }
    .operation_module .input-append{
        color:#666;
        margin-left:10px;
    }
    .operation_module .input-append select{
        width:94px;
        height:24px;
        position:relative;
        padding:0;
        vertical-align:middle;
        background-color:transparent;
    }
    .operation_module .time{
        display:inline-block;
    }
    .operation_module .time input[type='text']{
        background-color:transparent;
        border:1px solid #999;
        padding-left:10px;
    }
    .operation_module .time audio{
        cursor: pointer;
    }
    .operation_module .form-group{
        margin-left:20px;
        display:inline-block;   
    }
    .operation_module .form_datetime  button{
        margin-left:20px;
        background-color: #39B6E5;
        color:#fff;
    }
    #operation_module_table tbody td .play{
        display:inline-block;
        width:24px;
        height:24px;
        visibility:hidden;
        position:absolute;
    }
    #operation_module_table tbody td .play + span{
        content:'';
        display:block;
        width:24px;
        height:24px;
        background:url('../../../../assets/Group.png') no-repeat;
        cursor:pointer;
    }
    #operation_module_table tbody td .download{
        display:inline-block;
        width:24px;
        height:24px;
        position:absolute;
        visibility:hidden;
    }
    #operation_module_table tbody td .download + span{
        content:'';
        display:block;
        width:24px;
        height:24px;
        cursor:pointer;
        background:url('../../../../assets/downup.png') no-repeat;
    }
    .operation_module .search{
        background:#999 !important;
        width:72px;
        height:22px;
        margin-left:20px !important;
    }
</style>
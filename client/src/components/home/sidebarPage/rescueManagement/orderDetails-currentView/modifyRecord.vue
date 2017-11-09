<template>
    <ul class="modifyRecord-list">
        <h3 v-if="!data.length"  class="text-center"  style="text-align:center;line-height:100px;font-size:26px;color:#FF6B0E">暂无修改记录</h3>

        <li v-for="(item,index) in data" class="setDsi">
            <div class="modifyRecord_left">
                <p class="times" v-text="getLocalTime(item.created)"></p>
                <template v-for="user in item.user" v-if='item.userId == user.userId'>
                    <span v-text="user.empName"></span>
                </template>

            </div>

            <div class="modifyRecord_right">
                <label v-text="status(item.status)"></label>

                <template  v-for="(it,key) in item.newValue"  v-if="key != 'updated' && key != 'updatedby' && key != 'lastDispatchTime' && key != 'lastDispatchStatus' ">
                    <div  v-if="item.status == 'UPDATE' "  style="display:inline-block">
                    &nbsp;&nbsp;<span style="color:red" v-text="key"></span>&nbsp;&nbsp;&nbsp;&nbsp;"<span  style="color:#39B6E5" v-text="(item.oldValue[key] == 'true' )  || ( item.oldValue[key] == 'false'  ) ? item.oldValue[key] == 'true' ? '是' : '否' : key == '预定救援时间' ? date(item.oldValue[key]): key == '收费标准' ? (item.oldValue[key] == 'FIXED_PRICE' ? ' 一口价' : '报价公式' )  :  item.oldValue[key] "></span>"&nbsp;&nbsp;&nbsp;改为&nbsp;&nbsp;&nbsp;"<span  style="color:#39B6E5" v-text="(it == 'true' )  || ( it == 'false'  ) ? it == 'true' ? '是' : '否' : key == '预定救援时间' ? date(item.newValue[key]): key == '收费标准' ? (item.newValue[key] == 'FIXED_PRICE' ? ' 一口价' : '报价公式' ) :  it "></span>"；
                    </div>

                    <div  v-if="item.status == 'INSERT'" style="display:inline-block">
                <span style="color:red" v-text="it.orderCode"></span>
                        <span v-if = "key ==  'orderCode'"style="color:red" v-text="item.newValue.orderCode"></span>
                    </div>

                    <div  v-if="item.status == 'SHARE'" style="display:inline-block">
               &nbsp;&nbsp;<span style="color:red" v-text="key"></span>&nbsp;&nbsp;&nbsp;&nbsp;"<span  style="color:#39B6E5" v-text="key == '派遣时间' ? date(it):key == '派遣类型'? matchdispatchedType(it):''  "></span>"；
             
                    </div>

                    <div  v-if="item.status == 'DISPATCHED' " style="display:inline-block">
               &nbsp;&nbsp;<span style="color:red" v-text="key == 'lastDispatchType' ? '派车类型':key "></span>
               &nbsp;&nbsp;&nbsp;&nbsp;"<span  style="color:#39B6E5" v-text="key == '派遣时间' ? date(it):(key == '派遣类型') || (key == 'lastDispatchType')? matchdispatchedType(it):''  "></span>"；
                     
                    </div>
            </template>

            </div>
        </li>
    </ul>
</template>

<script>

    export default{
        props:['orderId'],
        data () {
            return {
                data:[]
            }
        },
        created(){
            this.send();
            bus.$on('modifyRecord',()=>{
                this.send();
            });

        },
        methods:{
            send(){
                const self = this;
                send({
                    type:'get',
                    url:'order:/order/update_record/' + this.orderId
                },function(err,res){
                    console.log(res)
                    if(err)return alert('服务器出错，请联系管理员');
                    if(res.status == 200 || res.status == 404 || res.status == 204 ){
                        self.data = res.content ? res.content : [];
                        self.data = self.data.reverse();
                        console.log(self.data)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            getLocalTime(ns){
                return util.getLocalTime(ns);
            },
            status(statu){
                if(statu == 'UPDATE'){
                    return '更改'
                }else if(statu == 'INSERT'){
                    return '下了新订单'
                }else if(statu == 'DISPATCHED'){
                    return '派车'
                }else if(statu == 'SHARE'){
                    return '分享订单'
                }
            },
            date(time){

                return util.getLocalTime(new Date(Number(time)).getTime());
            },
            matchdispatchedType(status){
                if(status == 'DISPATCH_ME'){
                    return '派遣自己的车辆'
                }else if(status == 'DISPATCH_PARTNER'){
                    return '派遣伙伴的车辆'
                }else if(status == 'SHARE_FIXED_PRICE'){
                    return '一口价分享'
                }else if(status == 'SHARE_MAX_PRICE'){
                    return '最高限价分享'
                }else if(status == 'MATCH_ROUTE'){
                    return '匹配行程'
                }

            }

        }
    }
</script>
<style scoped>
    .modifyRecord-list{
        margin: 0;
        height: 178px;
        overflow: auto;
    }
    .modifyRecord-list li{
        overflow: hidden;
        background: #F6F6F6;
        margin-bottom: 2px;
    }
    .modifyRecord-list li .modifyRecord_left,.modifyRecord-list li .modifyRecord_right{
        padding: 8px 12px;
    }
    .modifyRecord-list li .modifyRecord_left{
        width: 136px;
        text-align: center;
        margin-right: 1px;
        border-right: 1px solid #fff;
    }
    .modifyRecord-list li .Stay{
        font-size: 18px;
        color: #999999;
        line-height: 18px;
    }
    .modifyRecord-list li .times{
        font-size: 12px;
        color: #999999;
        line-height: 12px;
        margin: 0;
    }
    .modifyRecord-list li .modifyRecord_right{
        flex: 1;
    }
    .modifyRecord-list li .modifyRecord_right p{
        margin: 0;
        font-size: 12px;
        color: #333333;
        line-height: 12px;
        margin-bottom: 8px;
    }
    .modifyRecord-list li .modifyRecord_right label{
        margin-top: 0;
    }
    .modifyRecord-list li .modifyRecord_right p:last-child{
        margin-bottom: 0;
    }
    .modifyRecord-list li .modifyRecord_right p label{
        margin: 0;
    }
    .setDsi{
        display: flex;
    }
</style>
<template>
    <div class="container-fluid">
        <div class="row" id="day_data" v-if="false">
            <h3 class="title">今日数据</h3>
            <div class="col-xs-6 setRightBorder">
                <div class="text-center ">
                    <p class="amount setCenter">
                        <span>2500</span><br/>
                        <span>营业额</span>
                    </p>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="text-center ">
                    <p class="order setCenter">
                        <span>2500</span><br/>
                        <span>订单总数</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="row"  style="border-right: 4px solid #eee;background:#fff"  v-if="false">
             <div class="col-xs-3 setRightBorder">
                <p class="text-center p_height">
                    <strong class="num">10</strong>
                    <span class="category">当前任务</span>
                </p>
            </div>
            <div class="col-xs-3 resetpadding setRightBorder">
                <p class="text-center p_height">
                    <strong class="num">8</strong>
                    <span class="category">待派遣订单</span>
                </p>
            </div>
            <div class="col-xs-3 setRightBorder">
                <p class="text-center p_height">
                    <strong class="num">3</strong>
                    <span class="category">处理超时</span>
                </p>
            </div>
            <div class="col-xs-3 resetpadding">
                <p class="text-center p_height">
                  <strong class="num">5</strong>
                  <span class="category">接单超时</span>
                </p>
            </div>
        </div>
    
        <div class="row canvas_margin">
            <div  class="col-xs-6 resetpadding"  style="border-right: 4px solid #eee" v-for='(item,index) in charts' > 
                <h3 class="title" v-text="item.extra ? item.extra.desc :''"></h3>
                <div class="canvas">
                    <div class="left"   v-if='item.extra  && item.extra.dataSource && item.extra.dataSource.indexOf("CLIENT_DEFINE") == -1'>
                       <!--  <div>
                            <btn-select  
                                label="技&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 师"
                                url="control:/sys/param" 
                                method='post'
                                :params="['/order/book/source_types']"
                                title="订单来源"
                                padding='0'
                                name="sourceType"
                                @updata="integrationDate"
                                value=""/> 
                        </div> -->
                        <div>
                            <btn-select 
                                :arr="[{cn:'5分钟',en:60 * 5 , index:index},{cn:'10分钟',en:10 , index:index}, {cn:'30分钟',en: 60 * 30 , index:index},{cn:'60分钟',en: 60 * 60 , index:index}]"
                                filter="cn" 
                                name="refreshTime"
                                padding='0'
                                label="刷新时间"
                                @updata="integrationDate"
                                :value="item.extra && item.extra.defaultValue &&  item.extra.defaultValue.refreshTime ? item.extra.defaultValue.refreshTime : '5分钟'" />
                            
                        </div>
                        <div>
                            <button class="btn radius-btn"  @click="toggleTime(index,'DAY')" :class="{active: item.extra && item.extra.defaultValue &&  item.extra.defaultValue.totalTime === 'DAY'}">今日统计</button>
                        </div>
                        <div>
                            <button class="btn radius-btn"  @click="toggleTime(index,'WEEK')" :class="{active: item.extra && item.extra.defaultValue &&  item.extra.defaultValue.totalTime === 'WEEK'}">最近一周</button>
                        </div>
                        <div>
                            <button class="btn radius-btn"  @click="toggleTime(index,'MONTH')" :class="{active:item.extra && item.extra.defaultValue &&  item.extra.defaultValue.totalTime === 'MONTH'}">最近一月</button>
                        </div>
                        <div>
                            <button class="btn radius-btn"  @click="toggleTime(index,'QUART')"  :class="{active:item.extra && item.extra.defaultValue &&  item.extra.defaultValue.totalTime === 'QUART'}">最近季度</button>
                        </div>
                    </div>
                    <div class="right">
                        <a  v-if='item.extra && item.extra.dataSource && item.extra.dataSource.indexOf("CLIENT_DEFINE") == -1' href="javascript:;" class='refresh' @click="toogle(index)" title="刷新">
                            <img src="../../../../assets/refresh.png" height="32" width="32" >
                        </a>
                        <div  v-if='item.extra && item.extra.dataSource && item.extra.dataSource.indexOf("CLIENT_DEFINE") == -1'  class="parentIframe" :class="{loadAnime:!item.load}">
                            <div>
                                <div class="bounce1"></div>
                                <div class="bounce2"></div>
                                <div class="bounce3"></div>
                            </div>
                            <template v-show="item.load">
                                <iframe 
                                    @load='load(index)'
                                    frameborder="0" 
                                    v-if='item.vIf && item.extra && item.extra.dataSource && item.extra.dataSource.indexOf("CLIENT_DEFINE") == -1' 
                                    :src="item.extra.dataSource">
                                </iframe>
                            </template>
                        </div>

                        <div v-if='item.dsName.indexOf("USER_ONLINE_STATUS_CHART") != -1' class="echert" id="userOnline">
                        </div>
                        <div v-if='item.dsName.indexOf("ORDER__STATUS_DATA_CHART") != -1' class="echert" id="orderOnlineStatus">
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>

  import {userOnline,orderStatusOnline} from "./canvas_table";
  import btnSelect from "../../../../common_component/btn_select.vue";

  export default {
    components:{
        btnSelect
    },
    data () {
      return {
        charts:[]
      }
    },
    methods:{
        integrationDate(name,item){
            const self = this;
            if(name === 'refreshTime' ){

                clearInterval(this.charts[item.index].timeObj);

                ((item)=>{
                    this.charts[item.index].timeObj = setInterval((  )=>{
                        self.toogle( item.index );

                    },item.en * 1000);
                })(item)
            }
        },
        load(index){
            this.charts[index].load = true;
            this.charts[index].show = true;
        },
        toogle(index){
            process.nextTick(()=>{
                this.charts[index].vIf = true;
                this.charts[index].load = false;
                this.charts[index].show = false;

            });
            this.charts[index].vIf = false;
        },
        toggleTime(index,type){
            const time = util.getDate(type);
            console.log(time);
            this.charts[index].load = false;
            this.charts[index].show = false;
            this.charts[index].extra.defaultValue.totalTime = type;

            // this.charts[index].extra.dataSource = `${this.charts[index].extra.dataSource}&p-pStartTime=${time.StartDate}&p-pEndTime=${time.EndDate}&p-pOrgId=${global.ourOrgId}&p-pTenantId=${global.tenantId}&p-pTimeFormat=${this.charts[index].extra.defaultValue['p-pTimeFormat']}`;
            const param = this.parseUrl( this.charts[index].extra.dataSource );

            param['p-pTenantId'] = global.tenantId;
            param['p-pOrgId'] = global.ourOrgId;
            param['p-pStartTime'] = time.StartDate + " 00:00:00";
            param['p-pEndTime'] = time.EndDate+ " 23:59:59";

            this.charts[index].extra.dataSource = this.stringifyUrl(this.charts[index].extra.dataSource,param);

        },
        parseUrl(url){

            const sUrl = url.split('?')[1];
            const strAr = sUrl.split('&');
            let obj = {};

            strAr.forEach((item)=>{
                let i = item.split('=');
                obj[i[0]] = i[1];
            });

            return obj
        },
        stringifyUrl(url,param){
            const sUrl = url.split('?')[0];
            let arr = [];

            for(let i in param){
                arr.push(`${i}=${param[i]}`);
            }
            console.log(param )
            return `${sUrl}?${arr.join('&')}`;

        },
        
        getchrts(){
            const self = this;
            send({
                type:'get',
                url:'control:/chart/tenant/user'
            },function(err,res){
                console.log(err,res)
                if(err)return console.error(err);

                let user,orderStatus;

                self.charts = res.content.map((item,index)=>{
                    if(item.dsName === 'ORDER__STATUS_DATA_CHART')orderStatus = true;
                    if(item.dsName === "USER_ONLINE_STATUS_CHART")user = true;

                    if(item.extra && item.extra.defaultValue &&  item.extra.defaultValue.refreshTime ){

                        ((index)=>{

                             item.timeObj = setInterval(function(){
                            }, item.extra.defaultValue.refreshTime * 60  * 1000);
                        })(index);


                        if( item.extra.defaultValue.totalTime && item.extra.dataSource ){

                            const time = util.getDate(item.extra.defaultValue.totalTime);

                            if(item.extra){

                                if( global.tenantId ){
                                    item.extra.dataSource = `${item.extra.dataSource}&p-pStartTime=${time.StartDate + " 00:00:00"}&p-pEndTime=${time.EndDate + " 23:59:59"}&p-pOrgId=${global.ourOrgId}&p-pTenantId=${global.tenantId}&p-pTimeFormat=${item.extra.defaultValue['p-pTimeFormat'] ? item.extra.defaultValue['p-pTimeFormat'] :'yyyy-mm-dd'}`;
                                }else{
                                    setTimeout(function() {
                                        item.extra.dataSource = `${item.extra.dataSource}&p-pStartTime=${time.StartDate + " 00:00:00"}&p-pEndTime=${time.EndDate + " 23:59:59"}&p-pOrgId=${global.ourOrgId}&p-pTenantId=${global.tenantId}&p-pTimeFormat=${item.extra.defaultValue['p-pTimeFormat'] ? item.extra.defaultValue['p-pTimeFormat'] : 'yyyy-mm-dd'}`;
                                    }, 600);
                                }
                            }

                        }
                       
                    }

                    item.vIf = true;
                    item.load = false;
                    item.show = false;
                    return item;
                });
                
                self.$nextTick(()=>{
                    if(user)userOnline('userOnline');
                    if(orderStatus)orderStatusOnline('orderOnlineStatus');
                });
               

            });
        }
    },
    beforeDestroy(){
        this.charts.forEach(function(item,index){
            if(item.extra && item.extra.defaultValue &&  item.extra.defaultValue.refreshTime ){
                clearInterval(item.timeObj);
            }
        });
        listEvent.cancel(`org-online-total-${global.tenantId}-${global.ourOrgId}`);
        listEvent.cancel(`org-order-monitor-status-total-${global.tenantId}-${global.ourOrgId}`);
    },
    mounted(){
        this.$nextTick(()=>{
            if(global.ourOrgId){
                this.getchrts();
            }else{
                setTimeout(()=> {
                    if(global.ourOrgId){
                        this.getchrts();
                    }else{
                        setTimeout(()=>{
                            this.getchrts();
                        },1000)
                    }
                }, 500);
            }
        });


    }
  }
</script>

<style scoped>
    .row{
        margin: 0;
    }
    .title{
        font-size: 12px;
        color: #333333;
        letter-spacing: 0px;
        line-height: 40px;
        padding-left: 60px;
        margin: 0;
        margin-bottom: 40px
    }

    .amount, .order{
        height: 120px;
    }
    .amount span{
        font-size: 48px;
        color: #FF6B0E;
        letter-spacing: 0px;
    }
    .amount span:nth-child(3){
        font-size: 30px;
    }
    .order span{
        font-size: 48px;
        color: #39B6E5;
        letter-spacing: 0px;
    }
    .order span:nth-child(3){
        font-size: 30px;
    }
    .setRightBorder{
        border-right: 1px solid #eee;
    }
    .setBottomBorder{
        border-bottom: 1px solid #eee;
    }
 
    .p_height{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .num{
        font-size: 36px;
        color: #FF6B0E;
        margin-top: 5px;
    }
    .category{
        font-size: 18px;
        color: #333333;
        display: block;
    }
    .resetpadding{
        padding: 0;
        overflow: hidden;
        background-color: #fff;
        margin-top: 4px;
    }
    #day_data{
        background: #fff url('../../../../assets/Path2.png') no-repeat 0 20px;
        padding-top: 12px;
        margin-top: 10px;
        background-size: 100% 90%;
    }
    #day_data .title{
        background: #DFF5FD url('../../../../assets/Data_Today%20Copy%202.png') no-repeat 30px center;
        margin-bottom: 5px;
    }
    .canvas_margin .title{
        background: #DFF5FD url('../../../../assets/Data_Today%20Copy%202.png') no-repeat 30px center;
        margin-top: 10px;
        margin-bottom: 0 ;
    }
    .canvas{
        display: flex;
        height: 300px;
    }
    .canvas .left{
        width: 198px;
        border-right: 1px solid #eee;
        padding-right: 20px;
        padding-left: 10px;
    }
    .canvas .left > div {
        margin-top: 15px;
        justify-content: flex-end;        
        display: flex;
    }
    .canvas .left > div .btn{
        background: rgb(23, 134, 247);
        color: #fff;
        font-size: 12px;
        padding: 4px 18px;
        min-width: inherit;
    }
    .canvas .right{
        flex: 1;
        height: 100%
    }
 
    iframe, .echert, .parentIframe{
        width: 100%;
        height: 100%;
    }
    .right .refresh{
        position: absolute;
        right: 10px;
        top: 50px;  
    }
    .canvas .left > div .active{
        background: rgba(23, 134, 247, 0.6);
    }
    .loadAnime {
        text-align: center;
        background: rgba(0,0,0,.5);
        position: relative;
    }
    .loadAnime > div{
        width: 200px;
        top: 50%;
        position: absolute;
        height: 30px;
        margin-top: -15px;
        left: 50%;
        margin-left: -100px;
    }
    .loadAnime > div >div {
        width: 30px;
        height: 30px;
        background-color: rgb(23, 134, 247);
        border-radius: 100%;
        display: inline-block;
         animation: bouncedelay 1.4s infinite ease-in-out;
        animation-fill-mode: both;
    }
     
    .loadAnime .bounce1 {
        animation-delay: -0.32s;
    }
     
    .loadAnime .bounce2 {
      animation-delay: -0.16s;
    }

    .loadAnime .bounce2 {
      animation-delay: 0s;
    }
    
    @keyframes bouncedelay {
        0%, 80%, 100% {
            transform: scale(0.0);
        }
        40% {
            transform: scale(1.0);
        }
    }
</style>

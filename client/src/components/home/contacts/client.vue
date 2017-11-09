<template>
  <div class="contacts">
        <div class="input-group" id="search">
            <input type="text" v-model='search_text' class="form-control" placeholder="请输入手机号码">
            <button class="search_btn">
                <span class="glyphicon glyphicon-search"></span>
            </button>
            <a href="javascript:;" class="add_concat" title="添加联系人" @click="$emit('changeView','addclient');">
                <img src="../../../assets/add_concat.png" height="26" width="26">
            </a>
        </div>
        <div id="choose">
            <div 
                class="assortment" 
                :class="{'active':active == 'isCustomer'}" 
                @click="updateList('isCustomer'); active = 'isCustomer'">客户
            </div>
            <div class="assortment" 
                :class="{'active':active == 'isProvider'}" 
                @click="updateList('isProvider'); active = 'isProvider'">服务商
            </div>
            <div 
                class="assortment" 
                :class="{'active':active == 'isEmployee'}" 
                @click="updateList('isEmployee'); active = 'isEmployee'">员工
            </div>
            <div 
                class="assortment" 
                :class="{'active':active == 'CallRecord'}" 
                @click="getCallRecord('isEmployee'); active = 'CallRecord'">通话记录
            </div>
        </div>
        <div style="height: 288px;overflow:auto;margin-bottom:40px;">
            <table>
                <tr v-if='contacts.length == 0' style='text-align: center'>暂无联系人</tr>
                <tr v-for="(contact,index) in contacts" @click='datai(contact)'>

                    <template v-if="active != 'CallRecord' ">
                        
                        <td style="width:86px">{{contact.name}}</td>
                        <td style="width:86px">{{contact.phone}}</td>
                        <td style="width:60px;text-align:right">
                            <button 
                                :disabled="callConnectionState=='error'" 
                                :class="{'status_success':callConnectionState === 'success','status_guaduan':contact.dialStatus === 'success'}" 
                                class="call"  
                                @click.prev.stop="call_dial(contact.phone,contact.name,index)" 
                                :title="callConnectionState == 'error' ? '暂未登录呼叫中心无法拨打电话' : '点击拨打电话' ">
                                    {{contact.dialStatus === 'success' ? '挂断':'拨号'}}<img src="../../../assets/boda.png" height="16" width="16" >
                            </button>
                        </td>
                    </template>
                    <template v-else>
                        <td style="width:86px">{{contact.dstName}}</td>
                        <td style="width:86px">{{contact.dstNo}}</td>
                        <td style="display:flex;padding-left: 12px;justify-content: flex-end;" class='buttons'>
                            <button 
                                :disabled="callConnectionState=='error'" 
                                class="callRecord " 
                                :class="trimClass(contact)" 
                                @click.prev.stop="call_dial(contact.dstNo,contact.dstName,index)" 
                                :title="callConnectionState == 'error' ? '暂未登录呼叫中心无法拨打电话' : '点击拨打电话' ">
                            </button>
                            <a @click.stop.prev="" :href="contact.recordingUrl" download class="img downup"></a> 
                            <button @click.stop.prev="play" class="pofang"> 
                                <audio >
                                    <source :src="contact.recordingUrl" type="audio/ogg">
                                    <source :src="contact.recordingUrl" type="audio/mpeg">
                                </audio>
                            </button>
                        </td>
                        
                    </template>

                </tr>
            </table>
        </div>
        <pagingComponent v-if="all" :all='all' :cur="item.pageIndex" @upPage="upPage" style='transform: scale(0.65);width: 457px; position: absolute; bottom:4px;left:-84px;'/>
    </div>

</template>
<script>
    import pagingComponent from '../../../common_component/paging_component.vue'
    import {CallCenterSocket} from "./callPhone.js";

    export default {
        props:['callConnectionState','userInfo',"dialStatus"],
        created(){
            this.updateList();
        },
        data(){
            return { 
                active:'isCustomer',
                search_text: '',
                all: '',
                currentIndex:0,
                item:{
                    pageSize:10,
                    pageIndex:1,
                    isCustomer:true,
                    isProvider:false,
                    isEmployee:false,

                },
                contacts:[]
            }
        },
        components: {
            pagingComponent
        },
        methods:{
            play(ev){

                const $target = $(ev.target),
                    audio = $target.find('audio')[0];

                         
                if(audio.paused){
                    audio.play();
                    $target.attr('class','zant');
                }else{
                    audio.pause();
                    $target.attr('class','pofang')
                }
            },
            call_dial(phone,name,index){
                if(this.callConnectionState != 'success')return;

                this.currentIndex = index;
                if(this.contacts[index].dialStatus == 'success' ){
                    CallCenterSocket.call_hangup();

                }else{
                   CallCenterSocket.call_dial(phone,name);
                }

            },
            trimClass(contact){
                return contact.callType + '_' + contact.disposition.replace(/\s/g, "") ;
            },
            call_hangup(index){
                this.currentIndex = index;
            },
            updateList(status){
                const _this = this;

                if(status){
                    this.item.pageIndex = 1;
                    this.item.isCustomer = false;
                    this.item.isProvider = false;
                    this.item.isEmployee = false;
                    this.item[status] = true;
                }

                send({
                    url: 'client:/phonebook/list',
                    type: 'post',
                    param: this.item
                }, function(err, res){
                    if(res.status == 200){
                        _this.contacts = res.content.map((item,index)=>{
                            item.dialStatus = 'error';
                            return item;
                        });
                        _this.all = res.pageCount;
                    }else if(res.status == 404){
                        _this.contacts = [];
                    }else{
                        alert(res.msg);
                    }
                });
            },
            getCallRecord(status){
                const _this = this;
                 _this.contacts = [];

               

                if(status){
                    this.item = {
                        "pageIndex":1
                    }
                }



                send({
                    url: 'client:/call/cdr/list',
                    type: 'post',
                    param: this.item
                }, function(err, res){
                    console.log( err,res)
                    if(res.status == 200){
                       console.log( res)
                        _this.contacts = res.content.map((item,index)=>{
                            item.dialStatus = 'error';
                            return item;
                        });
                        _this.all = res.pageCount;
                    }else if(res.status == 404){
                        _this.contacts = [];
                        _this.all = 0;
                    }else{
                        alert(res.msg);
                    }
                });
            },
            upPage(index){
                this.item.pageIndex = index;
                if(this.active == 'CallRecord'){
                    this.getCallRecord();
                }else{
                    this.updateList();
                }
            },
            datai(data){
                this.$emit('changeView','addclient',data);  
            }
        },
        watch:{
            search_text(newv){

                this.item.phone = '%' + this.search_text + '%';
                this.updateList();
            },
            dialStatus(newv){
                this.contacts[this.currentIndex].dialStatus = newv;
                console.log(newv,this.contacts[0])
            }
        }
    }
</script>
<style scoped>
.add_concat{
    display: inline-block;
    margin-top: -4px;
    margin-left: 20px;
}
.add_concat img{
    vertical-align: super;
}
.img{
    display: block;
    margin: 0 auto;
}
.contacts{
    padding:15px;
    background-color: white;
    box-shadow:0px 3px 20px rgba(174,225,244,.8);
}
.search_btn{
    height:22px;
    background-color: #1785F7;
    border-width: 0;
    padding: 3px 10px;
    border-radius: 0;
    margin-bottom:10px; 
    color:white;
    vertical-align: text-bottom
}



.iconSpan{
    line-height:22px;
    float:right;
    padding:0;
    margin-left:12px;
}
#search{
    width:100%;
    float:left;
    display:inline-block;
}
#search input{
    font-size: 12px;
    color: #999999;
    line-height: 12px;
    width: 165px;
    padding: 5px 12px;
    height:22px;
    border:1px solid #1785F7;
    border-radius:0;
}
#icon{
    float:left;
    display:inline-block;
    height:22px;
}
#choose{
    width: 100%;
    overflow: hidden;
}
.assortment{
    position:relative;
    float:left;
    width:25%;
    height:22px;
    text-align:center;
    border:1px solid #1785F7;
    cursor: pointer;
}
.assortment:not(:first-child){
    border-left:none; 
}
.active{
    background-color:#1785F7;
    color:white; 
}

.contacts table{
    position:relative;
    width:100%;
}
.contacts table tr td{
    font-size:14px;
    height:28px;
}
 .contacts table tr:hover{
    cursor:pointer;
    color:#1785F7;
    /*background:#F6F6F6;*/
}
.call{
    border-width: 0;
    padding:2px 4px;
    color: #fff;
    background: #d8d8d8

}
.status_success:hover{
    background: #9fe053;
}
.status_success{
    background: #96c95b;
}
.call img{
    vertical-align: bottom;
}
.status_guaduan{
    background: #d9534f
}
.status_guaduan:hover{
    background: #ff2e28
}

</style>
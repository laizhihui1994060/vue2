<template>
    <div class="travel" id="viewTravel">
        <breadcrumb
            :arr="[{path:'/LoginFinish/rescueManagement/taskTrip',text:'行程任务'},{path:'',text: isCreate ? '添加行程' : '查看行程'}]"/>

        <div class="main">   
            <article>基本信息</article>    
            <div class="details">
                <div class="row" v-if='!isCreate'>
                    <div class="col-xs-12">
                        <form-label-input 
                            label="公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司" 
                            input-width="17rem"
                            :value="orgName"
                            :disabled="true"
                        ></form-label-input>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <btn-select 
                           :after="true"
                            label='司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机' 
                            label-right='12px'
                            url='client:/helper/emp'
                            method='post'
                            :params='{isDriver:true,isUser:true}'
                            filter="empName"
                            filterName='userId'
                            name="driverId" 
                            width='135px'
                            btnWidth='10px'
                            :value="driver"
                            :disabled="disabled"
                            @updata="integrationDate"   
                            padding='0'>
                        </btn-select>
                    </div>
                    <div class="col-xs-4">
                        <btn-select 
                            :after="true"
                            label='车&nbsp;&nbsp;牌&nbsp;号' 
                            label-right='12px'
                            url='client:/helper/truck'
                            method='post'
                            filter="plateNo"
                            filterName='id'
                            name="towTruckId" 
                            width='135px'
                            btnWidth='10px'
                            :disabled="disabled"
                            :value="plateNo"
                            @updata="integrationDate"   
                            padding='0'>
                        </btn-select>
                    </div>     
                    <div class="col-xs-4">
                        <btn-select 
                        :after="true"
                            label='行程类型' 
                            width='135px'
                            btnWidth='10px'
                            label-right='12px'
                            :arr="[ {name: '返程', status: 'BACK' }, {name: '固定行程', status: 'FIXED' }]"
                            filter="name"
                            filterName='status'
                            defaultName='status'
                            defaultCode='BACK'
                            
                            name="category" 
                            :value="category"
                            :disabled="disabled"
                            @updata="integrationDate"   
                            padding='0'>
                        </btn-select>
                    </div>        
                </div> 
               
                
                <div class="row">
                    <div class="col-xs-4">
                        <form-label-input 
                            :after="true"
                            label="费&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用" 
                            input-width="135px"
                            name="amount"
                            :value="res.amount"
                            :disabled="disabled"
                            type='number'
                            @updata="integrationDate"
                            className='amount'
                        ></form-label-input>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            :after="true"
                            label="联&nbsp;&nbsp;系&nbsp;人" 
                            input-width="135px"
                            name="contactPeople"
                            :disabled="disabled"
                            :value="res.contactPeople"
                            @updata="integrationDate"
                        ></form-label-input>
                    </div>
                    <div class="col-xs-4">
                        <form-label-input 
                            :after="true"
                            label="联系电话" 
                            input-width="135px"
                            name="contactPhone"
                            :disabled="disabled"
                            type='number'
                            :value="res.contactPhone"
                            @updata="integrationDate"
                        ></form-label-input>
                    </div>
                </div>
                <div class='row startTime'>
                    <div class="col-xs-8" style="padding:0;padding-left:13px" >
                        <start-end-time  width="132px" startName='setOffTime' endName='arriveTime' :startValue="res.setOffTime" :endValue="res.arriveTime" left="0px" :disabled="disabled" @updata="integrationDate"></start-end-time>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-4">
                        <form-label-input 
                            label="途径城市" 
                            input-width="135px"
                            name="city"
                            :disabled="disabled"
                            :value='city'
                            @updata="integrationDate"
                        ></form-label-input>
                        <span class='add img input'  style="display:inline-block; position:relative; top: 5px;" @click='addCity'></span>
                    </div>
                    <div class="col-xs-8">
                        <p class="inline-close" style='margin-bottom:5px' :disabled='disabled'  v-for="(it, index) in cities">{{it}}<i @click="removeCities(index)"></i></p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-xs-12 address">
                        <form-label-input  
                            label='起点地址' 
                            :after="true"
                            inputWidth='17rem'
                            :disabled="disabled"
                            name='address'
                            @updata='integrationDate'
                            :value='res.setOffAddress.address'
                            :data-toggle='!disabled ? "modal" : "" ' 
                            data-target='#model_map' />
                    </div>
                </div>
                <div class="row">
                     <div class="col-xs-12 address">
                        <form-label-input  
                            label='终点地址' 
                            :disabled="disabled"
                            :after="true"
                            inputWidth='17rem'
                            name='address'
                            :value='res.destinationAddress.address'
                            :data-toggle='!disabled ? "modal" : "" ' 
                            data-target='#model_map' />
                       
                    </div>
                </div>
                <div class='row'>
                    <div class="col-xs-12">
                        <input-text
                            label="行程备注" 
                            name="scheduleDesc"
                            inputWidth="17rem"
                            inputHeight="60px"
                            :disabled="disabled"
                            :value="res.scheduleDesc"
                            @updata="integrationDate">
                            </input-text>
                    </div>
                </div>
                <div class='row'>
                    <div class="col-xs-12">
                        <input-img name="truckPhotos" :arr="imgArr" @updata="integrationDate" :disabled="disabled"></input-img>
                    </div>
                </div>
<!-- 
                <div class="row">
                    <div class="col-xs-12" id="taskType">
                        <label>任务行程</label>
                        <div class="btn-group" style="padding-right;display: inline-block;">
                            <button type="button" class="btn dropdown-toggle" @click.stop.prevent="showType" style='margin-left:2px;width:74px;background:#dcf4fc'>任务类型</button>
                            <button type="button" class="btn dropdown-toggle" @click.stop.prevent="showType"  style="backgroundColor: #39b6e5 ">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="javascript:;">
                                        <checkbox 
                                            text="快修" 
                                            :img-left="true" 
                                            name="rescueType" 
                                            value="快修"
                                            :index='0'
                                            @updata="addType"
                                        ></checkbox>
                                    </a>
                                </li> 

                                <li>
                                    <a href="javascript:;">
                                        <checkbox 
                                            text="拖车" 
                                            :img-left="true" 
                                            :index='1'
                                            name="rescueType" 
                                            value="拖车"
                                            @updata="addType"
                                        ></checkbox>
                                    </a>
                                </li> 

                                <li>
                                    <a href="javascript:;">
                                        <checkbox 
                                            text="急救" 
                                            :index='2'
                                            :img-left="true" 
                                            name="rescueType" 
                                            value="急救"
                                            @updata="addType"
                                        ></checkbox>
                                    </a>
                                </li> 
                            </ul>
                        </div>
                        <p style="margin-left:24px;display: inline-block;">{{ rescueType}}</p>
                    </div>
                </div> -->
            </div>
           
        </div>

        <div class="modal-footer">
            <div class="btns">
                <button v-if='modifyAuth' type="button" class="btn radius-btn" @click="modify">{{ isCreate ? "添加" : "修改"}}</button>
                <button type="button" class="btn radius-btn" data-dismiss="modal"  @click='goBack()'>返回</button>
            </div>
        </div>
        <model-map text='设为起点地址,设为终点地址'></model-map>
    </div>
</template>

<script scoped>
import breadcrumb from '../../../../../common_component/breadcrumb.vue'
import startEndTime from "../../../../../common_component/startEndTime.vue";
import modelMap from "../../../../../common_component/model_map.vue";
import formLabelInput from "../../../../../common_component/form-label-input.vue"
import checkbox from "../../../../../common_component/checkbox.vue"
import btnSelect from '../../../../../common_component/btn_select.vue';
import inputText from '../../../../../common_component/inputText.vue';
import inputImg from '../../../../../common_component/inputImg.vue';
    export default {
        components:{
           startEndTime,
           formLabelInput,
           checkbox,
           breadcrumb,
           btnSelect,
           inputText,
           modelMap,
           inputImg
        },
        data () {
            return {
                isCreate: false,
                driver:'',
                plateNo:'',
                category:'',
                modifyAuth: true,
                orgName: '',
                city: '',
                cities: [],
                res:{
                  "driverId": "string",
                  "towTruckId": "string",
                  "setOffAddress": {
                    "province": "string",
                    "city": "string",
                    "district": "string",
                    "town": "string",
                    "address": "",
                    "lng": 0,
                    "lat": 0
                  },
                  "cities": [
                  ],
                  "destinationAddress": {
                    "province": "string",
                    "city": "string",
                    "district": "string",
                    "town": "string",
                    "address": "",
                    "lng": 0,
                    "lat": 0
                  },
                  "setOffTime": 0,
                  "arriveTime": 0,
                  "scheduleDesc": "",
                  "category": "",
                  "amount": 0,
                  "contactPeople": "",
                  "contactPhone": "",
                  "truckPhotos": [
                  ]
                },
                imgArr:[],//图片的数组
                'rescueType':[],
                'num':4,
                disabled:false
            }
        },
        created(){
            const self = this;
            this.isCreate = this.$route.params.isCreate.toString() === 'true';

            if(!this.isCreate){
                if(global.ourOrgId){
                    self.update();
                }else{
                    var timer = setInterval(function(){
                        if(global.ourOrgId){
                            clearInterval(timer);
                            self.update();
                        }
                    }, 500);
                }   
            }
            bus.$on('updataAdress',function(type, addressObj, details){
                console.log(addressObj, details)
                switch(type){
                    case 'rescue':
                        self.res.setOffAddress.address = addressObj.address;
                        self.res.setOffAddress.city = details.city;
                        self.res.setOffAddress.province = details.province;
                        self.res.setOffAddress.district = details.district;
                        self.res.setOffAddress.town = details.town;
                    break;
                    case 'destination':
                        self.res.destinationAddress.address = addressObj.address;
                        self.res.destinationAddress.city = details.city;
                        self.res.destinationAddress.province = details.province;
                        self.res.destinationAddress.district = details.district;
                        self.res.destinationAddress.town = details.town;
                    break;
                }
                $('#model_map').modal('hide');
            })
            
        },
        methods:{
            update(){
                const self = this;
                    send({
                        url:'client:/route/'+self.$route.params.id,
                        type:'get'
                   },function(err,res){
                    if(err)return console.log(res);
                    if(res.status == 200){
                        console.log(res);
                       self.disabled=true;//详情，不可编辑
                       self.driver=res.content[0].driverName;
                       self.plateNo=res.content[0].plateNo;
                       if(res.content[0].routeCategory=="BACK"){
                          self.category="返程";
                       }else{
                          self.category="固定行程";
                       }

                       self.cities = [];
                       self.res.cities = [];
                       res.content[0].pathCities.forEach( (obj, index)=> {
                            self.cities.push(obj.city);
                            self.res.cities.push(obj);
                       });

                       console.info(self.cities);

                       const content = res.content[0];

                       if(content.orgId == global.ourOrgId){
                            self.modifyAuth = true;
                       }else{
                            self.modifyAuth = false;
                       }

                       self.orgName = content.orgName;
                       self.res.driverId=content.driverId;
                       self.res.towTruckId=content.truckId;
                       self.res.status=content.status;
                       self.res.setOffTime=content.scheduleTimeSetOff;
                       self.res.arriveTime=content.scheduleTimeArrive;
                       self.res.truckPhotos=content.truckPhotos;

                       self.res.amount=content.amount;
                       self.res.truckPhotos=content.truckPhotos;
                       self.imgArr=content.truckPhotos;
                       
                       self.res.contactPeople=content.contactPeople;
                       self.res.contactPhone=content.contactPhone;
                       self.res.scheduleDesc=content.scheduleDesc;


                       self.res.setOffAddress.address=content.setOffAddrAddress;
                       self.res.destinationAddress.address=content.destinationAddrAddress;

                       self.res.setOffAddress.city=content.setOffAddrCity;
                       self.res.destinationAddress.city=content.destinationAddrCity;

                       self.res.setOffAddress.lng=content.setOffAddrGps.x;
                       self.res.setOffAddress.lat=content.setOffAddrGps.y;
                       self.res.destinationAddress.lng=content.destinationAddrGps.x;
                       self.res.destinationAddress.lat=content.destinationAddrGps.y;
                    }else{
                        alert(res.msg);
                    };
                })
            },
            modify(){
                var self=this;
                // 修改 
                if(self.isCreate==false){
                    if(this.disabled){
                        this.disabled = false;     
                    }else{
                        self.res.routeId=self.$route.params.id;
                        fileUp(self.res['truckPhotos'],function(images){
                            self.res['truckPhotos']=images;
                            
                            let bool = true, amountBool = true;

                            $('#viewTravel .amount').each(function(index,el){

                                el.style.backgroundColor = '#DFF5FD';
                                const arr = el.value.split('.');
                                console.info(el.value)
                                if(el.value > 9999.99 || ( arr.length  > 2 ) ){
                                    el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                                    amountBool = false;
                                }
                            });

                            if(!amountBool){
                                alert('费用最大为9999.99, 且最多2位小数');
                                return;
                            }

                            $('#viewTravel').find('[verify="true"]').each(function(index,el){

                                el.style.backgroundColor = '#DFF5FD';
                                if(!el.innerHTML && !el.value){
                                    el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                                    bool = false;
                                }
                            });

                            if(!bool){
                                alert('请填写必要信息');
                                return ;
                            }

                            console.info(self.res);

                            send({
                                url:"client:/route",
                                param:self.res,
                                type:'put'
                            },function(err,response){
                                    console.log(err,response)
                                
                                if(response.status==200){
                                    self.disabled = true;
                                    self.update();
                                    alert(response.msg, "success");
                                }else{
                                    alert(response.msg);
                                }
                            });
                       });
                    }
                }else{
                    // 添加, 
                    let bool = true, amountBool = true;

                    $('#viewTravel .amount').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';
                        const arr = el.value.split('.');
                        console.info(el.value)
                        if(el.value > 9999.99 || ( arr.length  > 2 ) ){
                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            amountBool = false;
                        }
                    });

                    if(!amountBool){
                        alert('费用最大为9999.99, 且最多2位小数');
                        return;
                    }

                    $('#viewTravel').find('[verify="true"]').each(function(index,el){

                        el.style.backgroundColor = '#DFF5FD';
                        if(!el.innerHTML && !el.value){
                            el.style.backgroundColor = 'rgba(255, 0, 0, 0.26)';
                            bool = false;
                        }
                    });

                    if(!bool){
                        alert('请填写必要信息');
                        return;
                    }

                    fileUp(self.res['truckPhotos'],function(images){
                        self.res['truckPhotos'] = images;
                        send({
                            url:"client:/route",
                            param:self.res,
                            type:'post'
                        },function(err,response){
                            if(response.status == 200){
                                alert(response.msg,"success");
                                window.history.go(-1);
                            }else{
                                alert(response.msg);
                            }
                        });
                    });
                }
            },
            addType(name, item, ev, index){
                if(item){
                    this.rescueType.splice(index, 1, item);
                }else{
                    this.rescueType.splice(index, 1);
                }
            },
            addCity(){
                if(!this.disabled){
                    if(this.city.trim()){
                        this.cities.push( this.city);
                        this.res.cities.push({
                            city: this.city
                        });
                        this.city = '';
                    }else{
                        alert('城市名称不能为空')
                    }
                }
            },
            removeCities(index){
                this.cities.splice(index, 1);
                this.res.cities.splice(index, 1);
            },
            integrationDate(name,item){
                if(name == 'city'){
                    this.city = item;
                    return ;
                }
                this.res[name]= item;
                console.log(name, item);
            },
            goBack(){
                window.history.go(-1);
            }
        },
    }


   

</script>
<style >
    #viewTravel{
        margin:20px 0 0 30px;
    }
    #viewTravel .startTime label{
        margin-right: 14px;
    }
    #viewTravel .main article + div.details{
        background: #fff;
        padding:20px;
    }

    #viewTravel .row{
        margin:10px 0;
    }
    #viewTravel .col-xs-12  button{
        background: transparent;
        border-width: 0;
    }
</style>
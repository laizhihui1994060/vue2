<template>
    <div class="newEvent" role="newEvent">
        <div>
            <div class="triangle"></div>
            <div class='choose'>
                <div>
                    <!-- <textarea class="event_title" placeholder="请输入事件" rows="1" cols="11" @input="addRow" v-model="res.title"></textarea> -->
                    <form-label-input
                        :disabled='expired'
                        label='事件名称：'
                        name='title'
                        :className="expired?'transparent-input':''"
                        @updata='collectData'
                        v-model='res.title'
                    />
                </div>
                        
                <div v-show='0'>
                    <span class='tag'>开始：</span>
                    <date-timepicker
                        background='transparent'
                        width='121px'
                        padding='0'
                        placeholder='选择开始时间'
                        name="start"
                        
                        minView="minute"
                        @updata="collectData"
                    ></date-timepicker>
                </div>
                <div v-show='0'>
                    <span class='tag'>结束：</span>
                    <date-timepicker
                        background='transparent'
                        width='121px'
                        padding='0'
                        placeholder='选择结束时间'
                        name="end"
                        
                        minView="minute"
                        @updata="collectData"
                    ></date-timepicker>
                </div>
                <div v-show="0">
                    <span class='tag'>重复：</span>
                    <btn-select :arr="repeat_arr" 
                        name="repeat" filter='cn'
                        @updata="collectData" 
                        >
                    </btn-select>
                </div>
                
                <div>
                    <!-- <span class='tag'>提醒时间：</span> -->
                    <form-label-input
                        :disabled='expired'
                        label="提醒时间：" 
                        type='number'
                        name='remindTime'
                        min='0'
                        :max='maxRemindDay'
                        unit='天'
                        :className="expired?'transparent-input':''"
                        unitRight='25px'
                        @updata='collectData'
                    />
                    <!-- <btn-select 
                        :arr="remind_arr" 
                        name="remind" filter='cn'
                        @updata="collectData" 
                        > -->

                    </btn-select>
                </div>
            </div>   
            <button class="close pull-right onTop"  data-dismiss="newEvent" type="button"  @click="closeNewEvent">&times;</button>
            <div class="btn-wrap">
                <button :disabled='expired' class="btn default-btn infoBtn" @click="addOrChange">保存</button>
                <button v-show="commonEvent" class="btn default-btn cancel" @click="closeNewEvent">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
    import checkbox from '../../../../common_component/checkbox.vue'
    import dateTimepicker from '../../../../common_component/datetimepicker.vue'
    import inputImg from '../../../../common_component/inputImg.vue'
    import btnSelect from '../../../../common_component/btn_select.vue'
    import inputText from '../../../../common_component/inputText.vue' 
    import formLabelInput from  '../../../../common_component/form-label-input.vue'
    import  '../../../../../static/js/fullcalendar.js'    
    import moment from 'moment'
    import {uncodeRemind,uncodeRepeat,removeEvent,changePosition,setValue} from './calendar.js'


    /*
    *   1.当天时间独立样式      √
    *   2.选中时间独立样式      √
    *   3.选中事件独立样式      √
    *   4.展开更多三角          √
    *
    *
    *
    *
    *
    */
    export default{
        props:{
            elemCalendar:{
                // type:Object
            }
        },
        data() {
            return {
                expired:false,
                operateId:'',
                dragStartData:null,
                dragEndData:null,
                maxRemindDay:100000,
                commonEvent:true,
                repeat_arr:[
                    {cn:'不重复',ffds:'NONE'},
                    {cn:'每日',ffds:'DAILY'},
                    {cn:'每周',ffds:'WEEKLY'},
                    {cn:'每月',ffds:'MONTHLY'},
                    {cn:'每年',ffds:'YEARLY'},
                    {cn:'隔周',ffds:'BIWEEKLY'}
                ],
                remind_arr:[
                    {cn:'不提醒',ffds:'BLUE'},
                    {cn:'提前一小时',ffds:'YELLOW'},
                    {cn:'提前一天',ffds:'OTHER'},
                    {cn:'提前一周',ffds:'OTHER'},
                    {cn:'每年',ffds:'OTHER'},
                    {cn:'隔周',ffds:'OTHER'}
                ],
                res:{
                    id:'',
                    title:'',
                    start:'',
                    end:'',
                    repeat:'',
                    remind:''
                },
                start:'',
                end:'',
                repeat:'不重复',
                remind:'不提醒'
            }
        },
        methods:{
            watchVal() {
                console.log(this.res.title)
            },
            collectData(name,searchQuery,value) {

                var value = value || searchQuery;
                console.log(name,value)
                if (name == "remindTime") {
                    // if (searchQuery instanceof Object) {
                    //     switch(searchQuery.cn) {
                    //       case '不提醒':value = 0 ;break;
                    //       case '提前一小时':value = 60 ;break;
                    //       case '提前一天':value = 60*24 ;break;
                    //       case '提前一周':value = 60*24*7 ;break;
                    //       default : value   = 0 ;break;
                    //     }
                    // }

                    value = Number(value)===0?0:( Number(value)*60*24
                             - parseInt(    ( Date.now()-this.zeroOclock() )/1000/60    )
                             - 10 ) // 换成天且减去当天时间差
                    console.log("提醒时间是不是0",value)

                } else if (name=="repeat") {

                   switch(value) {
                      case '不重复':value = 'NONE'    ;break;
                      case '每日':value = 'DAILY'     ;break;
                      case '每周':value = 'WEEKLY'    ;break;
                      case '每月':value = 'MONTHLY'   ;break;
                      case '每年':value = 'YEARLY'    ;break;
                      case '隔周':value = 'BIWEEKLY'  ;break;
                   }
                }

                this.res[name]=value;           
            },
            randomRemark() {
                var text
                try{
                    text = ['年审','保险','通行证','保养','自定义'][Math.floor(Math.random()*5)]
                }catch(e) {
                    text = 'custom'
                }
                return text
            },
            save(tmpAdd) {
                var self=this;
                // var start = moment($("[name='start']").val()).format("YYYY-MM-DD HH:mm");
                // var end = moment($("[name='end']").val()).format("YYYY-MM-DD HH:mm");
                // var title = $(".choose").find("textarea").val();
                var repeat = $("[name='repeat']").html();    
                var remind = $("[name='remind']").val();
                var params = {
                  "calendarType": "OTHER",
                  "title":this.res.title,
                  "remark": "kl",/***/
                  "startTime":moment($("[name='start']").val()).format("X")*1000,
                  "endTime": moment($("[name='end']").val()).format("X")*1000,
                  "remindTime":self.res.remindTime,
                  // "tenantId": "05690a6f-1b53-2e3b-5b2d-b815c65aacac",
                  // "orgId": "8476c8d8-2a36-4965-ae4c-e67df5160b09",
                  // "tenantId": global.user_info.tenantId,
                  // "orgId": global.user_info.orgId,
                  "calendarSource":'MANUAL',
                  // "frequency":"WEEKLY",
                  // "remind": true,
                  "remind":!!self.res.remind,
                  "repeat": false
                };

                // if (self.res.repeat != '') {
                //       if (self.res.repeat == "NONE") {
                //         params['repeat'] = false;
                //         params["frequency"] = "YEARLY";
                //       } else {
                //           self.collectData("repeat",null,repeat);
                //           if (self.res.repeat == "NONE") {
                //             params['repeat'] = false;
                //             params["frequency"] = "YEARLY";
                //           } else {
                //             params["frequency"] = self.res.repeat;
                //           }      
                //     }
                // }
                console.log("起始时间：，，",$("[name='start']").val())
                if (self.res.remind == 0) {
                    params['remind'] = false;
                } else if (0 && self.res.remind > (0 - Date.now())) {

                }

                return this.validateParam(params);
            },
            validateParam(params) {

                if (params.endTime < Date.now() || params.startTime < new Date().setHours(0,0,0,0)) {
                    return alert("不能设置已经过期的事件")
                } else if (params.startTime > params.endTime) {
                    return alert("结束时间不能早于开始时间")
                } else if (params.remindTime*1000*60 > (params.endTime - Date.now()) ) {
                    $("[name='remind']").val(0)
                    this.res.remind = 0;
                    return alert("提醒时间超过了结束时间，请重新设置")
                } else if (params.title.trim() === "") {
                    return alert("请填写事件")
                } else if (params === null) {
                    return null;
                }
                return params;
            },
            zeroOclock () {
                return new Date().setHours(0,0,0,0)
            },
            updateToolTips () {
                $('.fc-content').each((index,item)=>{
                            var text = $(item).find('.fc-title').text()
                                // text = text===""? '空' : text;
                            $(item).parent().tooltip({
                                html:true,
                                template:   `<div style="" class="tooltip" role="tooltip">`+
                                                `<div class="tooltip-arrow"></div>`+
                                                `<div class="tooltip-inner" style="text-align:center;min-width:110px;max-width:300px;padding:8px"></div>`+
                                            `</div>`,
                                title:text,
                                placement:'auto'
                            })
                })
            },
            event_init(start, end, timezone, callback) {
                const self = this;
                var date = $('#calendar').fullCalendar('getDate');
                var startParam = moment(date).startOf("month").format();
                var endParam = moment(date).endOf("month").format()
                // console.log(moment(date).startOf("month").format("X"))
                // console.log("get date is what",moment(date).startOf("month"))
                console.log({start:startParam,end:endParam})
                 send({
                    type:'post',
                    url:'control:/calendar/events/query',
                    param:{
                        "startTime" : startParam,
                        "endTime": endParam
                    }
                },(err,res)=>{
                    if (res.status == 200) {

                        console.log("查询日历成功",res.content)
                        var events = res.content.filter(it=>{
                            // if (it['calendarType'] === 'OTHER') {
                            //     return true;
                            // }
                            var boolean = true;
                            if ( it.endTime > new Date(endParam).getTime() ) {
                                boolean = false;
                            } else if (it.calendarType　!== "OTHER" && !this.serverURL(["companyManagement","calendar_index_notice"])) {
                                boolean = false;
                            }

                            return boolean;
                        }).map((it,index)=>{
                            var titleText = it['title']
                            var color = '', now = Date.now(), type = it['calendarType'];
                            // I   have    no    choice
                            var _editable = (type === "OTHER" || !type)
                            
                            var txtColor = "#000"
                            if ( type !== "OTHER" && type !== "VERIFICATION") {
                                titleText = `${it.plateNo} ${it.codeName}`
                            } else if ( type === "VERIFICATION" ) {
                                titleText = `${it.plateNo} 年审`
                            }
                            //不同状态不同颜色
                            //年审：#d6eef8 //#ffb3b3
                            //保险：#cfcde6 //#e4cde6 //
                            //通行证：#c4ecd6
                            //保养： #f0cbef//#ffddbf
                            //用户自定义：#d6eef8
                            // 之后换成type
                            switch(type) {
                                case "VERIFICATION": color = "#d6eef8" ; break;
                                case "INSURANCE": color = "#b8cbcf" ; break;
                                case "PASS_CHECK": color = "#c4ecd6" ; break;
                                case "MAINTAIN": color = "#cdd5ea" ; break;
                                case "OTHER": {
                                    color = "#5792d9";
                                    txtColor  = "#fff";
                                } ; break;
                                default : {
                                    color = "#5792d9";
                                    txtColor  = "#fff";
                                }; break;
                            }
                            return {
                                id              : it['calendarId'],
                                title           : titleText,
                                realStart       : moment(it['startTime']).format("YYYY-MM-DD HH:mm"),
                                start           : moment(it['endTime']).startOf("day").format("YYYY-MM-DD HH:mm"),
                                end             : moment(it['endTime']).format("YYYY-MM-DD HH:mm"),
                                frequency       : it['frequency'],
                                remind          : it['remindTime'],
                                backgroundColor : color,
                                textColor       : txtColor,
                                eventEditable   : _editable
                                // allDay:true
                            }
                        });
                        callback(events);
                        self.addDeleteButton();
                        self.updateToolTips();
                        

                    }else{
                        console.log(res);
                        return alert(res.msg);
                    }
                });
            },
            addEvent() {
                var params=this.save("临时的");
                var self=this;
                
                console.log("添加参数：",params)

                if (!params) {
                    return;
                }
                send({
                    type:'post',
                    url:'control:/calendar/events',
                    param:params
                },function(err,res) {

                    // self.res.title=$(".choose").find("textarea").val();
                    self.res.start      = moment($("[name='start']").val()).format("YYYY-MM-DD HH:mm");
                    self.res.end        = moment($("[name='end']").val()).format("YYYY-MM-DD HH:mm");
                    self.res.frequency  = self.collectData("repeat",null,$("[name='repeat']").html());
                    self.res.remind     = self.collectData("remind",null,$("[name='remind']").val());

                    if (res.status == 200) {
                        self.res.id     = res.content[0].id;
                        
                        // self.res.allDay = true
                        console.log('res',self.res)
                        
                        
                    }else{
                        alert(res.msg);
                    }
                    self.res.backgroundColor = "#5792d9";
                    self.res.textColor = "#fff"
                    self.res.eventEditable = true;
                    $("#calendar").fullCalendar('renderEvent',self.res);
                    $("#calendar").fullCalendar('rerenderEvents');
                    self.updateToolTips()
                    for(var item in self.res) {
                        self.res[item] = "";//添加事件之后，清空输入框的内容
                    }

                    console.log("添加事件结果",res)
                });

                
                this.closeNewEvent();

            },
            addOrChange() {
                // console.log("add or change触发")
                var addOrChange =   window.sessionStorage.getItem("addOrChange");
                console.log(addOrChange)
                if (addOrChange  ==  "add") {
                    this.addEvent();
                }else if (addOrChange == "change") {
                    this.changeEvent();
                }
            },
           //修改事件
            changeEvent() {
                // var id=window.sessionStorage.getItem("eventId");
                var id = this.operateId;
                var params = this.save();
                var self = this;
                if (!params) {
                    return;
                }
                delete params.tenantId;
                delete params.orgId;
                //查看参数：
                console.log("修改参数",params)
                // console.log(new Date(params.startTime).toLocaleString())
                // console.log(new Date(params.endTime).toLocaleString())
                if (id) {
                    send({
                        type:'put',
                        url:'control:/calendar/events/'+id,
                        param:params
                    },function(err,res) {
                        if (res.status == 200) {
                            self.closeNewEvent();
                            $("#calendar").fullCalendar('refetchEvents');
                            self.updateToolTips()
                        }else{
                            alert(res.msg);
                        }
                        console.log("修改事件结果",res)
                    });
                }
                self.closeNewEvent();
            },
            closeNewEvent() {
                $(".newEvent").hide();
                $('.fc-current-selected-event').removeClass("fc-current-selected-event")
                $('.fc-current-selected-day').removeClass("fc-current-selected-day")
            },

            //deprecated
            addRow(event) {
                // var tar=event.target||event.srcElement;
                // // var len = 0; 
                // var strWidth = [...tar.value].reduce((prev,curr)=>{
             //     //半角+1，全角+2
             //     if (curr.match(/[\u0000-\u00ff]/g)) {
             //         return prev + 1;
             //     } else {
             //         return prev + 2;
             //     }
             //  },0)
             //  //输入框的高度=输入的长度除以24（一行的长度）                       
             //  tar.style.height=25*(Math.floor(strWidth/23)+1)+"px";
            },
            event_click(calEvent, jsEvent, view) {
                console.log('js事件',jsEvent.target,'\n',jsEvent.offsetX)
                if( jsEvent.target.tagName === 'i' ){
                    this.removeDirectly(calEvent.id)
                }
                console.log(calEvent)
                window.sessionStorage.setItem("addOrChange","change");
                window.sessionStorage.setItem("event",JSON.stringify(calEvent));
                window.sessionStorage.setItem("eventId",calEvent.id);//意义不明
                const self  = this;
                var title   = calEvent.title;
                var start   = moment(calEvent.start).format("YYYY-MM-DD HH:mm");
                var end     = moment(calEvent.end).format("YYYY-MM-DD HH:mm");
                var repeat  = uncodeRepeat(calEvent.frequency);
                var remind  = uncodeRemind(calEvent.remind)?uncodeRemind(calEvent.remind):0;
                var diff    = moment(calEvent.start).diff( this.zeroOclock() )//根据到当天的时间算出最大提醒天数
                 $(".newEvent").find(".infoBtn").text("修改")
                // $(".choose").find("textarea").val(title);
                this.operateId  = calEvent.id;
                this.res.title  = title;
                this.res.remind = remind;
                this.expired    = ( !calEvent.eventEditable || moment(calEvent.start).isBefore(this.zeroOclock()) );//控制过期与否
                this.commonEvent = calEvent.eventEditable
                if (diff > 0 ) {
                    this.maxRemindDay = Math.floor(diff/1000/60/60/24)
                } else {
                    this.maxRemindDay = 0;
                }
                this.$nextTick(()=>{
                    $("[name='start']").val(start);
                    $("[name='end']").val(end);
                    $("[name='repeat']").html(repeat);
                    $("[name='remind']").val(Math.ceil(remind/60/24))
                })
               // $(".infoBtn").on("click",self.changeEvent);//重复触发，屏蔽试试
               $(".newEvent").find(".cancel").html("删除").addClass("deleteBtn").removeClass("cancel").bind("click",this.removeEvent);

                changePosition(jsEvent,"event");    
                                      
            },
            removeEvent ( e, argId ) {
                const self = this;
                // var id=window.sessionStorage.getItem("eventId");
                console.log("删除")
                var id = !!argId ? argId : this.operateId;
                console.log("id",id)
                if (id) {
                    $("#calendar").fullCalendar('removeEvents',id);
                    send({
                        type:"delete",
                        url:"control:/calendar/events/" + id,
                        param:null
                    },function(err, res) {
                        if (res.status == 200) {
                            console.log(res);
                            self.addDeleteButton()
                        } else {
                            alert(res.msg);
                        }
                    });
                }
            },
            day_click(dateEvent, jsEvent, view) { 
                this.expired = moment(dateEvent).isBefore(this.zeroOclock())  
                if (this.expired) {
                    this.closeNewEvent()
                    return;
                }
                if ($(".newEvent").find(".cancel")) {
                    $(".newEvent").find(".deleteBtn").html("取消").addClass("cancel").removeClass("deleteBtn").unbind("click",this.removeEvent);   
                }
                $(".newEvent").find(".infoBtn").text('新建')   
                window.sessionStorage.setItem("addOrChange","add");

                changePosition(jsEvent,"day",moment(dateEvent).format("YYYY-MM-DD"));                
                //初始化，默认开始结束时间是当天
                var start   = moment(dateEvent).startOf('day').format("YYYY-MM-DD HH:mm");
                var end     = moment(dateEvent).endOf('day').format("YYYY-MM-DD HH:mm");
                var repeat  = "不重复";
                var remind  = 0;
                var diff    = moment(dateEvent).diff( this.zeroOclock() )
                // $(".choose").find("textarea").val("");
                this.res.title = ''
                this.res.remind = 0;
                // 限制提醒时间使其不早于当日凌晨：       
                if (diff > 0 ) {
                    this.maxRemindDay = Math.floor(diff/1000/60/60/24)
                } else {
                    this.maxRemindDay = 0;
                }
                $("[name='start']").val(start);
                $("[name='end']").val(end);
                $("[name='repeat']").html(repeat);
                // $("[name='remind']").html(remind);

                $("[name='remind']").val(remind);
                
            },
            event_limit_click() {
                console.log("more")
                this.closeNewEvent();

                //必须返回popover或者其他可用参数使其保留默认弹出行为
                return "popover"
            },
            addDeleteButton () {
                $('a.fc-day-grid-event .fc-title').after('<i>DELETE</i>')
            },
            //deprecated
            event_drag_up(ev,jsEv,ui,view) {
                console.log("拖拽弹起",arguments)
            },
            //deprecated
            event_drag_down(ev,jsEv,ui,view) {
                console.log("拖拽开始",arguments)
            },
            //deprecated
            event_hover(event,jsEvent,view) {
            },
            //deprecated
            event_leave(event,jsEvent,view) {
                // this.$emit('event_leave')
            },
            showDayDetail() {

            },
            serverURL(url) {
               return ConfigPage.isExist(url);
            },
        },
        watch:{

        },
        mounted() {
            var self=this;
            this.elCalen = $("#calendar")[0];
            $("#calendar").click(function(event) {
                var tar = event.target || event.srcElement;
                if (tar.className == "fc-prev-button") {

                }
            });
            this.$nextTick(function() { 

                window.sessionStorage.setItem("addOrChange","add");//默认是新增事件
                $(".fc-nonbusiness").click(this.showDayDetail);
                var information_details_status = false; 
                var today = new Date(); 

                //初始化日历
                $('#calendar').fullCalendar({
                    
                    buttonText          : { today : '今天' },
                    dayNames            : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],   
                    defaultDate         : today,
                    displayEventTime    : false,//是否显示事件时间
                    editable            : false,//事件条是否可拖动，暂时不开启
                    eventLimit          : true, // 若当天事件过多，是否折叠为"更多"按钮
                    eventLimitText      : "",
                    header              : {
                                               left     :   'title',
                                               center   : '',
                                               right    :  'prev,today,next'
                    },
                    locale              : 'zh-cn',
                    // displayEventEnd:true,
                    selectable          :false,//开启拖拽  与click冲突
                    // timeFormat: 'HH:mm',//需求仅为当天，这个就不需要了 
                    events              : self.event_init,//初始化的查询
                    eventClick          : self.event_click,//点击事件弹出编辑框
                    eventLimitClick     : self.event_limit_click,//点击下拉按钮弹出当日所有事件回调
                    dayClick            : self.day_click,//点击日期弹出编辑框
                    eventMouseover      : self.event_hover,//事件条拖动的回调
                    eventMouseout       : self.event_leave,
                    select              : self.event_drag_up,
                    unselect            : self.event_drag_down
                }); 
           
            })
        
        },
        components:{
            checkbox,
            dateTimepicker,
            inputImg,
            btnSelect,
            formLabelInput,
            inputText
        }
    }
</script>
<style scoped>
    #calendar{
        position:relative;
        left:2.5%;
        width: 95%;
        margin: 0 auto;
    }
   .event .tag{
        color: #999;
        margin:10px;
    }
    .choose > div{
        margin-bottom:15px;
    }
    .onTop{
        position:absolute;
        top:0;
        right:0;
    }
    .fc_event_tooltip{
        color:green;
        height: 60px;
        text-align: center;
    }
    #calendar .close{
        background-color: #000;
    }
    select {
      width: 120px;
      border: none;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      border-radius: 0;
      padding: 2px 0 2px 10px;
      padding-right: 20px;
      background-color: #DFF5FD;
      cursor: pointer;
      font-size: 12px;
    }
    .cancel{
        background:white;
        border:1px solid #DFF5FD;
    }
    .btn{
        margin-top:5px;
        margin-left:25px;
    }
    .triangle{
        position:absolute;
        left:-6px;
        top:20px;
        width: 0;
        height: 0;
        
        border: 8px solid white;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        box-shadow: -2px 2px 2px 0 rgba(0,0,0,0.2);
        z-index:inherit;
    }
    .rotate{
        box-shadow: 2px -2px 2px 0 rgba(0,0,0,0.4);
    }
    .newEvent{
        position:absolute;
        display:none;
        left:30px;
        width:250px;
        box-shadow: 1px 1px 7px 1px gray;
        padding:10px;
        background:white;
        z-index:100;
        border-radius: 10px;
    }

    .newEvent > div{
        
        width:90%;
        margin:0 auto;
    }
    .newEvent .btn-wrap{
        text-align: center;
    }
    .newEvent button{
            color: #FFFFFF ;
            background-color: #39B6E5 ;
            /*border: 1px solid #39B6E5;*/
    }
    .newEvent button.close{
        padding: 2px;
        opacity: 1;
        border-radius: 0px 7px 0px 0px;
        /*background-color: black;*/
    }
    .newEvent button[disabled]{
        display: none;
    }
    .newEvent input[type="textarea"],textarea{
        width:170px;
        line-height:25px;
        overflow-y: hidden;
        word-wrap: break-word;
        resize: none;
    }

    .event_title{
        font-family:'consolas';/* 等宽字体 */
        border:0;
        height:25px;
        border-bottom:1px solid #39B6E5;
    }

</style>
global.util = {};
import caogao from "../../../src/assets/caogao.png";
import jiuyuanzhong from "../../../src/assets/jiuyuanzhong.png";
import xindingdan from "../../../src/assets/xindingdan.png";
import shenhexindingdan from "../../../src/assets/shenhexindingdan.png";
import wancheng from "../../../src/assets/wancheng.png";
import quxiao from "../../../src/assets/quxiao.png";

/**
 *
 * @param value 需要转换的值
 * @returns 把秒数转换成时分秒
 */
util.formatSeconds = function(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    var result;
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }
    if(value >=60){
    result = ""+parseInt(theTime)+"秒";
    }
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"
    }
    if(theTime2 > 0) {
       result = ""+parseInt(theTime2)+"小时"+result;
    }
    return result;
}/**
 *
 * @param value 需要转换的值
 * @returns 把秒数转换成时分秒
 */
util.getLocalTime = function(nS,data) {     
    if(!nS) return '';
    let result = formatTime(new Date(nS) );
    return result;

    function formatTime(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();


      var hour = date.getHours();
      var minute = date.getMinutes();
      var seconds = date.getSeconds();

      if(data == 'day')return [hour, minute,seconds].map(formatNumber).join(':');

      return data ? [year, month, day].map(formatNumber).join('/')  :[year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
    }

    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
}
     
util.dateDiff = function(str1,str2){
    const date1 = null;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

util.matchShareStatus = function(status){
    // console.log(status)
    switch(status){
        case 'NEW': 
            return `开始投标`;
            break;
        case 'CANCEL': 
            return `取消投标`;
            break;
        case 'BIDDING': 
            return `已有投标并等待选择`;
            break;
        case 'BID_CHOOSED': 
            return `已经选择投标`;
            break;
        case 'BID_TIMEOUTED': 
            return `投标超时`;
            break;
        case 'INVITATION_REJECTED': 
            return `拒绝邀请`;
            break;
        case 'EXPIRED': 
            return '过期';
            break;
        default: 
            break;
    }
}

util.matchOrderStatus = function(status,filterName){

    if(filterName == 'orderStatus_icon'){


        
        switch(status){
            case 'DRAFT': 
                return `<img src=${caogao} height="18px" />&nbsp;&nbsp;&nbsp;草稿`;
                break;
            case 'NEW_ORDER': 
                return `<img src=${xindingdan} height="18px"  />&nbsp;&nbsp;&nbsp;新订单`;
                break;
            case 'NEW_APPROVED': 
                return `<img src=${shenhexindingdan} height="18px"  />&nbsp;&nbsp;&nbsp;已审核订单`;
                break;
            case 'ORDER_CANCELLED': 
                return `<img src=${quxiao} height="18px"  />&nbsp;&nbsp;&nbsp;订单被取消`;
                break;
            case 'WORKING': 
                return `<img src=${jiuyuanzhong} height="18px"  />&nbsp;&nbsp;&nbsp;救援中`;
                break;
            case 'DONE': 
                return `<img src=${wancheng} height="18px"  />&nbsp;&nbsp;&nbsp;完成救援`;
                break;
            case 'EXPIRED': 
                return '过期';
                break;
            default: 
                break;
        }

    }else{

        switch(status){
            case 'DRAFT': 
                return '草稿';
                break;
            case 'NEW_ORDER': 
                return '新订单';
                break;
            case 'NEW_APPROVED': 
                return '已审核订单';
                break;
            case 'ORDER_CANCELLED': 
                return '订单被取消';
                break;
            case 'WORKING': 
                return '救援中';
                break;
            case 'DONE': 
                return '完成救援';
                break;
            case 'EXPIRED': 
                return '过期';
                break;
            default: 
                break;
        }

        if(typeof status === 'string' && status.indexOf(',')!==-1){
            var str = status.split(',').map(item=>util.matchOrderStatus(item));
            return str.join(',')
        }

    }

}
util.matchTackStatus = function(status,icon){
    switch(status){
        case 'DISPATCHED' : 
            return  icon ? `<span class="carStatus DISPATCHED"></span><span class="carStatusString">未接受</span>`: '未接受';
            break;
        case 'ACCEPTED' : 
            return  icon ? `<span class="carStatus ACCEPTED"></span><span class="carStatusString">已接受，待出发</span>`: '已接受，待出发';
            break;
        case 'REJECTED' : 
            return  icon ? `<span class="carStatus REJECTED"></span><span class="carStatusString">拒绝</span>`: '拒绝';
            break;
        case 'EXPIRED' : 
            return  icon ? `<span class="carStatus EXPIRED"></span><span class="carStatusString">过期</span>`: '过期';
            break;
        case 'DRIVING_TO_INCIDENT_LOCATION' : 
            return  icon ? `<span class="carStatus DRIVING_TO_INCIDENT_LOCATION"></span><span class="carStatusString">出发去救援地</span>`: '出发去救援地';
            break;
        case 'PAUSED' : 
            return  icon ? `<span class="carStatus PAUSED"></span><span class="carStatusString">暂停</span>`: '暂停';
            break;
        case 'JOB_CANCELLED' : 
            return  icon ? `<span class="carStatus JOB_CANCELLED"></span><span class="carStatusString">任务被取消</span>`: '任务被取消';
            break;
        case 'ARRIVED_AT_INCIDENT_LOCATION' : 
            return  icon ? `<span class="carStatus ARRIVED_AT_INCIDENT_LOCATION"></span><span class="carStatusString">到达救援地</span>`: '到达救援地';
            break;
        case 'RSA_WORKING' : 
            return  icon ? `<span class="carStatus RSA_WORKING"></span><span class="carStatusString">装车中</span>`: '装车中';
            break;
        case 'RSA_DONE' : 
            return  icon ? `<span class="carStatus RSA_DONE"></span><span class="carStatusString">完成装车</span>`: '完成装车';
            break;
        case 'DRIVING_TO_DESTINATION_LOCATION' : 
            return  icon ? `<span class="carStatus GOTO_DESTINATION"></span><span class="carStatusString">去目的地</span>`: '去目的地';
            break;
        case 'ARRIVED_AT_DESTINATION_LOCATION' : 
            return  icon ? `<span class="carStatus DESTINATION"></span><span class="carStatusString">到达目的地</span>`: '到达目的地';
            break;
        case 'JOB_DONE' : 
            return  icon ? `<span class="carStatus JOB_DONE"></span><span class="carStatusString">已经完工</span>`: '已经完工';
            break;
        case 'FREE' : 
            return  icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`: '空闲';
            break;
        case 'RETURN_DONE' : 
            return  icon ? `<span class="carStatus FREE"></span><span class="carStatusString">到达驻地</span>`: '返程结束，到达返程地';
            break;
        case 'SETOFFED' : 
            return  icon ? `<span class="carStatus SETOFFED"></span><span class="carStatusString">正前往救援地</span>`: '正前往救援地';
            break;
        case 'TH_REJECT' : 
            return  icon ? `<span class="carStatus TH_REJECT"></span><span class="carStatusString">拒绝</span>`: '拒绝';
            break;
        case 'ARRIVE_RESCUE' : 
            return  icon ? `<span class="carStatus ARRIVE_RESCUE"></span><span class="carStatusString">到达救援地</span>`: '到达救援地';
            break;
        case 'TRUCK_LOADING' : 
            return  icon ? `<span class="carStatus TRUCK_LOADING"></span><span class="carStatusString">正在装车</span>`: '正在装车';
            break;
        case 'GOTO_DESTINATION' : 
            return  icon ? `<span class="carStatus GOTO_DESTINATION"></span><span class="carStatusString">正在前往目的地</span>`: '正在前往目的地';
            break;
        case 'DESTINATION' : 
            return  icon ? `<span class="carStatus DESTINATION"></span><span class="carStatusString">到达目的地</span>`: '到达目的地';
            break;
        case 'UNLOADING' : 
            return  icon ? `<span class="carStatus UNLOADING"></span><span class="carStatusString">正在卸车</span>`: '正在卸车';
            break;
        case 'FINISH_UNLOADING' : 
            return  icon ? `<span class="carStatus FINISH_UNLOADING"></span><span class="carStatusString">完成卸车</span>`: '完成卸车';
            break;
        case 'TH_CACELRESCUE' : 
            return  icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`: '空闲';
            break;
        case 'COMPLETED' : 
            // return  icon ? `<span class="carStatus COMPLETED"></span><span class="carStatusString">完成</span>`: '完成';
            return icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`:'空闲';

            break;
        case 'JOB_FAIL' : 
            return  icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`: '空闲';
            break;
        case 'CANCEL_DISPATH' : 
            return  icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`: '空闲';
            break;
        case 'ARRIVE_STATION' : 
            return icon ? `<span class="carStatus FREE"></span><span class="carStatusString">到达驻地</span>`:'到达驻地';
            break;
        case 'offLine' : 
            return  icon ? `<span class="carStatus offLine" ></span><span class="carStatusString">离线</span>`: '离线';
            break;
        case 'FREE' : 
            return icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`:'空闲';
            break;
        default:
            return icon ? `<span class="carStatus FREE" ></span><span class="carStatusString">空闲</span>`:'空闲';;
            break;

    }
};
util.matchTackNode = function(status){
    switch(status){

        case 'ACCEPT' : 
            return '接受';
            break;
        case 'REJECT' : 
            return '拒绝';
            break;
        case 'TIMEOUT' : 
            return '超时未接受';
            break;
        case 'SET_OFF_TO_INCIDENT_SPOT' : 
            return '出发去救援地';
            break;
        case 'PAUSE' : 
            return '暂停';
            break;
        case 'RESUME' : 
            return '继续';
            break;
        case 'ARRIVE_AT_INCIDENT_SPOT' : 
            return '到达救援地';
            break;
        case 'START_RSA' : 
            return '路修，或现场施救/装车中';
            break;
        case 'FINISH_RSA' : 
            return '完成施救/装车/路修';
            break;
        case 'SET_OFF_TO_DESTINATION_SPOT' : 
            return '行驶去目的地/交车地/卸车地';
            break;
        case 'ARRIVE_AT_DESTINATION_SPOT' : 
            return '到达目的地';
            break;
        case 'START_UNLOADING' : 
            return '开始卸车';
            break;
        case 'FINISH_UNLOADING' : 
            return '完成卸车';
            break;
        case 'JOB_DONE' : 
            return '已经完工';
            break;
        case 'SET_OFF_BACK' : 
            return '返程中';
            break;
        case 'ARRIVE_AT_RESIDENT_SPOT' : 
            return '返程结束，到达返程地';
            break;
        case 'JOB_CANCEL' : 
            return '订单被取消';
            break;
        case 'JOB_FAIL' : 
            return '救援失败';
        case 'TAKEPHOTO' : 
            return '拍照';
            break;
        case 'EXPIRED' : 
            return '过期';
            break;
        default:
            return '无语';
            break;

    }
}
util.matchJobResult = function(status){
      switch(status){
        case 'NOT_START': 
            return '未开始';
            break;
        case 'WORKING': 
            return '救援中';
            break;
        case 'SUCCESS': 
            return '救援成功';
            break;
        case 'FAILED': 
            return '救援失败';
            break;
        case 'CANCEL_CHARGABLE': 
            return '取消救援';
            break;
        case 'CANCEL_NOFEE': 
            return '取消无费';
            break;
        case 'REJECTED': 
            return '拒绝';
            break;
        case 'EXPIRED': 
            return '过期';
            break;
        default:
            return '无语';
            break;
    }
};

util.matchPosition = function(status){
      switch(status){
        case 'driver': 
            return '救援技师';
            break;
        case 'disaptcher': 
            return '调度员';
            break;
        case 'tel_operator': 
            return '接线员';
            break;
        case 'salesman': 
            return '业务员';
            break;
        case 'manager': 
            return '经理';
            break;
        case 'driver_captain': 
            return '车队长';
            break;
        case 'teller': 
            return '出纳';
            break;
        case 'accountant': 
            return '会计';
            break;
        default: 
            return '未设置';
            break;
    }
};


util.matchPayMethod = function(status){
    switch(status){
        case "CASH": return '现金'; break;
        case "TRANSFER": return '银行转账'; break;
        case "WIRE": return '电汇'; break;
        case "CHECK": return '支票'; break;
        default: return ""; break;
    }
}

util.taskTripStatus = function(status){
    switch(status){
        case "DRAFT": return '草稿'; break;
        case "PUBLISHED": return '已经发布'; break;
        case "EXPIRED": return '过期'; break;
        case "CANCELED": return '取消'; break;
        case "REJECTED": return '拒绝'; break;
        case "MATCHED": return '匹配'; break;
        case "DISPATCHED": return '派遣'; break;
        default: return ""; break;
    }
}
//任务状态
util.matchJobsDetail = function(status){
    switch(status){
        default: return status; break;
    }
}
//任务结果
util.matchJobStatusOverall = function(status){
    switch(status){
        default: return status; break;
    }
}

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

util.randomId = function(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
util.matchRescueType = function(code){
    let obj = {};

    switch(code){
        case '01':
            obj = {
                en:'trailer',
                cn:'拖车'
            };
            break;
        case '02':
            obj = {
                en:'fastRepai',
                cn:'快修'
            };
            break;
        case '04':
            obj = {
                en:'predicamentRescue',
                cn:'困境救援'
            };
            break;
        case '03':
            obj = {
                en:'commercialVehicle',
                cn:'新车托运'
            };
            break;
        case '05':
            obj = {
                en:'TractionBase',
                cn:'地库牵引'
            };
            break;
        case '0201':
            obj = {
                en:'fastRepai',
                cn:'抢修'
            };
            break;
        case '0202':
            obj = {
                en:'fastRepai',
                cn:'送燃料'
            };
            break;
        case '0203':
            obj = {
                en:'fastRepai',
                cn:'换胎'
            };
            break;
        case '0204':
            obj = {
                en:'fastRepai',
                cn:'加水'
            };
            break;
        case '0205':
            obj = {
                en:'fastRepai',
                cn:'搭电'
            };
            break;
        case '0206':
            obj = {
                en:'fastRepai',
                cn:'换电瓶'
            };
            break;
        case '0207':
            obj = {
                en:'fastRepai',
                cn:'充气'
            };
            break;
        case '0208':
            obj = {
                en:'fastRepai',
                cn:'开锁'
            };
            break;
        case '0209':
            obj = {
                en:'fastRepai',
                cn:'送钥匙'
            };
        case '0210':
            obj = {
                en:'fastRepai',
                cn:'代驾'
            };
        case '0211':
            obj = {
                en:'fastRepai',
                cn:'年审'
            };
        case '0212':
            obj = {
                en:'fastRepai',
                cn:'保养'
            };
            break;
        case '0213':
            obj = {
                en:'fastRepai',
                cn:'技术支持'
            };
            break;
        case '0214':
            obj = {
                en:'fastRepai',
                cn:'查勘理赔'
            };
            break;
        case '0215':
            obj = {
                en:'fastRepai',
                cn:'喷漆补漆'
            };
            break;
        case '0216':
            obj = {
                en:'fastRepai',
                cn:'代缴代办'
            };
            break;
        default:
            if(code && code.indexOf('02') == 0){
                obj = {
                    en:'fastRepai',
                    cn:''
                }
            }else{
               obj = {} 
            }

            break;

    };

    return obj;

}

util.matchAllNameForVTable = function(name,val,obj){

    var fetchFromBackEnd = function(idVal,_obj){
        
        if(_obj && _obj[idVal]){
            return _obj[idVal];
        }
        return idVal;
    }
    var filterList = {
        orderStartTime:{
            title:"开始时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        orderEndTime:{
            title:"结束时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        startShareActionTime:{
            title:"开始时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        endShareActionTime:{
            title:"结束时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        startTime:{
            title:"开始时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        endTime:{
            title:"结束时间",
            content:new Date(val).Format("yyyy-MM-dd hh:mm")
        },
        source:{
            title:"订单来源",
        },
        customerId:{
            title:"选择客户",
            content:fetchFromBackEnd(val,obj)
        },
        jobType:{
            title:"业务类型",
            list:{
                "01":"拖车",
                "02":"快修",
                "03":"商品车托运",
                "04":"困境救援",
                "05":"地库牵引",
                "0201":"抢修",
                "0202":"送燃料",
                "0203":"换胎",
                "0204":"加水",
                "0205":"搭电",
                "0206":"换电瓶",
                "0207":"充气",
                "0208":"开锁",
                "0209":"送钥匙",
                "0210":"代驾",
                "0211":"年审",
                "0212":"保养",
                "0213":"技术支持",
                "0214":"勘察理赔",
                "0215":"喷漆补漆",
                "0216":"代缴代办"

            }
        },
        orderStatus:{
            title:"订单状态",
            content:util.matchOrderStatus(val,obj)
        },

        startScheduleTimeSetOff:{
            title:"开始时间",   
        },
        endScheduleTimeSetOff:{
            title:"结束时间",
        },
        orgId:{
            title:"公司",
            content:fetchFromBackEnd(val,obj)
        },
        otherOrgId:{
            title:"公司",
            content:fetchFromBackEnd(val,obj)
        },
        settleMethod:{
            title:"结算方式",
            list:{
                "CASH":"现金",
                "SIGN":"签单",
                "HELPBUY":"代付",
                "OTHER":"其他"
            }
        },
        jobStatusDetail:{
            title:"任务状态",
            list:{
                "ACCEPTED":"接受",
                "REJECTED":"拒绝",
                "DISPATCHED":"派单",
                "TIMEOUT":"超时未接受",
                "SET_OFF_TO_INCIDENT_SPOT":"出发去救援地",
                "PAUSED":"暂停",
                "RESUME":"继续",
                "ARRIVE_AT_INCIDENT_SPOT":"到达救援地",
                "START_RSA":"路修，或现场施救/装车中",
                "FINISH_RSA":"完成施救/装车/路修",
                "DRIVING_TO_DESTINATION_LOCATION":"行驶去目的地/交车地/卸车地",
                "ARRIVED_AT_DESTINATION_LOCATION":"到达目的地",
                "UNLOADING":"开始卸车",
                "FINISH_UNLOADING":"完成卸车",
                "JOB_DONE":"已经完工",
                "RETURNING":"返程中",
                "RETURN_DONE":"返程结束，到达返程地",
                "JOB_CANCELLED":"订单被取消",
                "TAKEPHOTO":"拍照",
                "EXPIRED":"过期"
            }
        },
        jobStatusOverall:{
            title:"任务结果",
            list:{
                "NOT_START":"未开始",
                "WORKING":"救援中",
                "SUCCESS":"救援成功",
                "FAILED":"救援失败",
                "CANCEL_CHARGABLE":"取消有费",
                "CANCEL_NOFEE":"取消无费",
                "REJECTED":"拒绝",
                "EXPIRED":"过期"
            }
        },
        confirmedResult:{
            title:"核算状态",
            list:{
                "NA":"未核算",
                "ACCEPTED":"已核算"
            }
        },
        finReconType:{
            title:"对账单类型",
            list:{
                "CUSTOMER":"客户",
                "PROVIDER":"服务商",
                "DELEGATE":"委派商"
            }
        },
        customerType:{
            title:"客户类型",
            list:{
                "platform":"平台",
                "broker":"网派商",
                "repair_shop":"修理厂",
                "4s_shop":"4S店",
                "personal":"个人"
            }
        },
        delegate:{
            title:"委派商",
            content:fetchFromBackEnd(val,obj)
        },
        providerId:{
            title:"服务商名称",
            content:fetchFromBackEnd(val,obj)
            
        },
        partnerId:{
            title:"客户",
            content:fetchFromBackEnd(val,obj)
            
        },
        payMethod:{
            title:"付款方式",
            list:{
                "CASH":"现金",
                "TRANSFER":"银行转账",
                "WIRE":"电汇",
                "CHECK":"支票"
            }
        },

        companyType:{
            title:"客户类型",
            list:{
                "platform":"平台",
                "broker":"网派商",
                "repair_shop":"修理厂",
                "4s_shop":"4S店",
                "personal":"个人"
            }
        },
        customerCoorperationStatus:{
            title:"客户状态",
            list:{
                "FOLLOWING":"跟进中",
                "UNDER_CONTRACT":"已经合作或签约",
                "NONE":"未合作",
                "STOP":"停止合作"
            }
        },
        hrEmployeeIdOwner:{
            title:"归属员工",
            content:fetchFromBackEnd(val,obj)
        },
        settlementMethod:{
            title:"结算方式",
            list:{
                "CASH":"现金",
                "SIGN":"签单",
                "HELPBUY":"代付",
                "OTHER":"其他"
            }
        },
        partnershipStatus:{
            title:"伙伴关系状态",
            list:{
                "NONE":"未建立",
                "BROKEN":"解除伙伴关系",
                "MY_SERIVCE_PROVIDER":"我的服务商",
                "PEERS_SERVICE_PROVIDER":"是对方的服务商",
                "PARTNER":"双方的服务商"
            }
        },
        sysOrgId:{
            title:"公司",
            content:fetchFromBackEnd(val,obj)   
        },
        deptId:{
            title:"部门",
            content:fetchFromBackEnd(val,obj)   
        },
        positionId:{
            title:"职位",
            content:fetchFromBackEnd(val,obj)   
        },
        gender:{
            title:"性别",
            list:{
                M:"男",
                F:"女",
                O:"其他"
            }   
        },
        pageSize:{
            title:"每页显示条目"
        },
        pageIndex:{
            title:"当前页码"
        },
        driverId:{
            title:"救援技师",
            content:fetchFromBackEnd(val,obj)
        },
        towTruckCatId:{
            title:"车辆类型",
            content:fetchFromBackEnd(val,obj)

        },
        plateColor:{
            title:"蓝黄牌",
            list:{
                "BLUE":"蓝牌",
                "YELLOW":"黄牌",
                "OTHER":"其他"
            }
        },
        parkingLotId:{
            title:"驻车点",
            content:fetchFromBackEnd(val,obj)
        },
        shareStatus:{
            title:"分享状态",
            content:util.matchShareStatus(val)
        },
        orderNo:{title:"伙伴编号"},
        isActive:{
            title:"状态",
            content:(val?"启用中":"停用")
    },
        orderCode:{title:"订单编号"},
        carOwnerPhone:{title:"车主电话"},
        plateNo:{title:"故障车牌号"},
        routeId:{title:"行程编号"},
        caseNo:{title:"案件号"},
        finReconciliationId:{title:"对账单编号"},
        invoiceNo:{title:"发票号"},
        case:{title:"财务号"},
        code:{title:"客户编号"},
        empName:{title:"员工姓名"},
        employeeNo:{title:"车辆编号/具体地址"}

    }
    if(typeof filterList[name] === "undefined"){
        filterList[name] = {title:name};
    }
    var _obj = {
        theKey:filterList[name].title? filterList[name].title : name,
        theValue:filterList[name].list? (filterList[name].list[val]?filterList[name].list[val]:val) : (filterList[name].content?filterList[name].content:val)
    }
    return _obj;
}


util.matchQuickSearchForVTable = function(name){
    // var quickSearchList = {
    //             towTruckCatId:"车辆类型",
    //             plateColor:"蓝黄牌",
    //             parkingLotId:"驻车点",
    //             isActive:"状态",
    //             orderCode:"订单编号",
    //             carOwnerPhone:"车主电话",
    //             plateNo:"故障车牌号",
    //             routeId:"行程编号",
    //             caseNo:"案件号",
    //             finReconciliationId:"对账单编号",
    //             invoiceNo:"发票号",
    //             case:"财务号",
    //             code:"客户编号",
    //             empName:"员工姓名",
    //             employeeNo:"车辆编号/具体地址"
    // }
    // return quickSearchList[name];
    switch(name,val){
        case "towTruckCatId": name = "车辆类型";break;
        case "plateColor": name = "蓝黄牌";break;
        case "parkingLotId": name = "驻车点";break;
        case "isActive": name = "状态";break;
        case "orderCode": name = "订单编号";break;
        case "carOwnerPhone": name = "车主电话";break;
        case "plateNo": name = "故障车牌号";break;
        case "routeId": name = "行程编号";break;
        case "caseNo": name = "案件号";break;
        case "finReconciliationId": name = "对账单编号";break;
        case "invoiceNo": name = "发票号";break;
        case "case": name = "财务号";break;
        case "code": name = "客户编号";break;
        case "empName": name = "员工姓名";break;
        case "employeeNo": name = "车辆编号/具体地址";break;
    }
    return {
        theKey:name,
        theValue:val
    }
}

util.getDate = function(type){
    var now = new Date(); //当前日期 
    var nowDayOfWeek = now.getDay(); //今天本周的第几天 
    var nowDay = now.getDate(); //当前日 
    var nowMonth = now.getMonth(); //当前月 
    var nowYear = now.getYear(); //当前年 
    nowYear += (nowYear < 2000) ? 1900 : 0; //

    var lastMonthDate = new Date(); //上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
    var lastYear = lastMonthDate.getYear();
    var lastMonth = lastMonthDate.getMonth();

    let time = {};

    function getWeek(){

        let time = {}
        //获得本周的开始日期 
        let day = nowDay - 7;
        let Month = nowMonth;

        if(day < 0 ){
            --Month;
            day = new Date(nowYear,Month,0).getDate() - Math.abs(day);
        }

        time.StartDate =  formatDate( new Date(nowYear, Month, day) ) ; 

        //获得本周的结束日期 
        time.EndDate =  formatDate( new Date(nowYear, nowMonth, nowDay ) ) ; 

        return  time

    }

    function getDay(){

        let time = {}
        //获得本月的开始日期 
        time.StartDate =  formatDate( new Date() ) ; 

        //获得本月的结束日期 
        time.EndDate =  formatDate( new Date() ) ; 

        return  time
    }

    function getMonth(){

        let Month = nowMonth;
        //获得本月的开始日期 
        time.StartDate =  formatDate( new Date(nowYear,--Month, nowDay) ) ; 

        //获得本月的结束日期 
        time.EndDate =  formatDate( new Date(nowYear, nowMonth, nowDay ) ) ; 

        return  time
    }

    function getLastMonth(){

        //获得上月开始时间
        time.StartDate =  formatDate( new Date(nowYear, lastMonth, 1) ) ; 

        //获得上月结束时间
        time.EndDate =  formatDate( new Date(nowYear, lastMonth, getMonthDays(nowYear,lastMonth))  ); 

        return  time
    }

    function getQuart(){

        let Month = nowMonth;
        //获得本季度的开始日期 
        time.StartDate =  formatDate( new Date(nowYear, Month-2, nowDay )  ); 

        time.EndDate =  formatDate( new Date(nowYear, nowMonth, nowDay )  ) ; 

        return  time
    }
    console.log(type)
    switch (type){
        case 'DAY':
            return getDay();
        break;
        case 'WEEK':
            return getWeek();
        break;
        case 'MONTH':
            return getMonth();
        break;
        case 'LAST_MONTH':
            return getLastMonth();
        break;
        case 'QUART':
            return getQuart();
        break;
    }


};

//传入时间范围获取时间戳
util.getRange = function(range,startName = "start",endName = "end"){

                let endTime = new Date().setHours(23,59,59,999),
                    startTime = new Date().setHours(0,0,0,0),
                    startDate = (()=>new Date(startTime))();

                switch(range.toUpperCase()){
                    case "TODAY":{
                      //ignore  
                    };break;
                    case "NXWEEK":{
                        endTime = new Date(endTime).setDate(new Date().getDate() + 7)
                    };break;
                

                    case "WEEK":startTime = startDate.setDate(startDate.getDate() - 7)         ;break;             
                    case "PREWEEK":startTime = startDate.setDate(startDate.getDate() - 7)      ;break;
                    case "MONTH":startTime = startDate.setMonth(startDate.getMonth() - 1)      ;break;
                    case "TRIPLEMON":startTime = startDate.setMonth(startDate.getMonth() - 3)  ;break;
                    case "YEAR":startTime = startDate.setFullYear(startDate.getFullYear() - 1) ;break;
                }

                

                return {
                    [startName]:startTime,
                    [endName]:endTime
                }
            }


//格式化日期：yyyy-MM-dd 
function formatDate(date) { 
    var myyear = date.getFullYear(); 
    var mymonth = date.getMonth()+1; 
    var myweekday = date.getDate(); 
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    if(mymonth < 10)mymonth = "0" + mymonth; 
    if(myweekday < 10)myweekday = "0" + myweekday; 
    if(hour < 10)hour = "0" + hour; 
    if(minute < 10)minute = "0" + minute; 
    if(seconds < 10)seconds = "0" + seconds; 
    return (myyear+"-"+mymonth + "-" + myweekday); 
} 

//获得某月的天数 
function getMonthDays(nowYear,myMonth){ 
    var monthStartDate = new Date(nowYear, myMonth, 1); 
    var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
    return days; 
}

//获得本季度的开始月份 
function getQuarterStartMonth(nowMonth){ 
    var quarterStartMonth = 0; 
    if(nowMonth<3)quarterStartMonth = 0; 

    if(2<nowMonth && nowMonth<6)quarterStartMonth = 3; 

    if(5<nowMonth && nowMonth<9)quarterStartMonth = 6; 

    if(nowMonth>8)quarterStartMonth = 9; 

    return quarterStartMonth; 
} 




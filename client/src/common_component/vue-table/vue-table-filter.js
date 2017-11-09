function transformation(obj, item){
    const _this = this;
    let content = item[obj.field];
    if(!obj.filter){
        return content;
    }else if(obj.filter == 'date'){
        return content ? util.getLocalTime(content,obj.param) : '';
    }else if(obj.filter == 'age'){
        let today = new Date();
        if(!content) return '';
        let age = Math.floor((today.getTime() - content) / (365.25 * 24 * 60 * 60 * 1000)) ;
        return age;
    }else if(obj.filter == 'remark'){
        let str = ''
        content.forEach(function(item,index){
            if(item.commentType == 'TEXT')str += (item.comment ? item.comment : '') + ' '
        });
        return str;
    }else if(obj.filter == 'confirmedResult'){
        let gender = '';
        switch(content){
            case 'NA': gender = '未核算'; break;
            case 'ACCEPTED': gender = '已核算'; break;
        }
        return gender;
    }else if(obj.filter == 'gender'){
        let gender = '';
        switch(content){
            case 'M': gender = '男'; break;
            case 'F': gender = '女'; break;
            case 'O': gender = '其它'; break;
        }
        return gender;
    }else if(obj.filter == 'gps'){
        return item.gps[obj.field];
    }else if(obj.filter == 'arr.role'){
        let str = item.isAdmin ? '系统管理员、' : '';

        if(!content) return '';
        content.forEach(function(el,index){
            str += el.name + '、';
        });
        return str.substr(0,str.length-1) 
    }else if(obj.filter == 'status'){
        switch(content){
            case true: return '启用中';break;
            case false: return '停用';
        }
    }else if(obj.filter == 'obj'){
        const arr = obj.field.split('.');
        return item[ arr[0] ] ? item[ arr[0] ][ arr[1] ] : '';
    }else if(obj.filter == 'arr.company'){
        console.log(item);
        return item.changeInfo ? item.changeInfo[0]['companyName'] : "";
    }else if(obj.filter == 'arr.status' || obj.filter == 'arr' || obj.filter == 'arr.isCustomer' ||  obj.filter == 'arr.partnerInfo.orgInfo' || obj.filter == 'arr.finReconType' ){
        const arr = obj.field.split('.');

        var str = '';
        if(obj.filter == 'arr.isCustomer'){
            if(item[obj.field] == 'CUSTOMER'){
                str = '客户';
            }else if(item[obj.field] == 'DELEGATE'){
                str = '委派商';
            }else{
                str = '服务商';
            }
            return str;
        }
        if(obj.filter == 'arr.partnerInfo.orgInfo'){
            if(!item['partnerInfo']){
                return '';
            }
            if(item.customerId){
                for(var i = 0 ; i< item['partnerInfo'].length;i++){
                    if(item['partnerInfo'][i]['partnerId'] == item.customerId){
                        return  item['partnerInfo'][i]['name'];
                    }
                }
            }else{
                if(!item['orgInfo'])return ''
                for(var i = 0 ; i< item['orgInfo'].length;i++){
                    if(item['orgInfo'][i]['orgId'] == item.orgId){
                        return  item['orgInfo'][i]['name'];
                    }
                }
            }
        }
        if(obj.filter == 'arr.finReconType'){
            if(item.finReconType == 'CUSTOMER'){
                for(var i = 0 ; i< item['partnerInfo'].length;i++){
                    if(item['partnerInfo'][i]['partnerId'] == item.sysPartnerId){
                        return  item['partnerInfo'][i]['name'];
                    }
                }
            }else {
                if(!item['orgInfo'])return ''
                for(var i = 0 ; i< item['orgInfo'].length;i++){
                    if(item['orgInfo'][i]['orgId'] == item.orgId){
                        return  item['orgInfo'][i]['name'];
                    }
                }
            }
        }
        if(obj.filter == 'arr.finReconType'){
            for(var i = 0 ; i< item['partnerInfo'].length;i++){
                if(item['partnerInfo'][i]['partnerId'] == item.sysPartnerId){
                    return  item['partnerInfo'][i]['name'];
                }
            }
        }
        if(obj.filter == 'arr'){
            let str = '';
            if(item[obj.info]){
                item[obj.info].some( (user, index ) => {
                    if(user[obj.uuid] == content){
                        str = user[obj.returnName];
                        return true;
                    }
                });
            }
            return str;
        }
        //针对对象内部的字段
        if(obj.filter == 'arr.status'){
            content.some( (user, index ) => {
                
                if(obj.type == user[obj.returnField]){
                    str = user[obj['returnName']];
                    if(obj['returnName'] == 'actionTime'){
                        str = util.getLocalTime(str) ;
                    }
                    return true;
                }
            });
            
            return str;    
        }



        if(arr.length == 4){
            for(var i = 0 ; i< item[arr[1]].length;i++){
                if(item[arr[1]][i][arr[2]] == item[arr[0]]){
                    return item[arr[1]][i][arr[3]]
                }
            }
            return '';
        }else{
            return item[ arr[0] ] ? item[ arr[0] ][0][ arr[1] ] : '';
        }
        return str;
    }else if(obj.filter == 'tooltip'){
        if(!content) return '';
        const str = '<p style="margin:0;" class="setWidth" data-toggle="tooltip" data-placement="top" title="' + content +'">'+ content +'</p>';
        return str;
    }else if(obj.filter == 'orderStatus' || obj.filter == 'orderStatus_icon'){
        return util.matchOrderStatus(content,obj.filter);
    }else if(obj.filter == 'jobStatus'){
        return util.matchTackStatus(content);
    }else if(obj.filter == 'jobResult'){
        return util.matchJobResult(content);
    }else if(obj.filter == 'jobType'){
        return util.matchRescueType(content).cn;
    }else if(obj.filter == 'shareStatus'){
        return util.matchShareStatus(content);
    }else if(obj.filter == 'plateColor'){
        switch(content){
            case 'YELLOW': return '黄牌'; break;
            case 'BLUE': return '蓝牌'; break;
            case 'OTHER': return '其他'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'payMethod'){
        switch(content){
            case "CASH": return '现金'; break;
            case "TRANSFER": return '银行转账'; break;
            case "WIRE": return '电汇'; break;
            case "CHECK": return '支票'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'settleMethod'){
        content = content ? content.toUpperCase() : "" ;
        switch(content){
            case "CASH": return '现金'; break;
            case "SIGN": return '签单'; break;
            case "HELPBUY": return '代付'; break;
            case "OTHER": return '其他'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'customerCoorperationStatus'){ 
        content = content ? content.toUpperCase() : "" ;
        switch(content){
            case "FOLLOWING": return '跟进中'; break;
            case "UNDER_CONTRACT": return '已经合作或签约'; break;
            case "NONE": return '未合作'; break;
            case "STOP": return '停止合作'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'partnershipStatus'){
        content = content ? content.toUpperCase() : "" ;
        switch(content){
            case "NONE": return '未建立'; break;
            case "BROKEN": return '解除伙伴关系'; break;
            case "MY_SERIVCE_PROVIDER": return '我的服务商'; break;
            case "PEERS_SERVICE_PROVIDER": return '是对方的服务商'; break;
            case "PARTNER": return '双方的服务商'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'carStatus'){
        content = content ? content.toUpperCase() : "" ;
        switch(content){
            case "BUSY": return '忙'; break;
            case "FREE": return '空闲'; break;
            case "MAINTENANCE": return '维修中'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'companyType'){
        content = content ? content.toLowerCase() : "" ;
        switch(content){
            case "platform": return '平台'; break;
            case "broker": return '网派商'; break;
            case "repair_shop": return '修理厂'; break;
            case "4s_shop": return '4S店'; break;
            case "personal": return '个人'; break;
            default: return ""; break;
        }
    }else if(obj.filter == 'jobStatusOverall'){
        content = content ? content.toUpperCase() : "" ;
        // console.log("救援结果",content)
        switch(content){
            case "NOT_START": return '未开始'; break;
            case "WORKING": return '救援中'; break;
            case "SUCCESS": return '救援成功'; break;
            case "FAILED": return '救援失败'; break;
            case "CANCEL_CHARGABLE": return '取消有费'; break;
            case "CANCEL_NOFEE": return '取消无费'; break;
            case "EXPIRED": return '过期'; break;
            default: return content; break;
        }
    }else if(obj.filter == 'needArr' || obj.filter == 'needArr_2'){
        let result = '';

        const needArr = obj.filter == 'needArr' ?  _this.needArr : _this.needArr_2;
        needArr.some((value, index) => {
            if(value[obj.filterName] == content){
                result = value[obj.needName];
                return true;
            }
        });
        return result;
    }else if(obj.filter == 'serialNumberCodeName'){
        switch(content){
            case 'ORDER':return '订单'; break;
            case 'EMP':return '员工'; break;
            case 'JOB':return '任务'; break;
            case 'CAR':return '车辆'; break;
            case 'TENANT':return '租户'; break;
            case 'RECONCILIATION':return '对账单号'; break; 
            case 'PAYMENT':return '付款单号'; break;
            case 'RECEIVABLES':return '收款单号'; break;
            case 'RESCUED_CAR_MODEL':return '被救车型编号'; break;
            case 'RESCUE_CAR_MODEL':return '救援车型编号'; break;
            case 'ROUTE':return '行程编号'; break;
            default: return ''
        }
    }else if(obj.filter == 'serialNumberScope'){
        switch(content){
            case 'PLATFORM': return  '平台'; break;
            case 'TENANT': return  '租户'; break;
            case 'ORG': return  '公司'; break;
            default: return ''
        }
    }else if(obj.filter == 'serialNumberYearBased'){
        if(item.yearBased){
            return  '年';
        }else if(item.yearMonthBased){
            return  '年月';
        }else if(item.yearMonthDayBased){
            return  '年月日';
        }else{
            return  '';
        }
    }else if(obj.filter == 'whether'){
        switch (content) {
            case true:
                return '是'
                break;
            default:
                return '否'
                break;
        }
    }else if(obj.filter == 'toSysTenantType'){
        switch(content){
            case 'VENDOR': return '救援服务商';break;
            case 'CUSTOMER': return '客户';break;
            case 'UNION': return '联合体';break;
        }
    }else if(obj.filter == 'toSysTenantStatus'){
        switch(content){
            case 'PENDING': return '等待审核';break;
            case 'APPROVED': return '已经审核';break;
            case 'REJECTED': return '拒绝';break;
        }
    }else if(obj.filter == 'rescueVehicleModel'){
        let str = ''
        const typeModels = [ { name: '折叠式平板', code: 'FOLD_FLAT' }, { name: '落地式平板', code: 'FLOOR_FLAT' }, { name: '随车吊平板', code: 'CRANE_FLAT' }, { name: '轻型托吊', code: 'LIGHT_CRANE' }, { name: '中型托吊', code: 'MIDDLE_CRANE' }, { name: '重型托吊', code: 'HEAVY_CRANE' }, { name: '旋转型', code: 'ROTARY_CRANE' }, { name: '斜板拖车', code: 'RAMP_TRAILER' }, { name: '快修小车', code: 'FAST_REPAIR' }, { name: '叉车', code: 'FORKLIFT' }, { name: '其他', code: 'OTHER' } ];
       typeModels.some( (typeModel, index) => {
            if(typeModel.code == content){
                str = typeModel.name;
                return true;
            }
        });
       if(!bool) str = '';
       return str;
    }else if(obj.filter == 'serviceItemResp'){
        if(!content) return '';
        const arr = content.map( (obj, index) => {
            return obj.name;
        });
        return '<p style="margin:0;" class="setWidth" data-toggle="tooltip" data-placement="top" title="' + arr.join('、') +'">'+ arr.join('、') +'</p>';
    }else if(obj.filter == 'switchType'){
        switch(content){
            case 'REMOVE': return '解绑';
            case 'BINDING': return '绑定';
        }
    }else if(obj.filter == 'taskTripStatus'){
        return util.taskTripStatus(content);
    }else if(obj.filter == 'supplierInvitedStatus'){
        switch(content){
            case 'UNTREATED': return '未处理';
            case 'CANCELED': return '取消';
            case 'ACCEPTED': return '接受'
            case 'REJECTED': return '拒绝';
        }
    }else if(obj.filter == 'checkStatus'){
        switch(content){
            case 'CHECKED': return '已经审核';
            case 'REJECTED': return '拒绝';
            case 'NON_CHECKED': return '未审核';
        }
    }else if (obj.filter == 'setOutExpense' || obj.filter == 'returnExpense'){
        let keyName = obj.filter == 'setOutExpense'?'setOutExpense':obj.filter == 'returnExpense'?'returnExpense':'';
        let val = "",sum = 0;

        if(item[keyName] !== null && JSON.stringify(item[keyName])!=="{}"){
            item[keyName].forEach(function(data,index){

                let aCash = data.amountCash==null?'0':data.amountCash
                let aSign = data.amountSign==null?'0':data.amountSign
                sum += Number(aCash) + Number(aSign)
                val += `${data.codeName}(现金):${aCash}(${data.payTarget == 'COMPANY' ? "公司" : "客户"}) 
                <br style='mso-data-placement:same-cell;'/>
                ${data.codeName}(签单):${aSign}(${data.payTarget == 'COMPANY' ? "公司" : "客户"})  
                <br style='mso-data-placement:same-cell;'/>
                `
            });

            val+=  val ?  `总计：${sum}元` : '';

            // for(let i in item[keyName]){
            //     let aCash = item[keyName][i].amountCash==null?'0':item[keyName][i].amountCash
            //     let aSign = item[keyName][i].amountSign==null?'0':item[keyName][i].amountSign
            //     sum += Number(aCash) + Number(aSign)
            //     val += `${item[keyName][i].codeName}(现金):${aCash}
            //     ${item[keyName][i].codeName}(签单):${aSign}
            //     `
                
            // }
        }
        val = val.trim().replace("\n", String.valueOf("(char)10") ); 
        return val;
    }else if(obj.filter == 'number'){
        const result = Number(content);
        return result ? result : 0;
    }else if(obj.filter == 'settleStatus'){
        switch(content){
            case 'SQUARE_UP': return "<p style='color:blue'>结清</p>";
            case 'BILLS_DUE': return '欠账';
        }
    }else if(obj.filter == 'notReceivedTotalAmt'){
        if(content > 0){
            return `<p style='color:red;font-weight:bold'>${content}</p>`
        }
    }else if(obj.filter == 'PARTIAL_PAYMENT'){
        switch(content){
            case 'NO_PAYMENT': return "未结算";
            case 'PARTIAL_PAYMENT': return '部分结算';
            case 'FULL_PAYMENT': return '全部结算';
        }
    }else if(obj.filter == 'wechat_type'){
        switch(content){
            case 'PERSONAL': return "个人";
            case 'CUSTOMER': return '客户';
            default : return ""
        }
    }
}

export default { transformation }
import userOnline_page from "./userOnline-page.js";
import orderOnlineStatus from "./orderOnlineStatus.js";
const echarts = require('../../../../../static/js/echarts.min.js');

export  function userOnline (dom){

    let  el = document.getElementById(dom);
    let  myChart = echarts.init(el)
    let url = 'control:/online/heartbeat/org_service_provider';


    if(global.user_info && global.user_info.orgInfo && global.user_info.orgInfo.code === "wshuttle"){
        url = 'control:/online/heartbeat/sys/online/total';
    }
    send({
        type:'get',
        url:url
    },function(err,res){
        console.log(err,res)
        if(err)return alert('服务器出错请联系管理员');
        if(res.status == 200){
            console.log(res);


            const data = userOnlineDataHandle(res.content);

            console.log(data);

            myChart.setOption( userOnline_page.changDate(data) );

           

            listEvent.sub(`org-online-total-${global.tenantId}-${global.ourOrgId}`,function(data){

                const content = data.content[0].content;
                if(!content)return;

                myChart.setOption( userOnline_page.changDate( userOnlineDataHandle(content) ) );
            });

        }else{
            alert(res.msg);
        }        
    });

};


function userOnlineDataHandle(content){
    if(!content)return console.log(content)
    let orgNames = content.map((item)=> item.orgName);

    let WEB = content.map((item)=>{

        let num = 0;

        item.platformList.forEach((item1)=>{
            if(item1.platform === "WEB"){
                num =  item1.onlineNumber;
            }
        });
        return num;
    });

    let APP = content.map((item)=>{

        let num = 0;

        item.platformList.forEach((item1)=>{
            if(item1.platform === "APP"){
                num =  item1.onlineNumber;
            }
        });
        console.log(num);
        return num;
    });

    return {
        orgNames:orgNames,
        WEB:WEB,
        APP:APP
    };
};


export function orderStatusOnline(dom){

    let  el = document.getElementById(dom);
    let  myChart = echarts.init(el);
    
    send({
        type:'get',
        url:'control:/order/monitor/total'
    },function(err,res){
        if(err)return alert('服务器出错请联系管理员');
        if(res.status == 200){
            console.log(res);
            let content =  res.content[0];

            let data = orderOnlineStatusDataHandle(res.content[0]);

            if(res.content.length)  myChart.setOption( orderOnlineStatus.changDate(data)  );


            listEvent.sub(`org-order-monitor-status-total-${global.tenantId}-${global.ourOrgId}`,function(data1){

                console.log("收到数据",data1);
                let content = data1.content[0].content;
                
                if(!content)return;

                myChart.setOption(  orderOnlineStatus.changDate ( orderOnlineStatusDataHandle(content[0],data) )  );
            });

        }else{
            alert(res.msg);
        }        
    });

}

function orderOnlineStatusDataHandle(content,data){
    if(!content)return console.log(content);
    let opt = data ? data : {series:[],legend:[],xAxis:[]};


    let time = util.getLocalTime(content.time ? content.time :new Date().getTime(),'day');

    if( opt.xAxis.length >= 7  ){
        opt.xAxis.shift();
        opt.xAxis.push(time);
    }else{
        opt.xAxis.push(time);
    }


    for( let i in content){
        let name = '';
        switch(i){
            case 'notAccounted':
                name="未核算的订单";
                break;
            case 'notDispatchedNumber':
                name='未派遣的订单';
                break;
            case 'rescueNumber':
                name='救援中的订单';
                break;
        };

        if( opt.xAxis.length >= 7   ){
            
            opt.series.forEach((item,index)=>{
                if(item.data.length >= 7 && item.name === name ){
                    item.data.shift();
                    item.data.push(content[i]);
                }else if(item.name === name ){
                    item.data.push(content[i]);
                }
            });


        }else{

            if(name){

                if(opt.legend.indexOf(name) == -1) opt.legend.push(name);

                let bool = false;

                for(let g = 0 ; g< opt.series.length;g++){

                    if(opt.series[g].name === name){
                        opt.series[g].data.push(content[i]);
                        bool = true;
                    }
                }
                if(!bool){
                    opt.series.push({
                        name:name,
                        type:'line',
                        data:[content[i]]
                    });
                }

                if(!opt.series.length){
                    opt.series.push({
                        name:name,
                        type:'line',
                        data:[content[i]]
                    });
                }
            }
            
        }


    };





    console.log(opt);
    return opt;

};

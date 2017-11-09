import rescueArea from "../assets/cars/rescueArea.png";
import destinationArea from "../assets/cars/destinationArea.png";
import parkinglot from "../assets/cars/parkinglot.png";

let Marker,
    currentCity,
    placeSearch,
    i=0,
    icon,
    label,
    info,
    map,
    marker=[],
    windowsArr =[],
    nearbyVehicles,
    accidentTos,
    destinationTos,
    infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -26),autoMove:false,isCustom:true}) ,
    mark,
    res_add = '设置为事故地',
    des_add = '设置为目的地',
    geocoder,
    clearArr = [],
    carMarker="";

function select(e) {
    placeSearch.setCity(e.poi.adcode);
    name=e.poi.name

    placeSearch.search( name,function(status, result){
        map.clearMap();
        if (status === 'complete' && result.info === 'OK') {
             map.clearMap();
             map.clearInfoWindow( );
            var resultArr =  result.poiList.pois,
                d;
            for (var i = 0; i < resultArr.length; i++) {

                d = resultArr[i];
                var lngX = d.location ? d.location.getLng() : d._location.getLng();
                var latY = d.location ? d.location.getLat() : d._location.getLat();
                var provincial = {
                    province:d.pname,
                    city:d.cityname,
                    district:d.cityname,
                    town:d.name
                }
                info =  "<div><b>当前位置:</b>" + d.pname + d.cityname + d.adname + d.name + d.address + "</div>" + 
                        "<div><b>坐标:</b>"+ d.location.lng + "," + d.location.lat   + '</div>' + 
                        click_info(d.pname + d.cityname + d.adname + d.name + d.address,[d.location.lng,d.location.lat],JSON.stringify(provincial));
                addMarker([lngX,latY],info,null); 
                map.setFitView();


                if(i == 0){
                    var element = order_operation.isExtsts_el();

                    if(element){
                        var item = {
                            address:d.pname + d.cityname + d.adname + d.name + d.address,
                            Longitude:d.location.lng + ',' + d.location.lat
                        };
                        process.nextTick(function(){
                            bus.$emit('updataAdress_' + element.id ,global.rescueType,item,provincial );
                        });
                    }
                    

                }
                


            }
          
        }else{
            alert('搜索失败')
        }
    });
}

function addMarkers(markers,obj){
    for(let i in obj_mass){
        if(obj_mass[i].length){
            for (var j = 0; j < obj_mass[i].length; j++) {      //先停止动画，不然会报错；
                obj_mass[i][j].stopMove();
            }
        }
    }

    infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -26),autoMove:false,isCustom:true}); 
    if(markers.constructor != Array)return console.log('添加marker请传入数组');
    if(obj){
        if(obj.clear)map.clearMap();
    }
    if(clearArr.length){
        map.remove(clearArr);
        clearArr = [];


    }
    for(i = 0 ;i<markers.length;i++){
        try{
            let mark = addMarker([markers[i]['x'],markers[i]['y']],markers[i]['str'],markers[i]['label'],markers[i]['content'],markers[i]['direction']);
            mark.setOffset( new AMap.Pixel(-16, -14));
            clearArr.push(mark);  

        }catch(err){
            console.log(err)
        }
    }

}

function addMarker(position,info,label,content,angle){
    if(content && typeof content == 'string'){
        Marker = new AMap.Marker({
            map: map,
            position: [position[0],position[1]],
            angle:angle ? angle : 0,
            autoRotation:true,
            content: content
        });
    }else{
        Marker = new AMap.Marker({
            map: map,
            position: [position[0],position[1]],
        });
    }
    if(info){

        Marker.content = info;
        Marker.on('click', markerClick);
        if(position.open)Marker.emit('click', {target: Marker});

    };
    // if(map.getZoom() > 12) map.setZoom(12);
   
    if(label){
        Marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(0, 20),//修改label相对于maker的位置
            content:  '<div class="labelStyle" >' + label + '</div>',
        });
    }

    return Marker;
};



function addMaker(position,info,icon,label){
    var Marker;
    if(icon){

        let markerObj = {
            image:  icon,
            imageOffset:new AMap.Pixel(10,-34)
        };

        if(location.hash.indexOf('orderDetails') != -1)delete markerObj.imageOffset

        Marker = new AMap.Marker({
            map: map,
            position: position,
            icon: typeof icon == "string" ? icon :  new AMap.Icon(markerObj)
        });
    }else{
       Marker = new AMap.Marker({
        map: map,
        position: position
      });
    }

    if(info){
        infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -40),autoMove:false,isCustom:true}) ;
        Marker.content = info;
        Marker.on('click', markerClick);
        Marker.emit('click', {target: Marker});
    }
   
    if(label){
      Marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
          offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
          content:  '<div class="labelStyle" >' + label + '</div>'
      });
    }

    return Marker;

};



function markerClick(e) {


    if(driving){

        if( e.target.currentOrder ){
            if(driving.rescue && driving.rescue.toString() == [e.target.currentOrder.rescueLng,e.target.currentOrder.rescueLat].toString())return;
            if(driving.destination){
                if(driving.destination.toString() == [e.target.currentOrder.destinationLng,e.target.currentOrder.destinationLat].toString())return;
            }
        }

        driving.clear();
        map.remove(clearDrivingMarker);
    }

    if(e.target.currentOrder &&  (e.target.content.indexOf('在线') != -1) ){
         drivingGPS(e.target.currentOrder,e.target);
    }else{

        let html = `<div id ="map_content">
                    <a href="javascript:;" class="map_close"><span>×</span></a>
                    ${e.target.content}
                </div>`;

        infoWindow.setContent(html);
        infoWindow.open(map, e.target.getPosition());
        clickFn();

     }


    
   
};



function addParamsMark(lnglatXY){
    centerlng(lnglatXY,function(result,info){
        var provincial = {
            province:result.regeocode.addressComponent.province,
            city:result.regeocode.addressComponent.city,
            district:result.regeocode.addressComponent.district,
            town:result.regeocode.addressComponent.township
        }

        info += click_info(result.regeocode.formattedAddress,lnglatXY,JSON.stringify(provincial)) ;
        lnglatXY.open = true;
        infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -40),autoMove:false,isCustom:true}); 

        addMarker(lnglatXY,info); 
        map.setFitView();
    })
};



function regeocoder() {
    var lnglatXY = [map.getCenter().lng,map.getCenter().lat];

    centerlng(lnglatXY,function(result,info){
        var provincial = {
            province:result.regeocode.addressComponent.province,
            city:result.regeocode.addressComponent.city,
            district:result.regeocode.addressComponent.district,
            town:result.regeocode.addressComponent.township
        }
        mark.setPosition(lnglatXY);
        // 设置label标签
        mark.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
            content:    "<div class='labelStyle'>" +  info + click_info(result.regeocode.formattedAddress,lnglatXY,JSON.stringify(provincial))
        });
        clickFn();
    })
};

//下单传值
function clickFn(){
    setTimeout(function(){

        var rescue = document.querySelectorAll('.rescue');
        var destination = document.querySelectorAll('.destination');
        for(var i =0 ;i<rescue.length;i++){
            if(rescue && rescue[i])rescue[i].addEventListener('click',trigger);
            if(destination && destination[i])destination[i].addEventListener('click',trigger);
        }

        var dispatch = document.querySelectorAll('.dispatch');

        for(var i =0 ;i<dispatch.length;i++){
            dispatch[i].index = i;
            dispatch[i].addEventListener('click',function(){
                let data = JSON.parse(dispatch[this.index].getAttribute('item'));
                window.showModel(data);
            });
        }

        var close = document.querySelector('.map_close');
        if(close){
            close.addEventListener('click',function(){
                infoWindow.close();
            });
        }


    },100)
       
}

function click_info(formattedAddress,lnglatXY,provincial){
    var result = {
        address:formattedAddress,
        Longitude:lnglatXY.toString()
    }
    if(des_add){
        return  "<div class='map_click'><a href='javascript:;'  provincia=" + provincial +" result=" + JSON.stringify(result) +" class='accidentTo rescue'>" + res_add +"</a>  " +
            "<a href='javascript:;'   provincia=" + provincial +"  result=" + JSON.stringify(result) +"  class='accidentTo destination'>" + des_add +"</a></div></div>" ;
    }else{
        return  "<div class='map_click'><a href='javascript:;'  provincia=" + provincial +" result=" + JSON.stringify(result) +" class='accidentTo rescue'>" + res_add +"</a>  " ;

    }
};

function trigger(){
    var element = order_operation.isExtsts_el();
    var sclass = $(this).attr('class').split(' ')[1];
    var item = JSON.parse($(this).attr('result'));
    var provincial = $(this).attr('provincia');
    
    provincial = provincial ? JSON.parse(provincial):null;
    var name = element ? 'updataAdress_' + element.id : 'updataAdress';
    bus.$emit(name,sclass,item,provincial );
}

function map_operation(){
    var points = document.querySelectorAll('.point_center');
    var e;

    for(var i = 0 ; i < points.length ;i++){
        points[i].b = true;
        points[i].addEventListener('click',function(){
            if(this.b){
                mark = new AMap.Marker({
                    map: map,
                    position: [map.getCenter().lng,map.getCenter().lat]
                });
                e = AMap.event.addListener( map, 'dragging', regeocoder)
            }else{
                map.remove(mark);
                AMap.event.removeListener(e);

            }
            this.b = !this.b;
        })
    };

};

let obj_mass = {};

function getParking(name,data,isLunxun,ContrastStautsFN){
    if(!data)return;
    if(name == 'clear'){
        for(let i in obj_mass){ 
            map.remove(obj_mass[i]);
        };
        return;
    }
    


    if( ( Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) === "{}" ) ||  (Object.prototype.toString.call(data) === "[object Array]" && !data.length)) {
        obj_mass[name] = obj_mass[name] ? obj_mass[name] :[];
        map.clearInfoWindow();
        map.remove(clearDrivingMarker);
        for (var i = 0; i < obj_mass[name].length; i++) {      //先停止动画，不然会报错；
            obj_mass[name][i].stopMove();
        }
        map.remove(obj_mass[name]); 
        obj_mass[name] = [];
        if(driving)driving.clear();
        if(driving)driving.clear();
        if(driving)driving.clear();
        return
    };

    if(isLunxun){
        if( !obj_mass[name] )return;
        if( !obj_mass[name][data.index])return console.log('车辆没有找到',data.index,obj_mass[name][data.index]);
        if( obj_mass[name][data.index].gpsTerminal !== data.gpsTerminal)return console.log('终端号不匹配',data.index,obj_mass[name][data.index]);

        let item = obj_mass[name][data.index];

        if(data.gpsTerminal === item.gpsTerminal){
            if(! map.getBounds().contains(item.getPosition()))return;         //不在可视区
            if(! map.getBounds().contains([data['lng'],data['lat']]))return;

            let contentHtml = item.content;
           

            let html = `
                <div>车牌号码：${data.carPlate ? data.carPlate : ''}</div>
                <div style="display:none">终端号：${data.gpsTerminal ? data.gpsTerminal : ''}</div>
                <div>车辆来源：${data.source.length ? data.source[0] =='KK_RESCUE' ? '快快平台' : 'ERP平台' : ''}</div>
                <div>空载/重载：${!data.loadStatus ? '空载':data.loadStatus === 1 ? '重载':'不支持'}</div>
                <div>车辆里程：${data.gpsMileage ? data.gpsMileage : 0}</div>
                <div>车辆状态：${data.onlineStatus == 1 ? '在线':'离线'}</div>
                <div>车辆方向：${data.direction ? data.direction:0}</div>
                <div>车辆速度：${data.speed ? data.speed:0}KM/H</div>
                ${data.currentOrder ? `
                    ${data.qrderQuantity  ? `<div>执行单号：${data.qrderQuantity}</div>`:''}
                    <div>正在执行订单号：${data.NewestOQrderNumber}</div>
                    <div>技师反馈：${data.currentOrder.orderCurrentStatus && data.currentOrder.orderCurrentStatus.status ? util.matchTackStatus(data.currentOrder.orderCurrentStatus.status):''}</div>
                    <div>系统检测：${data.currentOrder.systemCurrentStatus && data.currentOrder.systemCurrentStatus.status ? util.matchTackStatus(data.currentOrder.systemCurrentStatus.status):''}</div>
                    ${data.currentOrder.destination ? `<div>目的地：${data.currentOrder.destinationAddress ? data.currentOrder.destinationAddress : ''}</div>` :''}
                    <div>救援地：${data.currentOrder.rescueAddress ? data.currentOrder.rescueAddress : ''}</div>
                `:''}
            `;
            
            var time = contentHtml.match(/\<div\>预计时间：.+\<\/div\>/);
            var distance = contentHtml.match(/\<div\>预计距离：.+\<\/div\>/);

            if(time){
                html += `
                    ${time[0]}
                `;
                html += `
                    ${distance[0]}
                `;
            }

            const infoWindowhtml = `<div id ="map_content">
                <a href="javascript:;" class="map_close"><span>×</span></a>
                ${html}
            </div>`;


            if( infoWindow.getIsOpen() ){
                if((infoWindow.getContent().match(/\<div style="display:none"\>终端号：.+\<\/div\>/)[0].match(/\d+/) ? infoWindow.getContent().match(/\<div style="display:none"\>终端号：.+\<\/div\>/)[0].match(/\d+/)[0].match(/\d+/)[0]:'') === data.terminal){

                    if(data.currentOrder){

                        if(item.formatted_address || data.currentOrder.orderCurrentStatus.status === 'ACCEPTED'){

                            if(item.formatted_address != data.formatted_address){
                                if(infoWindow.getIsOpen()){
                                        drivingGPS(data.currentOrder,item);
                                }
                                item.formatted_address = data.formatted_address;
                            }
                        }else{
                            if(driving){
                                driving.clear();
                                map.remove(clearDrivingMarker);
                            }
                        }
                        infoWindow.setContent( infoWindowhtml );

                    }else{
                        infoWindow.setContent( infoWindowhtml );
                    }
                }
            }


            item.setContent(`<div style="transform:rotate(180deg);" class='amap-icon carStatus  ${ data.onlineStatus == 1  ?  ( data.currentOrder ? data.currentOrder.orderCurrentStatus.status :'FREE') : 'offLine'  }'></div>`);

            item.setAngle(data.direction - 90);


            item.moveAlong(new AMap.LngLat( data['lng'],data['lat']),data.speed ? data.speed:10,function(k){

                if(infoWindow.getIsOpen()){
                    if( (infoWindow.getContent().match(/\<div style="display:none"\>终端号：.+\<\/div\>/)[0].match(/\d+/) ? infoWindow.getContent().match(/\<div style="display:none"\>终端号：.+\<\/div\>/)[0].match(/\d+/)[0].match(/\d+/)[0]:'')  === data.terminal) {
                        infoWindow.setPosition( item.getPosition() );
                        clickFn();
                    }
                }
                return k;
            });

            
            item.content = html;

        }

    }else{

        if(Object.prototype.toString.call(data) === "[object Object]" ){

            let i = '';

            for(i in data ){
                if(data[i]['lng'] && data[i]['lat']){
                    let html = `
                        <div>车牌号码：${data[i].carPlate ? data[i].carPlate : ''}</div>
                        <div style="display:none">终端号：${data[i].gpsTerminal ? data[i].gpsTerminal : ''}</div>
                        <div>${data[i].source.length ? data[i].source[0] =='KK_RESCUE' ? '快快平台' : 'ERP平台' : ''}</div>
                        <div>空载/重载：${!data[i].loadStatus ? '空载':data[i].loadStatus === 1 ? '重载':'不支持'}</div>
                        <div>车辆里程：${data[i].gpsMileage ? data[i].gpsMileage : 0}</div>
                        <div>车辆状态：${data[i].onlineStatus == 1 ? '在线':'离线'}</div>
                        <div>车辆方向：${data[i].direction ? data[i].direction:0}</div>
                        <div>车辆速度：${data[i].speed ? data[i].speed:0}KM/H</div>
                        ${ data[i].currentOrder ? `
                            ${data[i].qrderQuantity  ? `<div>执行单号：${data[i].qrderQuantity}</div>`:''}
                            <div>正在执行订单号：${data[i].NewestOQrderNumber}</div>
                            <div>技师反馈：${data[i].currentOrder.orderCurrentStatus && data[i].currentOrder.orderCurrentStatus.status ? util.matchTackStatus(data[i].currentOrder.orderCurrentStatus.status):''}</div>
                            <div>系统检测：${data[i].currentOrder.systemCurrentStatus && data[i].currentOrder.systemCurrentStatus.status ? util.matchTackStatus(data[i].currentOrder.systemCurrentStatus.status):''}</div>
                            ${data[i].currentOrder.destination ? `<div>目的地：${data[i].currentOrder.destinationAddress ? data[i].currentOrder.destinationAddress : ''}</div>` :''}
                            <div>救援地：${data[i].currentOrder.rescueAddress ? data[i].currentOrder.rescueAddress : ''}</div>
                        `:''}
                    `;

                    let content = `<div style="transform:rotate(180deg);" class='amap-icon carStatus  ${  data[i].onlineStatus == 1  ?  ( data[i].currentOrder ? data[i].currentOrder.orderCurrentStatus.status :'FREE') : 'offLine' }'></div>`


                    const mark = addMarker([data[i]['lng'],data[i]['lat']],html,'',content,data[i]['direction'] - 90);
                    mark.gpsTerminal = data[i].gpsTerminal ;
                    mark.currentOrder = data[i].currentOrder ;
                    mark.formatted_address = data[i].formatted_address ;

                    // setOffset
                    mark.setOffset( new AMap.Pixel(-16, -10) );
                    infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -26),autoMove:false,isCustom:true}); 


                    if(!obj_mass[name])obj_mass[name] = [];
                    obj_mass[name].push( mark );
                    map.setFitView();
                };
            }

        }else{
            data.forEach(function(it,index){

                if(it['x'] && it['y']){
                    if(!obj_mass[name])obj_mass[name] = [];
                    const mark = addMarker([it['x'],it['y']],it['str'],it['label'],it['content']);
                    obj_mass[name].push( mark );

                }

            });
        }

    
    }

   
}

let clearDrivingMarker = [];

function openParkingInfo(type,index,item){

    if(infoWindow.getIsOpen()){
       let terminal =  infoWindow.getContent( ).match(/\<div style="display:none"\>终端号：.+\<\/div\>/)[0].match(/\d+/);
       if( (terminal && terminal[0]) === item.gpsTerminal){
            map.setCenter(obj_mass[type][index].getPosition());
            return;
       }
    }
    obj_mass[type][index].emit('click', {target: obj_mass[type][index]});
    map.setCenter(obj_mass[type][index].getPosition());

}

function drivingGPS(item,currentMark){
    let path = [];
    let currentPosition = currentMark.getPosition();

    if(driving){
        driving.clear();
        map.remove(clearDrivingMarker);
    }
    if(item.orderCurrentStatus.status == 'ACCEPTED'
        || item.orderCurrentStatus.status == 'SETOFFED'){
        path = item.destination ? [[currentPosition.lng,currentPosition.lat],[item.rescueLng,item.rescueLat],[item.destinationLng,item.destinationLat]]:[[currentPosition.lng,currentPosition.lat],[item.rescueLng,item.rescueLat]];
    }

    if( item.destination){

        if(item.orderCurrentStatus.status == 'ARRIVE_RESCUE'
        || item.orderCurrentStatus.status == 'TRUCK_LOADING'){
            path = [[currentPosition.lng,currentPosition.lat],[item.destinationLng,item.destinationLat]];
        }
    }

    if(!path.length || !item.rescueLng || !item.rescueLat){
        let html = `<div id ="map_content">
                <a href="javascript:;" class="map_close"><span>×</span></a>
                ${currentMark.content}
            </div>`;

        infoWindow.setContent(html);
        infoWindow.open(map,currentPosition);
        clickFn();
        return map.setCenter(currentPosition);
    }


    pathPlanning({hideMarkers:true,noClear:true},path,function(data){

        map.setCenter(currentPosition);

        let html = currentMark.content;

        if(data){
            if(item.orderCurrentStatus.status == 'ACCEPTED'
            || item.orderCurrentStatus.status == 'SETOFFED'){
                if(item.destination){
                    clearDrivingMarker.push(addMaker([item.rescueLng,item.rescueLat],null,rescueArea));
                    clearDrivingMarker.push(addMaker([item.destinationLng,item.destinationLat],null,destinationArea));
                }else{
                    clearDrivingMarker.push(addMaker([item.rescueLng,item.rescueLat],null,rescueArea));
                }
            }

            if( item.destination){

                if(item.orderCurrentStatus.status == 'ARRIVE_RESCUE'
                || item.orderCurrentStatus.status == 'TRUCK_LOADING'){
                    clearDrivingMarker.push(addMaker([item.destinationLng,item.destinationLat],null,destinationArea));
                }
            }
            if( html.match(/\<div\>预计时间：.+\<\/div\>/) ){

                html.replace(/\<div\>预计时间：.+\<\/div\>/,`<div>预计时间：${formatSeconds(data.routes[0].time)}</div>`);
                html.replace(/\<div\>预计距离：.+\<\/div\>/,`<div>预计距离：${Math.ceil(data.routes[0].distance/1000)}公里</div>`);
            }else{
                html += `
                        <div>预计时间：${formatSeconds(data.routes[0].time)}</div>

                        <div>预计距离：${Math.ceil(data.routes[0].distance/1000)}公里</div>
                `;
            }
        }else{
            console.error(path,'经纬度不合法无法规划路线');
        }


        currentMark.content = html;

        const infoWindowhtml = `<div id ="map_content">
            <a href="javascript:;" class="map_close"><span>×</span></a>
            ${html}
        </div>`;
        infoWindow.setContent( infoWindowhtml );
        infoWindow.open(map, currentPosition);
        clickFn();




    });
}




function centerlng(lnglat,callback,isCircle){
    if(lnglat.constructor == Array){
        geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                info =  '<div><b>当前地址:</b> ' + result.regeocode.formattedAddress + '</div>' +
                        '<div><b>当前坐标:</b> ' + lnglat.toString() + '</div>' ;

                callback ?  callback(result,info) : addMarker(lnglat,info,null);



            }else{
                alert("逆地理编码失败或经纬度不合法:" + lnglat.toString() );
            };
        });
    }else{
        // map.clearMap();
        info =  '<div><b>当前地址:</b> ' + lnglat.address + '</div>' +
                '<div><b>当前坐标:</b> ' + lnglat.Longitude + '</div>';

        callback &&  typeof callback !== "boolean" ? callback() : addMarker(lnglat.Longitude.split(','),info,null,true);
        map.setZoomAndCenter(12,lnglat.Longitude.split(','));
        
    }

   
    if(isCircle || (typeof callback === "boolean" && callback) ){
        let path = lnglat.Longitude.split(',');
        paint_circle_path = new AMap.LngLat(path[0], path[1]);
        circle = new AMap.Circle({
            center: paint_circle_path,// 圆心位置
            radius: 10 * 1000, //半径
            strokeColor: "rgba(220,249,252,1)", //线颜色
            strokeOpacity: .5, //线透明度
            strokeWeight: 1, //线粗细度
            fillColor: "rgba(57,182,229,.7)", //填充颜色
            fillOpacity: 0.35//填充透明度
        });

        circle.setMap(map);
    } 
}

function centerAddress(address){
    map.clearMap();
    geocoder.getLocation(address, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var geocode =  result.geocodes;
            
            for (var i = 0; i < geocode.length; i++) {

                let provincial = {
                    province:geocode[i].addressComponent.province,
                    city:geocode[i].addressComponent.city,
                    district:geocode[i].addressComponent.district,
                    town:geocode[i].addressComponent.township
                }

                //拼接输出html
                var info =  '<div><b>当前地址:</b> ' + geocode[i].formattedAddress + '</div>' +
                            '<div><b>当前坐标:</b> ' + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + '</div>' + 
                            click_info(geocode[i].formattedAddress,[geocode[i].location.getLng(),geocode[i].location.getLat()],JSON.stringify(provincial));

                addMarker([geocode[i].location.getLng() , geocode[i].location.getLat()],info,null);
                map.setZoomAndCenter(12,[geocode[i].location.getLng() , geocode[i].location.getLat()]);
            }
        }else{
            alert("无法检索此地址")
        }

        clickFn();
    });
}

function mapBtn(str){
    var strs = str.split(',');
    if(strs.length == 1){
        res_add = strs[0];
        des_add = '';
    }else{
        res_add = strs[0];
        des_add = strs[1]; 
    }
};

var driving = null;

function pathPlan(dom){

    if(!map){
        map = new AMap.Map(dom, {
            resizeEnable: true,
            zoom:12,
        });
    }

    var bool,
        path,
        callback,
        isCircle = false;  


    var DrivingOption = {
        map: map,
    };

    if(arguments.length == 3){
        DrivingOption['hideMarkers'] = arguments[0]['hideMarkers'];
        isCircle = arguments[0]['isCircle'];
        path = arguments[1];
        callback = arguments[2];
    }else{
        path = arguments[0];
        callback = arguments[1];
    }

    

    map.clearInfoWindow( );
    if( !arguments[0]['noClear']){
        for(let i in obj_mass){
            if(obj_mass[i].length){
                for (var j = 0; j < obj_mass[i].length; j++) {      //先停止动画，不然会报错；
                    obj_mass[i][j].stopMove();
                }
            }
        }
        map.clearMap();
        
    }
    
    map.plugin(["AMap.Driving"], function() {
        driving = new AMap.Driving(DrivingOption); //构造驾车导航类
        driving.rescue =  path[1];
        if(path.length > 2 )driving.destination =  path[2];
        AMap.event.addListener(driving, "complete", function(data){
            driving_routeCallBack(data,callback,path[0],isCircle);
        }); //返回导航查询结果
        AMap.event.addListener(driving, "error", function(data){
            callback(null);
        }); //返回导航查询结果
        path.length == 2 ?  driving.search(path[0],path[1]) :  driving.search(path[0],path[2],{waypoints:[path[1]]})
        // driving.search(path[0],path[1]); //根据起终点坐标规划驾车路线
    });
}

//构造驾车导航类：驾车策略

var paint_circle_path = null,
    circle = null;

function driving_routeCallBack(data,addMarker_CallBack,path,isCircle){
    // map.setFitView();
    if(addMarker_CallBack)addMarker_CallBack(data);
    // map.setZoomAndCenter(12,path);

    paint_circle_path = new AMap.LngLat(path[0], path[1]);
    if(isCircle){
        circle = new AMap.Circle({
            center: paint_circle_path,// 圆心位置
            radius: 10 * 1000, //半径
            strokeColor: "rgba(220,249,252,1)", //线颜色
            strokeOpacity: .5, //线透明度
            strokeWeight: 1, //线粗细度
            fillColor: "rgba(57,182,229,.7)", //填充颜色
            fillOpacity: 0.35//填充透明度
        });

        circle.setMap(map);

    } 

};


var polyline;

function openWindinfo(point,rescue){
    if(typeof point == 'object'){

        if(polyline)polyline.setMap();

        var lineArr = [
            point,
            rescue,
        ];

         polyline = new AMap.Polyline({
            path: lineArr,          //设置线覆盖物路径
            strokeColor: "#3366FF", //线颜色
            strokeOpacity: 1,       //线透明度
            strokeWeight: 5,        //线宽
            strokeStyle: "solid",   //线样式
            strokeDasharray: [10, 5] //补充线样式
        });
        polyline.setMap(map);

    }else{
        clearArr[point].emit('click', {target: clearArr[point]});
        map.setCenter(clearArr[point].getPosition());
    }
}

function currentAddress(successFn,errorFn){
    map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        //显示定位按钮，默认：true
            GeoLocationFirst:true,
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function(res){
           successFn(res);
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', function(err){
            successFn({position:{lng:0,lat:0}});
        });      //返回定位出错信息
    });
}

function deepCopy(p, c) {  
    var c = c || {};  
    for (var i in p) {  
        if(! p.hasOwnProperty(i)){  
            continue;  
        }  
        if (typeof p[i] === 'object') {  
            c[i] = (p[i].constructor === Array) ? [] : {};  
            deepCopy(p[i], c[i]);  
        } else {  
            c[i] = p[i];  
        }  
    }  
    return c;  
} 



function getMapAllPoiny(){

    global.map_opt = {
        zoom:map.getZoom(),
        point: map.getCenter()
    }
}

function setMapAllPoiny(bool){
    if(!global.map_opt)return;
    setTimeout(function() {
        map.setZoomAndCenter(global.map_opt.zoom,global.map_opt.point);
    }, 1000);
    if(!bool){

        for(let i in obj_mass){


            if(obj_mass[i] && obj_mass[i].length){
                map.add(obj_mass[i]);  
                $('.checkboxs').find('input[name=' + i +  ']')[0].checked = true;
            }
        }

    }
}


function Autocomplete(dom){
    const auto = new AMap.Autocomplete({input: dom,city:currentCity});
    let isServer = false;

    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
    $('#' + dom ).keydown(function(e){
        if(isServer)return;
        if(e.keyCode==13){
            centerAddress($(this).val());
        }
    })

    AMap.event.addListener(auto, "complete", function(e){
        isServer = e.info == 'NO_DATA' ? false:true
        
    });//注册监听，当
   
}


function InitializeMap (dom,doubleClick) {

    map = new AMap.Map(dom, {
        resizeEnable: true,
        showIndoorMap:false,
        animateEnable:false,
        indoorMap:false,
        touchZoom:false,
        keyboardEnable:false,
        expandZoomRange:false,
        doubleClickZoom:false,
        showBuildingBlock:false,
        buildingAnimation:false,
        features:["bg","road","point"],
        zoom:12,
    });

    map.plugin(["AMap.ToolBar"],function(){   //在地图中添加ToolBar插件      
        const toolBar = new AMap.ToolBar();  
        map.addControl(toolBar);       
    }); 

    map.getCity(function(result){
        currentCity = result.city;


        map.plugin(["AMap.Geocoder"],function(){
            geocoder=new AMap.Geocoder({
                extensions: 'all'//城市，默认："全国"
            })
        });


    });
    map.plugin(["AMap.Autocomplete"], function() {
      
    });

    
    AMap.service(["AMap.PlaceSearch"], function() {
        placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            showCover:false,
            extensions: 'all'//城市，默认："全国"
        });

    });
  

    //双击事件
    map.on("dblclick", function(e){
        if(!doubleClick)return;
        if($('.checkboxs').length && $('.shouqi').css('display') == 'none' )return;
        if($('.orderDetails-left').find('input').attr('disabled'))return;
        if($('.operationPageAnime').find('input').attr('disabled'))return;
        map.clearMap(); //连同mousemove层一起移除了

        let lnglatXY = [e.lnglat.getLng(),e.lnglat.getLat()];

        centerlng(lnglatXY,function(result,info){
            var provincial = {
                province:result.regeocode.addressComponent.province,
                city:result.regeocode.addressComponent.city,
                district:result.regeocode.addressComponent.district,
                town:result.regeocode.addressComponent.township
            }
            info += click_info(result.regeocode.formattedAddress,lnglatXY,JSON.stringify(provincial)) ;
            lnglatXY.open = true;
            infoWindow =  new AMap.InfoWindow({offset: new AMap.Pixel(0, -40),autoMove:false,isCustom:true}); 
            addMarker(lnglatXY,info); 
            map.setZoomAndCenter(14,lnglatXY);

        })
    });



    // //地图中添加地图操作ToolBar插件
    // map.plugin(["AMap.ToolBar"], function() {
    //     map.addControl(new AMap.ToolBar());
    // });

    //加载地理编码插件
   
    map_operation();
};

var polyline,gps_gui;

function addKeyMaker(lnglat,icon,status){
    if(lnglat.constructor == Array){

        geocoder.getAddress([lnglat], function(statu, result) {

            if (statu === 'complete' && result.info === 'OK') {
                info = status ? '<div style="font-size:18px;color:#FF6B0E">' +  status +'</div>' : '';          
                info +=  '<div><b>当前地址:</b> ' + result.regeocode.formattedAddress + '</div>' +
                        '<div><b>当前坐标:</b> ' + lnglat.toString() + '</div>';

                ([lnglat.getLng(),lnglat.getLat()],info,icon);

            }else{
                alert("逆地理编码失败或经纬度不合法:" + lnglat.toString() );
                
            };
        });
    }else{
        info = status ? '<div style="font-size:18px;color:#FF6B0E">' +  status +'</div>' : '';          
        info +=  '<div><b>当前地址:</b> ' + lnglat.address + '</div>' +
                '<div><b>当前坐标:</b> ' + lnglat.lnglat.x.toFixed(6) + ',' + lnglat.lnglat.y.toFixed(6) + '</div>';

        addMaker([lnglat.lnglat.x,lnglat.lnglat.y],info,icon);
    }
    
}

function search(chufa,jiuyuan,mudi){

    map.clearMap();

    var chufaGps=new AMap.LngLat(chufa.lnglat.x,chufa.lnglat.y); 
    var jiuyuanGps=new AMap.LngLat(jiuyuan.lnglat.x,jiuyuan.lnglat.y); 
    var mudiGps= mudi==null?mudi:new AMap.LngLat(mudi.lnglat.x,mudi.lnglat.y); 


    new AMap.service(["AMap.Driving"], function() {
        var driving=new AMap.Driving({
            map:map,
            hideMarkers:true
        });

        if(mudiGps!=null){
             driving.search(chufaGps,mudiGps,function(status,result){
                if(status=="complete"){
                  var preview={mileageArrive:'',mileageGoto:'',minuteArrive:'',minuteGoto:''};
                  preview.mileageGoto=result.routes[0].distance/1000;
                  preview.minuteGoto=result.routes[0].time/60;
                  bus.$emit("setPreviewGoto",preview);
                  driving.clear();
                } 
            });
            
            driving.search(chufaGps,mudiGps,{waypoints:[jiuyuanGps]},function(status,result){
                addCar([chufaGps.getLng(),chufaGps.getLat()]);
                addKeyMaker(chufa,require("../assets/chufa.png"),'出发去救援地');
                addKeyMaker(jiuyuan,require("../assets/jiuyuandd.png"),'到达救援地'); 
                addKeyMaker(mudi,require("../assets/mudidd.png"),'到达目的地');
                if(status=="complete"){
                  var preview={mileageArrive:'',minuteArrive:''};  
                  preview.mileageArrive=result.routes[0].distance/1000;
                  preview.minuteArrive=result.routes[0].time/60;
                  bus.$emit("setPreviewArrive",preview);
                  driving.clear();
                } 
           });
           
        }else{
            driving.search(chufaGps,jiuyuanGps,function(status,result){
                addCar([chufaGps.getLng(),chufaGps.getLat()]);
                addKeyMaker(chufa,require("../assets/chufa.png"),'出发去救援地');
                addKeyMaker(jiuyuan,require("../assets/jiuyuandd.png"),'到达救援地');  
                if(status=="complete"){
                 var preview={mileageArrive:'',mileageGoto:'',minuteArrive:'',minuteGoto:''};
                  preview.mileageGoto=result.routes[0].distance/1000;
                  preview.minuteGoto=result.routes[0].time/60;
                  bus.$emit("setPreviewGoto",preview);
                  driving.clear();
                }  

            });
        }
        
    });

}

function destroy(){

    for(let i in obj_mass){
        if(obj_mass[i].length){
            for (var j = 0; j < obj_mass[i].length; j++) {      //先停止动画，不然会报错；
                obj_mass[i][j].stopMove();
            }
        }
    }

    map.destroy();
}


function gps_locus(content,callback){
  if( !content || !content.length) return;
    var gps_gui;
    var lineArr = [];
      for (var i = 0; i < content.length; i++) {
        lineArr.push([content[i].gps.x, content[i].gps.y]);
      }
        polyline = new AMap.Polyline({
          map: map,
          path: lineArr,
          strokeColor:"#00A",  //线颜色
          strokeOpacity: 1,     //线透明度
          strokeWeight: 3,      //线宽
          strokeStyle: "solid"  //线样式
        });
        map.setFitView();
        gps_gui=sort_by_time(content,"created");
        callback(gps_gui);
}
function rad(d) {
  return d * Math.PI / 180.0;
}
var EARTH_RADIUS = 6378137;
/** 
 * 基于余弦定理求两经纬度距离 
 * @param lon1 第一点的精度 
 * @param lat1 第一点的纬度 
 * @param lon2 第二点的精度 
 * @param lat3 第二点的纬度 
 * @return 返回的距离，单位km 
 * */
function LantitudeLongitudeDist(lon1,lat1,lon2,lat2) {  
    var radLat1 = rad(lat1);  
    var radLat2 = rad(lat2);  

    var radLon1 = rad(lon1);  
    var radLon2 = rad(lon2);  
        
    if (radLat1 < 0)  
        radLat1 = Math.PI / 2 + Math.abs(radLat1);// south  
    if (radLat1 > 0)  
        radLat1 = Math.PI / 2 - Math.abs(radLat1);// north  
    if (radLon1 < 0)  
        radLon1 = Math.PI * 2 - Math.abs(radLon1);// west  
    if (radLat2 < 0)  
        radLat2 = Math.PI / 2 + Math.abs(radLat2);// south  
    if (radLat2 > 0)  
        radLat2 = Math.PI / 2 - Math.abs(radLat2);// north  
    if (radLon2 < 0)  
        radLon2 = Math.PI * 2 - Math.abs(radLon2);// west  
    var x1 = EARTH_RADIUS * Math.cos(radLon1) * Math.sin(radLat1);  
    var y1 = EARTH_RADIUS * Math.sin(radLon1) * Math.sin(radLat1);  
    var z1 = EARTH_RADIUS * Math.cos(radLat1);  

    var x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);  
    var y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);  
    var z2 = EARTH_RADIUS * Math.cos(radLat2);  

    var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)+ (z1 - z2) * (z1 - z2));  
    //余弦定理求夹角  
    var theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));  
    var dist = theta * EARTH_RADIUS;  
    return dist;  
}

function sort_by_time(arr,name){//按照属性name排序
    var arr=arr.sort(compare(name));
    return arr;
}
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
function addCar(pos) {
   carMarker=  new AMap.Marker({
        map: map,
        position: pos,
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true
    }); 
}
function move(infoArr,speed){
    var arr=[];
    for(var i=0;i<infoArr.length;i++){
        arr.push(new AMap.LngLat(infoArr[i][0],infoArr[i][1]));
    }
     carMarker.moveTo(arr,speed); 
}
function stop_move(){
    carMarker.stopMove();
}

function formatSeconds(value) {
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
}

class Initialize {
    static init(dom,doubleClick) {
        InitializeMap(dom,doubleClick);
    }
    static addCoordinate(lnglatXY,fn,isCircle) {
        for(let i in obj_mass){
            if(obj_mass[i].length){
                for (var j = 0; j < obj_mass[i].length; j++) {      //先停止动画，不然会报错；
                    obj_mass[i][j].stopMove();
                }
            }
        }

        centerlng(lnglatXY,fn,isCircle);

    }
    static addCooraddress(address) {
        centerAddress(address);
    }
    static pathPlanning(bool,path,callback) {
        pathPlan(bool,path,callback);
    }
    static addMarkersing(arr,obj) {
        addMarkers(arr,obj)
    }
    static clearMap(type) {
        for(let i in obj_mass){
            if(obj_mass[i].length){
                for (var j = 0; j < obj_mass[i].length; j++) {      //先停止动画，不然会报错；
                    obj_mass[i][j].stopMove();
                }
            }
        }


        if(type == 'polyline'){
            map.clearInfoWindow( );
            if(polyline)polyline.setMap();
        }else map.clearMap();


        let checkboxs = $('#toolTips .checkboxs').find('input[type="checkbox"]');
        if( checkboxs.length){
            checkboxs.each((index,el)=>{
                el.checked = false
            });
        }else{
            checkboxs = null;
        }
    }
    static mapBtnAddress(str) {
        mapBtn(str);
    }
    static getCurrentAddress(successFn,errorFn) {
        currentAddress(successFn,errorFn);
    }
    static mapOpenWindinfo(point,rescue) {
        openWindinfo(point,rescue);
    }
    static paintCircle(num) {
        if(circle)circle.setRadius(num * 1000);
        // clearArr.forEach(function(it,index){
        //     alert('点是否在多边形内：' + circle.contains(it.getPosition()));
        // });
    }
    static _getParking(name,data,isLunxun,FN){
        getParking(name,data,isLunxun,FN);
    }
    static  sort(arr,name){
        return sort_by_time(arr,name);
    }
    static lnglatDist(lon1,lat1,lon2,lat2){
       return LantitudeLongitudeDist(lon1,lat1,lon2,lat2);
    }
    static addCarMarker(pos){
       return addCar(pos);
    }
    static searchInfo(chufa,jiuyuan,mudi){
        return search(chufa,jiuyuan,mudi);
    }
    static gps_locus_(content,callback){
       return gps_locus(content,callback);
    }
    static _openParkingInfo(type,index,item){
        openParkingInfo(type,index,item);
    }
    static move_(infoArr,speed){
        move(infoArr,speed);
    }
    static stop_move_(){
        stop_move();
    }
    static _getMapAllPoiny(){
        return getMapAllPoiny();
    }
    static _destroy(){
        destroy();
    }
    static _setMapAllPoiny(bool){
        return setMapAllPoiny(bool);
    }
    static _Autocomplete(dom){
        Autocomplete(dom)
    }
    static _openInfo(info,position){

        var content =   `<div id ="map_content">
                            <a href="javascript:;" class="map_close"><span>×</span></a>
                            ${info}
                        </div>`;

        infoWindow.setContent(content);
        infoWindow.open(map, position);
        map.setCenter(position);

        clickFn();
    }
}
export  let initMap = Initialize.init,
            addCoordinate = Initialize.addCoordinate,
            addCooraddress = Initialize.addCooraddress,
            pathPlanning = Initialize.pathPlanning,
            addMarkersing = Initialize.addMarkersing,
            clearMap = Initialize.clearMap,
            mapBtnAddress = Initialize.mapBtnAddress,
            getCurrentAddress = Initialize.getCurrentAddress,
            paintCircle = Initialize.paintCircle,
            mapOpenWindinfo = Initialize.mapOpenWindinfo,
            sort_ = Initialize.sort,
            LnglatDist = Initialize.lnglatDist,
            addCarMaker=Initialize.addCarMarker,
            search_=Initialize.searchInfo,
            getTrack=Initialize.gps_locus_,
            _openParkingInfo=Initialize._openParkingInfo,
            moveTo=Initialize.move_,
            _getParking=Initialize._getParking,
            stopMove=Initialize.stop_move_,
            _setMapAllPoiny = Initialize._setMapAllPoiny,
            _Autocomplete = Initialize._Autocomplete,
            openInfo = Initialize._openInfo,
            _destroy = Initialize._destroy,
            _getMapAllPoiny = Initialize._getMapAllPoiny;

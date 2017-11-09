import img from "../../../../../../assets/img.png";
import heard from "../../../../../../assets/heard.png";

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
    infoWindow,
    mark,
    res_add = '设置为事故地',
    des_add = '设置为目的地',
    geocoder,
    clearArr = [],
    carMarker="";

function select(e) {
console.log(e)
    placeSearch.setCity(e.poi.adcode);
    name=e.poi.name

    placeSearch.search( name,function(status, result){

        map.clearMap();
        if (status === 'complete' && result.info === 'OK') {
             map.clearMap();
             map.clearInfoWindow( );
            var resultArr =  result.poiList.pois,
                d;
                console.log(resultArr)
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
            
            clearArr.push(addMarker([markers[i]['x'],markers[i]['y']],markers[i]['str'],markers[i]['label'],markers[i]['content']));  

        }catch(err){
            console.log(err)
        }
    }
    console.log(markers,clearArr)

}

function addMarker(position,info,label,content,notOPen){
    if(content && typeof content == 'string'){
        Marker = new AMap.Marker({
            map: map,
            position: [position[0],position[1]],
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
        Marker.emit('click', {target: Marker,info: content || notOPen});

    };
    if(map.getZoom() > 12) map.setZoom(12);
   
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
      Marker = new AMap.Marker({
          map: map,
          position: [position[0],position[1]],
          icon: new AMap.Icon({
              image:  icon
          })
      });
    }else{
       Marker = new AMap.Marker({
        map: map,
        position: [position[0],position[1]]
      });
    }

    if(info){
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
    map.setFitView();

};



function markerClick(e) {
    infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -41),autoMove:false,isCustom:true});

    var content = `<div id ="map_content">
                    <a href="javascript:;" class="map_close"><span>×</span></a>

                    ${e.target.content}
                </div>`

    infoWindow.setContent(content);
    if(!e.info)infoWindow.open(map, e.target.getPosition());
    clickFn();
};


let newMarer = null;

function addParamsMark(lnglatXY){
    if(newMarer)map.remove([newMarer]);
    centerlng(lnglatXY,function(result,info){
        var provincial = {
            province:result.regeocode.addressComponent.province,
            city:result.regeocode.addressComponent.city,
            district:result.regeocode.addressComponent.district,
            town:result.regeocode.addressComponent.township
        }

        var xinxi = info +  click_info(result.regeocode.formattedAddress,lnglatXY,JSON.stringify(provincial)) ;
        newMarer = addMarker(lnglatXY,xinxi,null,null); 
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
                window.showModel(data)
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

var obj_mass = {
    towTruck:[],
    driver:[],
    serviceProvider:[],
    order:[]
};

function getParking(name,data){
    console.log(name,data)
    if(name == 'clear'){
        for(let i in obj_mass){ 
            map.remove(obj_mass[i]);
        };
        return;
    }
    
    if(!data.length){
        map.remove(obj_mass[name]);
        console.log(obj_mass[name])
        obj_mass[name] = [];
        return
    };

    data.forEach(function(it,index){
        if(it['x'] && it['y'])obj_mass[name].push(addMarker([it['x'],it['y']],it['str'],it['label'],it['content']));  
    });

    console.log(obj_mass)
   
}

function setMassEvent(obj){
    let marker = new AMap.Marker({
        content:' ',
        map:map
    });
    
    obj.on('mouseover',function(e){
        marker.setPosition(e.data.lnglat);
        marker.setLabel({content:e.data.name});

    });
    obj.on('mouseout',function(e){
        marker.setLabel({content:''});

    });
    obj.on('click',function(e){

        marker.content = e.data.content;

        infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(13, -30),autoMove:false,isCustom:true});

         var content = `<div id ="map_content">
                    <a href="javascript:;" class="map_close" ><span>×</span></a>
                    ${e.data.content}
                </div>`

        infoWindow.setContent(content);
        infoWindow.open(map, e.data.lnglat);
    clickFn();
        

    });
    obj.setMap(map);
}

function centerlng(lnglat,callback,isCircle){
    console.log(lnglat)
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
        paint_circle_path = new AMap.LngLat(path[0], path[1])
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
                //拼接输出html
                var info =  '<div><b>当前地址:</b> ' + geocode[i].formattedAddress + '</div>' +
                            '<div><b>当前坐标:</b> ' + geocode[i].location.getLng() + ", " + geocode[i].location.getLat() + '</div>' + 
                            click_info(geocode[i].formattedAddress,[geocode[i].location.getLng(),geocode[i].location.getLat()]);

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

function pathPlan(){

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
    map.clearMap( );
    
    map.plugin(["AMap.Driving"], function() {
        var driving = new AMap.Driving(DrivingOption); //构造驾车导航类
        AMap.event.addListener(driving, "complete", function(data){
            driving_routeCallBack(data,callback,path[0],isCircle);
        }); //返回导航查询结果
        path.length == 2 ?  driving.search(path[0],path[1]) :  driving.search(path[0],path[1],{waypoints:[path[2]]})
        // driving.search(path[0],path[1]); //根据起终点坐标规划驾车路线
    });
}

//构造驾车导航类：驾车策略

var paint_circle_path = null,
    circle = null;

function driving_routeCallBack(data,addMarker_CallBack,path,isCircle){
    if(addMarker_CallBack)addMarker_CallBack(data);
    map.setZoomAndCenter(12,path);

    paint_circle_path = new AMap.LngLat(path[0], path[1])
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
// infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
    if(typeof point == 'object'){

        infoWindow.open(map, point);
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
    console.log(map);
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
        console.log(dom)

    map = new AMap.Map(dom, {
        resizeEnable: true,
        zoom:12,
    });

    map.getCity(function(result){
        console.log(result)
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
            map: map,
            showCover:false,
        });

    });
  

    //双击事件
    map.on("dblclick", function(e){
        if(!doubleClick)return;

        map.clearMap(); //连同mousemove层一起移除了
        addParamsMark([e.lnglat.getLng(),e.lnglat.getLat()]);
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

        geocoder.getAddress(lnglat, function(statu, result) {

            if (statu === 'complete' && result.info === 'OK') {
                info = status ? '<div style="font-size:18px;color:#FF6B0E">' +  status +'</div>' : '';          
                info +=  '<div><b>当前地址:</b> ' + result.regeocode.formattedAddress + '</div>' +
                        '<div><b>当前坐标:</b> ' + lnglat.toString() + '</div>';

                addMaker([lnglat.getLng(),lnglat.getLat()],info,icon);

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
                addKeyMaker(chufa,require("../../../../../../assets/chufa.png"),'出发去救援地');
                addKeyMaker(jiuyuan,require("../../../../../../assets/jiuyuandd.png"),'到达救援地'); 
                addKeyMaker(mudi,require("../../../../../../assets/mudidd.png"),'到达目的地');
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
                addKeyMaker(chufa,require("../../../../../../assets/chufa.png"),'出发去救援地');
                addKeyMaker(jiuyuan,require("../../../../../../assets/jiuyuandd.png"),'到达救援地');  
                if(status=="complete"){
                 var preview={mileageArrive:'',mileageGoto:'',minuteArrive:'',minuteGoto:''};
                  preview.mileageGoto=result.routes[0].distance/1000;
                  preview.minuteGoto=result.routes[0].time/60;
                  bus.$emit("setPreviewGoto",preview);
                  driving.clear();
                }  

            });
        }

        map.setFitView();

        
    });

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
        gps_gui=sort_by_time(content,"created");
        map.setFitView();
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

class Initialize {
    static init(dom,doubleClick) {
        InitializeMap(dom,doubleClick);
    }
    static addCoordinate(lnglatXY,fn,isCircle) {
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
    static clearMap() {
        map.clearMap();
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
       circle.setRadius(num * 1000);
        console.log(clearArr)
        // clearArr.forEach(function(it,index){
        //     alert('点是否在多边形内：' + circle.contains(it.getPosition()));
        // });
    }
    static _getParking(name,data,url){
        getParking(name,data);
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
    static move_(infoArr,speed){
        move(infoArr,speed);
    }
    static stop_move_(){
        stop_move();
    }
    static _getMapAllPoiny(){
        return getMapAllPoiny();
    }
    static _setMapAllPoiny(bool){
        return setMapAllPoiny(bool);
    }
    static _Autocomplete(dom){
        Autocomplete(dom)
    }
    static _openInfo(info,position){
        infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -41),autoMove:false,isCustom:true});

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
            moveTo=Initialize.move_,
            _getParking=Initialize._getParking,
            stopMove=Initialize.stop_move_,
            openInfo=Initialize._openInfo,
            _setMapAllPoiny = Initialize._setMapAllPoiny,
            _Autocomplete = Initialize._Autocomplete,
            _getMapAllPoiny = Initialize._getMapAllPoiny;

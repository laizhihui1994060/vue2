
var auto1,
    placeSearch,
    map,
    marker=[],
    windowsArr =[],
    nearbyVehicles,
    accidentTos,
    destinationTos,
    infoWindow,
    geocoder,
    mark,
    my_address;


    function select(e,ponint) {
        
        map.clearMap();
        map.clearInfoWindow( );
        marker=[],
        windowsArr =[];
        if(ponint){
            name=ponint
        }else{
            placeSearch.setCity(e.poi.adcode);
            name=e.poi.name
        }
        placeSearch.search( name,function(status, result){
            map.clearMap();
            if (status === 'complete' && result.info === 'OK') {
                var resultStr="";
                var resultArr =  result.poiList.pois
                for (var i = 0; i < resultArr.length; i++) {

                    resultStr += "<div class='mouver' index= " + i + "  style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\">" +
                        "<table><tr><td><img src=''></td>" + "<td><strong><font color=\"#00a6ac\">名称: " + resultArr[i].name + "</font></strong><br/>";
                    resultStr += TipContents(resultArr[i].type, resultArr[i].address, resultArr[i].tel) + "</td></tr></table></div>";
                    addmarker(i, resultArr[i]);
                }



              
            }else{
                alert('搜索失败')
            }
        });
    }


    //窗体内容
    function TipContents(type, address, tel) {
        if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
            type = "暂无";
        }
        if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
            address = "暂无";
        }
        if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
            tel = "暂无";
        }
        var str = "&nbsp;&nbsp;地址：" + address + "<br />&nbsp;&nbsp;电话：" + tel + " <br />&nbsp;&nbsp;类型：" + type;
        return str;
    }
//添加marker&infowindow
function addmarker(i, d) {
    var lngX = d.location ? d.location.getLng() : d._location.getLng();
    var latY = d.location ? d.location.getLat() : d._location.getLat();
    var iName = d.name ?  d.name : d._name;
    var iAddress  = d.name ?  d.address : d._address;

    var markerOption = {
        map:map,
        position:new AMap.LngLat(lngX, latY),
    };
    var mar = new AMap.Marker(markerOption);
    marker.push(new AMap.LngLat(lngX, latY));

    var infoWindow = new AMap.InfoWindow({
        content:("<div>" + d.pname + d.cityname + d.adname + d.name + d.address + '<a href="javascript:;">　　设为驻车地</a>' + "</div>"),
        size:new AMap.Size(300, 0),
        autoMove:true,
        offset:new AMap.Pixel(0,-30)
    });
    windowsArr.push(infoWindow);
    var aa = function (e) {
        infoWindow.open(map, mar.getPosition());
    };
    AMap.event.addListener(mar, "click", aa);
    windowsArr[0].open(map, marker[0]);
}



function addMarker(position,info,label,icon){
    
    //添加点标记，并使用自己的icon
    // var icon = icon ? icon : "img/xinrenwu.png";
    var Marker = new AMap.Marker({
        map: map,
        position: [position[0],position[1]],
        // icon: new AMap.Icon({
        //     size: new AMap.Size(32, 32),  //图标大小
        //     image:  icon,
        //     imageOffset:new AMap.Pixel(0, 0),
        //     imageSize:new AMap.Size(32, 32)
        // })
    });
    if(info){
        Marker.content = info;
        Marker.on('click', markerClick);
            Marker.emit('click', {target: Marker});
    };
     map.setFitView();
    // if(map.getZoom() == 18 || map.getZoom() == 17 || map.getZoom() == 16) map.setZoom(12);
   
    if(label){
        Marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
            content:  '<div class="labelStyle" >' + label + '</div>',
        });
    }

    return Marker;
};
function markerClick(e) {
    infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30),autoMove:false});
    infoWindow.setContent(e.target.content);
    infoWindow.open(map, e.target.getPosition());
};


function addParamsMark(lnglatXY){
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            my_address = `${result.regeocode.addressComponent.township}${result.regeocode.addressComponent.street}${result.regeocode.addressComponent.streetNumber}`;
            var address = result.regeocode,str1,a,url;
            str1 = address.addressComponent.province + address.addressComponent.district + address.addressComponent.city;
            
            if(address.addressComponent.province != address.addressComponent.city){
                url = encodeURI("/#!/rescueManagement/taskTrip/" + address.addressComponent.province + '|' +  address.addressComponent.district + '|' +  address.addressComponent.city + '|' + address.formattedAddress.substring(str1.length));
            }else{
                url = encodeURI("/#!/rescueManagement/taskTrip/" + address.addressComponent.province + '|' +  address.addressComponent.district + '|' +   address.formattedAddress.substring(str1.length));
            }

            console.log(`${result.regeocode.addressComponent.township}${result.regeocode.addressComponent.street}${result.regeocode.addressComponent.streetNumber}`);
            //信息
            var info = `${result.regeocode.formattedAddress}　　<a href='javascript:;'>设为驻车地</a></div>`;
            addMarker(lnglatXY,info,null);
        }else{
            alert("逆地理编码失败");
        };
    });
};


//拖拽事件
function moveCenter(){
    regeocoder(mark,[map.getCenter().lng,map.getCenter().lat])
};

function regeocoder(mark,lnglatXY) {
    if(geocoder){
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // mark.setContent("<b>位置:</b>" + result.regeocode.formattedAddress + "<br><b>经纬度:</b>" + lnglatXY.toString());
                mark.setPosition(lnglatXY);
                // 设置label标签
                mark.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    content: `<div class='labelStyle'> ${result.regeocode.formattedAddress}　　<a href='javascript:;'>设为驻车地</a></div>`
                });

            }else{
                alert("逆地理编码失败")
            }
        });
    }
};



export default function (dom, inputId, lnglatX, lnglatY, details) {
    map = new AMap.Map(dom, {
        resizeEnable: true,
        zoom:17
    });

    map.plugin(["AMap.Autocomplete"], function() {
        auto1 = new AMap.Autocomplete({
            input: inputId
        });
    });

    AMap.service(["AMap.PlaceSearch"], function() {
        placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            // city: decodeURI(city), //城市
            map: map
        });

        AMap.event.addListener(auto1, "select", select);//注册监听，当选中某条记录时会触发
    });
  

    //双击事件
    map.on("dblclick", function(e){
        map.clearMap();
        addParamsMark([e.lnglat.getLng(),e.lnglat.getLat()]);
        console.log(details.val());

        lnglatX.val( e.lnglat.getLng() );
        lnglatY.val( e.lnglat.getLat() );
        details.val( my_address );
    });

    //加载地理编码插件
    map.plugin(["AMap.Geocoder"],function(){
        geocoder=new AMap.Geocoder({
            radius: 1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
            extensions: "all"//城市，默认："全国"
        })
    });


    var points = document.querySelectorAll('.point_center');
    var e;

    for(var i = 0 ; i < points.length ;i++){
        points[i].b = true;
        console.log(points[i])
        points[i].addEventListener('click',function(){
            map.clearMap();
            if(this.b){
                mark = new AMap.Marker({
                    map: map,
                    position: [map.getCenter().lng,map.getCenter().lat]
                });
                e = AMap.event.addListener( map, 'dragging', moveCenter)
            }else{
                map.remove(mark);
                AMap.event.removeListener(e);

            }
            this.b = !this.b;
        })
    }

   

};
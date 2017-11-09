

global.ajax = function(url,method,parme,successFn, errorFn){
    $.ajax({   
        url: location.port == 8080  ? config.nodePath + url : url,   
        type:method,   
        data:parme,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: "JSON",
        success:function(data,status,res){
            successFn(data);
        },
        error:function(err){ 
            console.log(err);
            if(errorFn) errorFn(err)
        }
    }); 
};  

// parme 为一个数组
global.fileUp = function(parme,sussessFN){
    if(!parme || parme.length === 0)return sussessFN([]);
    // 获取票据
    const $loading = $('#main_loading');
    $loading.show();   // 展示蒙版loading

    let length = 0,
        images = [];

    parme.forEach(function(ele, index){

        // 同一个票据上传的是同一个文件
        const promise = new Promise(function(resolve, reject){
            send({
                type: 'post',
                url: 'control:/oss/sts/sign'
            }, function(err, res){
                console.log(err, res)
                if(err || res.status != 200){
                    return alert('获取签名失败');
                }
                resolve(res.content[0]);
            })
        })
        promise.then(function(param){
            if(ele.files && ele.files.length > 0){

                var pos = ele.files[0].name.lastIndexOf(".");
                var lastname = ele.files[0].name.substring(pos, ele.files[0].name.length);

                var ns  = new Date().Format("yyyyMMddhhmmss") + '' + parseInt(Math.random() * 1000000) +  lastname;

                var formData = new FormData();


                var body = JSON.stringify({
                    fileId:guid(),
                    fileNmae: ele.files[0].name,
                    uploadTime:new Date().getTime() + '000',
                    uploadBy:global.userId,
                    filePath:param.dir + '/' + ns
                });

                var callbackbody = JSON.stringify({
                    callbackUrl : param.callback,
                    callbackBody:body,
                    callbackBodyType:"application/json"
                });


                formData.append('OSSAccessKeyId', param.accessid);
                formData.append('policy', param.policy);
                formData.append('Signature', param.signature);
                formData.append('Filename', param.dir +'/' + ns);
                formData.append('key',param.dir +'/' + ns);
                formData.append('callback',global.Base64.encode(callbackbody));
                formData.append('success_action_status', 200);


                formData.append('file', ele.files[0]);
                formData.append('', "Upload to OSS");


                const type = ele.files[0].type;  // 图片类型


                $.ajax({
                    url: param.host,
                    data: formData,
                    processData: false,
                    cache: false,
                    async: false,
                    contentType: false,
                    //关键是要设置contentType 为false，不然发出的请求头 没有boundary
                    //该参数是让jQuery去判断contentType
                    type: "POST",
                    dataType: "JSON",
                    success:function(data,status,res){
                        if(data.status == 200){

                            ++length;
                            images.push({
                                imageId: data.content[0].id,   
                                cat: type
                            });
                            if(length >= parme.length){
                                $loading.hide();   // 蒙版loading消失
                                sussessFN(images);
                            }
                        }else{
                            alert(data.msg);
                            $loading.hide();   // 蒙版loading消失
                        }
                    },
                    error:function(err){
                        $loading.hide();   // 蒙版loading消失
                        console.log(err);
                        alert('服务器错误，请联系管理员');
                    }
                });

            }else{
                length++;
                images.push(ele);
                if(length >= parme.length){
                    $loading.hide();   // 蒙版loading消失
                    sussessFN(images);
                }
            }

        })
    })
}


function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
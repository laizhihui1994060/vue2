window.alert = function(txt){  
    var type = arguments.length > 1 ? arguments[1]:'error';

    swal({
        title:'系统提示' ,
        text:arguments[0] ,
        type:type,
        confirmButtonText:"确定"
    });

    // switch(arguments.length){
    //     case 1:
    //         // swal("系统提示", arguments[0])
    //         swal({
    //             title:'系统提示' ,
    //             text:arguments[0] ,
    //             type:"error",
    //             confirmButtonText:"确定"
    //         });
    //     break;
    //     case 2:
    //         swal({
    //             title:'系统提示' , 
    //             text:arguments[0] ,
    //             type:'success',
    //             confirmButtonText:"确定"
    //         });
    //     break;
    //     case 3:
    //         swal({
    //             title:'系统提示' ,
    //             text:arguments[0] ,
    //             type:arguments[1],
    //             confirmButtonText:arguments[2]
    //         });
    //     break;
    // }
};
window.timeAlert = function(tex){
    swal({
      title: "系统提示",
      text: tex + '，页面即将刷新',
      timer: 1000,
      showConfirmButton: true,
      allowOutsideClick:true
    });
};

window.confirm = function(tex,cd,bool){
    if(bool){ 
        swal({
            title: "系统对话框",
            text: tex,
            type: "warning",
            showCancelButton: true,
            cancelButtonText:"取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: false,
        },
        function(a){
            if(a)cd(a);
        });

    }else{
        swal({
            title: "系统对话框",
            text: tex,
            type: "warning",
            showCancelButton: true,
            cancelButtonText:"取消",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
        },
        function(a){
            cd && cd(a);
        });
    }
    
};

window.alertText = function(obj){
    swal({
        title: obj.title,
        text: obj.text,
        html:true
    });
}

window.alertInput = function(obj,cb){
    swal({
        title: obj.title,
        text: obj.text,
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: obj.InputError,
        cancelButtonText:"取消",
        confirmButtonText: "确定",
    },
    function(inputValue){
      if (inputValue === false) return false;
      
      if (inputValue === "") {
        swal.showInputError(obj.InputError);
        return false
      }
      cb && cb(inputValue)

    });
}


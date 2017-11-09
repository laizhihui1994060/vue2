function linkIf(link, item){
    if(link.matchType){
        switch(link.matchType){
            case 'btnShow':       //订单管理专用
                if(typeof link.matchContent == 'string'){
                    let ar1 = link.matchContent1 ? link.matchContent1.split(','):null;
                    return link.matchContent.split(',').some((it)=>{
                        if(link.matchfield1 && ar1){
                            if(link.matchfield2){
                                // console.log(  item[link.matchfield] )
                                return (item[link.matchfield] == it) && (item[link.matchfield1] == link.matchContent1) && !(item[link.matchfield2]);
                            }else{
                                return (item[link.matchfield] == it) && (item[link.matchfield1] == link.matchContent1);
                            }
                        }else{
                            return item[link.matchfield] == it;
                        }
                    });
                }else if(typeof link.matchContent == 'boolean'){
                    return !item[link.matchfield];
                }
            break;
            default :
                break;

        }
    }
    // 权限, 倒数第一个 [['scope', 'PLATFORM', '!='], ['authority', [ 'systemSettings' ,'addSeriaNumber' ] ] ] 
    const lastArr = link.link_if[link.link_if.length-1];
    if(lastArr[0] == 'authority'  && !ConfigPage.isExist(lastArr[1])){

        return false;
    }else if( lastArr[0] == 'authority'  && ConfigPage.isExist(lastArr[1])  && link.link_if.length == 1){
        if(link.matchContent){
            let bool = link.matchContent.split(',').some((data,index)=>{
                if(data === item[link.matchfield] ){
                    return true
                }
            });
            return bool;
        }else{
            return true;
        }
    }


    if(lastArr[0] == 'isAdmin'  && item[lastArr[0]] != lastArr[1]){
        return false;
    }else if(lastArr[0] == 'isAdmin'  && item[lastArr[0]] == lastArr[1] && link.link_if.length == 1 ){
        return true;
    }

    if(link.link_if[0][1] == 'ourId'){
        while(!global.ourOrgId){
        }
        if( item[link.link_if[0][0]] == global.ourOrgId){
            if( link.link_if[1]  ){
                if(item[link.link_if[1][0]] != link.link_if[1][1]){
                    return true;
                }
                return false;
            }
            return true;
        }else{
            return false;
        }
    }


    // 或者
    if(!link.link_if_type || link.link_if_type == '||'){
        return link.link_if.some( (link_arr, index) => {
            if(link_arr[2] == '!=' ? item[link_arr[0]] != link_arr[1] : item[link_arr[0]] == link_arr[1]){
                return true;
            }
        });
    }else{
        // 并且
        return link.link_if.every( (link_arr, index) => {
            if(link_arr[2] == '!=' ? item[link_arr[0]] != link_arr[1] : item[link_arr[0]] == link_arr[1]){
                return true;
            }else{
                return false;
            }
        });
    }
    console.log(link.match)
}

export default { linkIf }
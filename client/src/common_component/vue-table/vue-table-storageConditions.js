/**
 * vue-table 的历史搜索保存条件的相关方法
 */
var storageConditions = {
    toggleHisSide(offset){
        $('.frequently_used').animate({left:`+=${offset}px`},"fast");
        if(offset>0){
            $('.his_sidebar').slideUp("fast");
        } else {
            $('.his_sidebar').slideDown("fast");
        }
    },
    verticalDragStart(event){
        let ev = window.event || event;
        ev.dataTransfer.effectAllowed = 'move'
    },
    verticalDrag(event){
        let ev = window.event || event;
        // ev.preventDefault();  
        ev.dataTransfer.effectAllowed = 'move'  
        ev.dataTransfer.dropEffect = 'move'        
        if(ev.clientY !== 0){
            ev.currentTarget.parentNode.style.top = ev.clientY + "px";
        }
    },
    trigged(val){
        console.log("hello world!");
        console.log(val)
    
        if(typeof val === "undefined"){
            val = "未命名过滤器";
        }
        this.recordHistorySearch(val)
    },
    //开始历史搜索
    searchDirectly(index,directObj){
        let _self = this;
        let currUrl = window.location.hash.split("/")[window.location.hash.split("/").length-1];
        
        var searchParam;
        if(typeof index !== "undefined"){
            searchParam = JSON.parse(JSON.stringify(this.history_search[index]))
        } else {
            searchParam = directObj;
        }
        this.toggleServerView(searchParam.type);
        this.addAllBtns();
        
    
    
        if(this.params.param){     
            this.dataForm.condition_server.param = searchParam.condition;
        } else{
            this.dataForm.condition_server = searchParam.condition;
        }
    
        //全部从第一页搜起
        this.dataForm.quick_search['pageIndex'] = 1;
        this.dataForm.condition_server['pageIndex'] = 1;
        this.pageIndex = 1;
        if(currUrl == searchParam.operationUrl){
            this.watchDataForm(undefined,true);//搜索
            setTimeout(function(){
                _self.updateAfterSearch(searchParam.condition,searchParam.type,searchParam.cnidcache);//补完DOM
           },10)
        } else {
            // alert("该过滤器不属于本页面，请跳转到\"" + this.covertPathToChinese(this.history_search[index].operationUrl) + "\"页面搜索");
            sessionStorage.setItem('rescueManagement_toBeSearched',JSON.stringify(searchParam));
            
            this.$emit('emitDataForm',index,searchParam);
        }
       
       // this.rollBackDOM(index);
    },
    toggleServerView(view){
        // this.dataForm[this.serverView] = {};
    
        if(this.params.param){
            this.dataForm.condition_server.param = {};
        } else {
            if(this.dataForm.condition_server['pageSize'] || this.dataForm.condition_server['pageIndex']){
                this.dataForm.condition_server = {
                    pageSize:15,
                    pageIndex:1
                }
            } else {
                this.dataForm.condition_server = {}
            }
        }
     
        this.serverView = view;
    
    
        this.show_search_input = true;
        // 切换url
        this.Paging.setSearchUrl(this.itemUrl, "post", this.dataForm);
    
    },
    //记录搜索历史
    recordHistorySearch(userDefineName){
        console.log("名字参数",userDefineName)
        const self = this;
        let brandNewItem = {};
        if(this.dataForm.condition_server.param){
            brandNewItem = this.dataForm.condition_server.param
        } else{
            brandNewItem = this.dataForm.condition_server
        }
        // if(JSON.stringify(brandNewItem) === '{"pageIndex":1,"pageSize":15}' || JSON.stringify(brandNewItem) === '{}'){
        //     return;
        // }
    
        let _item = JSON.parse(JSON.stringify(brandNewItem))//断掉引用关系
        
        if(_item['pageIndex']){
            _item['pageIndex'] = 1;
        }
        if(_item['sort'] && _item['fieldName']){
            console.log("exec")
            delete _item['sort'];
            delete _item['fieldName'];
        }
        if(JSON.stringify(_item) === "{}" || JSON.stringify(_item) === "{pageSize='15',pageIndex='1'}"){
            alert("当前未选择任何约束条件");
        } else {
            $('#saveHisModal').modal('hide');
            self.historyRecordApi(_item,userDefineName);
        }
    },
    addAllBtns(){
        let _len = this.filterBtns_2.length
        this.filterBtns_2.forEach(
            (obj,index) => {
                this.nowBtns.push(this.filterBtns_2[index]);
            }
        )
        this.filterBtns_2.splice(0,_len);
    },
    //置顶搜索条件
    stickSearchDetail(ev,index){
        if(ev.stopPropagation){
            ev.stopPropagation()
        } else {
            window.event.cancelBubble = true;
        }
    },
    // 显示侧边栏的搜索条件
    emitSearchDetail(index){
        let _obj = JSON.parse(JSON.stringify(this.history_search[index]))
        this.showConditionPanel=index;
        this.his_detail_pool = "";
        if(JSON.stringify(_obj.condition) === "{}"){
            // this.his_detail_pool.push({theKey:"条件",theValue:"全部"})
            this.his_detail_pool = `<b>不限条件搜索</b>`;
        } else {
    
            if(_obj.condition['orgId'] && _obj.condition['otherOrgId']){
                _obj.condition['orgId'] = "其他公司";
                delete _obj.condition['otherOrgId'];
            }
            for (let i in _obj.condition){
                if(i == "pageSize" || i == "pageIndex" || i == "values"){
                    continue;
                }
    
                let _kv = util.matchAllNameForVTable(i,_obj.condition[i],_obj.cnidcache);
    
                // this.his_detail_pool.push(util.matchAllNameForVTable(i,_obj.condition[i]));
                if(_kv.theValue !== ""){
                    this.his_detail_pool += `<b>${_kv.theKey}:</b>${_kv.theValue}  <br />`;
                }
                
            }
        }
    
    },
    //删除搜索条件
    delSearchDetail(ev,index){
        const _self = this;
        if(ev.stopPropagation){
             ev.stopPropagation()
        } else {
            window.event.cancelBubble = true;
        }
       
        confirm("确定要删除这条记录吗",function(conf){
            if(!global.userId)return;
            if(conf){
                send({
                    type:'delete',
                    url:'order:/operation_record',
                    param:[global.userId,_self.history_search[index].operationId]
    
                    },function(err,res){
    
                    console.log(res)
                    if(res.status == 200){
                        _self.history_search.splice(index,1);
                        _self.showConditionPanel= -1;
                    }
                })
            }
        },false);
    },
    covertPathToChinese(path){
        switch(path){
            case "orderanagement": return "订单管理";
            case "taskTrip": return "行程任务";
            case "CurrentTask": return "当前任务";
            case "shareTask": return "分享任务";
            default: return path;
        }
    },
    updateAfterSearch(param,type,idCache){
        
        let _inputWithId_ = this.inputWithId;
        //生成需要清楚的多选框名
        let _chkbxs = this.nowBtns.filter(it=>it.isCheckbox);
        console.log(_chkbxs);
        //重置dom
        $('th.desc,th.asc').attr('class','sort');
        _chkbxs.forEach(it=>{
            this.$refs['btn_' + it.name][0].updateAllCheckToggle("_" + it.name,false)
        });
        this.currentRange = '';
        
        // this.$refs.startend.updateAllCheckToggle(name,false)
        if(type == "quick_search"){
            //先清空
            for (let item in this.domParam.quick){
                
                $('[name='+ item +']')
                    .val("")
                    .css('color', '#000');
            }
            //后赋值
            for (let qitem in param){
                if($('[name='+ qitem +']').length != 0){
                    $('[name='+ qitem +']')
                    .val(
                        util.matchAllNameForVTable(qitem,param[qitem]).theValue)
                    .css('color', '#000');
                }
            }
        } else {
            //condition_server
    
            //先清空
            for(let item in this.domParam.condition){
                  
                   if(item.indexOf('Time') !== -1){
                        $('[name=' + item + ']')
                            .val("")
                            // .css('color', '#1786f7');
                   } else {
                        let defName = $('[name=' + item + ']').attr('title');
                        $('[name=' + item + ']').html(defName)
                            .val("")//注册审核类型的条件快速混搭视图
                            // .css('color', '#1786f7')
                   }
            }
            if(param['orgId'] && param['otherOrgId']){
                param['orgId'] = "其他公司";
                delete param['otherOrgId'];
            };
    
            for(let citem in param){
                if($('[name='+ citem +']').length != 0){
                    if(citem.indexOf('Time') !== -1){
                        $('[name=' + citem + ']')
                            .val(new Date(param[citem]).Format("yyyy-MM-dd hh:mm"))
                            // .css('color','#1786f7');
                   } else {
    
                        $('[name=' + citem + ']')
                            .html(
                                util.matchAllNameForVTable(citem,param[citem],idCache).theValue)
                            .css('color','#1786f7')
                   }
                }
            }
        }
    
        for(let i in param){
            
            if(typeof i == "undefined"){
                continue;
            }         
        }   
    },
    fetchUnion(){
        const _self = this;
        let unionArr = ['QUERY_ORDER_MANAGEMENT','QUERY_CURRENT_TASK','QUERY_ROUTE_TASK','QUERY_SHARE_TASK'];
        let _currentOperationType = this.fetchPageForType(window.location.hash.split("/")[window.location.hash.split("/").length-1]);
        let _currentPathUplv = window.location.hash.split("/")[window.location.hash.split("/").length-2];
        if(!_currentOperationType  || _currentPathUplv !== "rescueManagement"){
            console.log("当前页面不支持搜索记录");
            this.historySearchEnable = false;
            return;
        } else {
            this.historySearchEnable = true;
        }
        for(let i = 0; i<unionArr.length; i++){
            send({
                type:'post',
                url:'order:/operation_record/list',
                param:{
                    "pageSize": 5,
                    "pageIndex": 1,
                    "operationType": unionArr[i]
                }
            },function(err,res){
                if(res.status===200){
                    _self.pushHisStack(res.content,"push");
                }
            });
        }
    },
    fetchPageForType(url){
        //为当前页面指定不同的历史请求参数
        switch(url){ 
            case "orderanagement": return "QUERY_ORDER_MANAGEMENT";//QUERY_ORDER_MANAGEMENT QUERY_CURRENT_TASK QUERY_ROUTE_TASK QUERY_SHARE_TASK
            case "CurrentTask": return "QUERY_CURRENT_TASK";
            case "accounting_order": return "QUERY_ACCOUNTING_ORDER";
            case "account_statement": return "QUERY_ACCOUNT_STATEMENT";
            case "income": return "QUERY_INCOME";
            case "expenditure": return "QUERY_EXPENDITURE";
            case "customer": return "QUERY_CUSTOMER";
            case "supplier": return "QUERY_SUPPLIER";
            case "employee": return "QUERY_EMPLOYEE";
            case "listVehicles": return "QUERY_LIST_VEHICLES";
            case "registration": return "QUERY_REGISTRATION";
            case "taskTrip": return "QUERY_ROUTE_TASK";
            case "shareTask": return "QUERY_SHARE_TASK";
            case "QUERY_ORDER_MANAGEMENT": return "orderanagement";
            case "QUERY_CURRENT_TASK": return "CurrentTask";
            case "QUERY_ROUTE_TASK": return "taskTrip";
            case "QUERY_SHARE_TASK": return "shareTask";
            default: return false;
        }
    },
    pushHisStack(res,push){
        const self = this;
    
        console.log("push his stack",res)
        res.forEach((item,index,result)=>{
            if(typeof item.queryConditions.userDefineName === "undefined"){
                item.queryConditions.userDefineName = "未命名过滤器";
            }
            let _obj = {
                created : item.created,
                operationType : item.operationType,
                operationUrl : this.fetchPageForType(item.operationType),
                operationId : item.userOperationRecordId,
                name : `[${this.covertPathToChinese(this.fetchPageForType(item.operationType))}] ` + item.queryConditions.userDefineName,
                type : item.queryConditions.type,
                condition : item.queryConditions.param,
                cnidcache : item.queryConditions.cnidcache
            }
    
            if(push === "push"){
                this.history_search.push(_obj)
            } else {
                this.history_search.unshift(_obj)
            }
    
        })
    
        this.history_search.sort(function(obj1, obj2){
            var time1 = obj1.created;
            var time2 = obj2.created;
            return time2 - time1;
        });
        if(this.history_search.length >= 15){
            this.history_search.pop();
        }
    },
    historyRecordApi(params,paramName){
        const _self = this;
        if(!global.userId)return alert('正在获取用户信息，请稍后再试');
        
        let _currentOperationType = this.fetchPageForType(window.location.hash.split("/")[window.location.hash.split("/").length-1])
        let _inputWithId_ = this.inputWithId;
        let _idkv_ = {};
    
        if(!_currentOperationType){
            console.log("当前页面不支持搜索记录");
            // this.historySearchEnable = false;
            return;
        } else {
            // this.historySearchEnable = true;
        }
    
        //碰到有ID的输入框，记下html并上传
        _inputWithId_.forEach((it)=>{
            if(it in params){
                _idkv_[params[it]] = $('[name='+it+']').html();
            }
        });
        console.log("params:::",global.userId)
        if(params.values){
            delete params.values;
        }
        send({
            type:'post',
            url:'order:/operation_record',
            param:{
                "userId": global.userId,
                "operationType": _currentOperationType,
                "name": _currentOperationType,
                "queryConditions":{
                    "userDefineName":paramName?paramName:"未命名过滤器",
    
                    "type":this.serverView,
                    param:params,
                    "cnidcache":_idkv_
                }
            }
        },function(err,res){
            console.log(res)
            if(res.status === 200){
                // window.confirm('保存成功',false,false);
                _self.historyFetchApi(1,"unshift");//记一条查一条
            } else{
    
            }
        })
    },
    historyFetchApi(pgSize,push){
        let size = pgSize || 1;
        let _self = this;
        let _currentOperationType = this.fetchPageForType(window.location.hash.split("/")[window.location.hash.split("/").length-1]);
        let _currentPathUplv = window.location.hash.split("/")[window.location.hash.split("/").length-2];
        if(!_currentOperationType  || _currentPathUplv !== "rescueManagement"){
            console.log("当前页面不支持搜索记录");
            this.historySearchEnable = false;
            return;
        } else {
            this.historySearchEnable = true;
        }
    
        send({
            type:'post',
            url:'order:/operation_record/list',
            param:{
                "pageSize": pgSize,
                "pageIndex": 1,
                "operationType": _currentOperationType
            }
        },function(err,res){
            if(res.status===200){
                console.log("搜索记录结果")
                console.log(res);
                _self.pushHisStack(res.content,push);
            } else {
                console.log(res);
            }
        });
    },
    clearRecord(){
        //BE CAREFUL..
        let _currentOperationType = "0"//this.fetchPageForType(window.location.hash.split("/")[window.location.hash.split("/").length-1])
        send({
            type:'post',
            url:'order:/operation_record/empty',
            param:{
                "pageSize": 10,
                "pageIndex": 1,
                "operationType": _currentOperationType
            }
        },function(err,res){
            console.log(res)
        })
    }
}

export default storageConditions;
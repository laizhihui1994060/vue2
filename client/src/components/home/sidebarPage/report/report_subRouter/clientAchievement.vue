<template>
    <div class="right_content">
    <div class="lite_search_wrap">
        <lite-filter-search 
            ref='liteFilterRef'
            :filterInput="filterInput"
            :filterBtns="filterBtns"
            :rightBtns="[{text:'下载表格',funcName:'downloadnote'}]"
            :isQuickSearch="false"
            :enableTimeRange="true"
            :startEndClass="{start:'startDate',end:'endDate'}"
            @paramSubmit="requestDriverNotes"
            @rightBtnEmit="proccessEmit"
            ></lite-filter-search>
    </div>
        <iframe 
            id="clientAchievement" 
            width="100%" 
            :height="iframeHeight" 
            frameborder="0" 
            seamless="seamless" 
            scrolling="x" 
            allowtransparency="true"
            style="background-color:#f4f4f4"
            :src="iframeSrc"></iframe>
        <div class="modal fade" id="downloadModal" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
            <div class="modal-dialog">
                <div class="row dialog_title">
                    <h4 for="xlsxName" class="col-xs-offset-2">表格名称</h4>
                </div>
                <div class="row">
                    <div class="input-group col-xs-8 col-xs-offset-2">
                        <input 
                            type="text" 
                            tabindex="0" 
                            id="xlsxName" 
                            class="form-control" 
                            :value="iframeFileName" 
                            placeholder="请输入表格名称" 
                            aria-describedby="basic-addon2" />
                        <span class="input-group-addon" id="basic-addon2">.xlsx</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="btns">
                    <button type="button" class="btn" @click="confirmDownload">确认下载</button>
                    <button type="button" class="btn" data-dismiss="modal">关闭窗口</button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import btnSelect from "../../../../../common_component/btn_select.vue";
import startEndTime from "../../../../../common_component/startEndTime.vue";
import vueTable from "../../../../../common_component/vue-table.vue";
import liteFilterSearch from "../../../../../common_component/liteFilterSearch.vue";

export default {
    props:{
        
    },
    components:{
       vueTable,
       liteFilterSearch
    },
     data () {
        return {
            iframeHeight:(document.body.clientHeight - 200)+ "px",
            iframeSrc:config.globalIframeSrc + "/report/export?param=%7B%22formatType%22%3A%22HTML%22%2C%22fileName%22%3A%22123%22%2C%22startDate%22%3A%221491580800000%22%2C%22endDate%22%3A%221496851200000%22%2C%22reportType%22%3A%22" + "CUSTOMER_ORDER_REPORT" + "%22%2C%22tenantId%22%3A%22cd2fc4c9-ef06-4e78-90bd-b61265a1ca80%22%2C%22orgId%22%3A%22333ba6a5-746b-49fb-9605-91750b448575%22%7D",
            iframeParam:{},
            iframeFileName:"",
            filterBtns:[
                // {
                //     title:'业务类型',
                //     name:'type',
                //     filter:"SVC_NAME",
                //     url:"/item"  
                // },
                // {
                //     title:'职位',
                //     name:'position',
                //     filter:"POSITION",
                //     url:"/item"  
                // },
            ],
            filterInput:[
                // {
                //     name:"orderNo",
                //     label:'员工编号'
                // }
            ],
            linkBtn:[
               
            ],
            rightBtn:[
              
            ]
        }
      },
    created(){
         const self = this;
        if(global.tenantId){
            this.iframeSrc = config.globalIframeSrc + "/report/export?param=%7B%22formatType%22%3A%22HTML%22%2C%22fileName%22%3A%22123%22%2C%22startDate%22%3A%221491580800000%22%2C%22endDate%22%3A%221496851200000%22%2C%22reportType%22%3A%22CUSTOMER_ORDER_REPORT%22%2C%22tenantId%22%3A%22" +  global.tenantId +"%22%2C%22orgId%22%3A%22" + global.ourOrgId +"%22%7D";
            
        }else{
            setTimeout(function() {
                self.iframeSrc = config.globalIframeSrc +  "/report/export?param=%7B%22formatType%22%3A%22HTML%22%2C%22fileName%22%3A%22123%22%2C%22startDate%22%3A%221491580800000%22%2C%22endDate%22%3A%221496851200000%22%2C%22reportType%22%3A%22CUSTOMER_ORDER_REPORT%22%2C%22tenantId%22%3A%22" +  global.tenantId +"%22%2C%22orgId%22%3A%22" + global.ourOrgId +"%22%7D";

            }, 1000);
        }
    },
    methods:{
        toggleText(data){
            this.color = '#333';
            this.text = data;
        },
        
        integrationDate(name, item){
            this.res[name]= item;
            console.log(this.res);
        },
        setIframeCSS(){
            // const self = this;
            var ele = $('#clientAchievement').css('height');
            console.log("ELE",ele);
        },
        getIframeDocument (element){
            var frame =  element.contentDocument || element.contentWindow.document;
            cconsole.log(frame)   
        },
        URIToJSON(){
            this.iframeParam = JSON.parse(decodeURIComponent(this.iframeSrc.split("=")[1]));
            return this.iframeParam;
        },
        JSONToURI(obj){
           
            let param, theUrl = config.globalIframeSrc + "/report/export" || "http://192.168.8.25:7856/v1/report/export";
            console.log("拼接后的url",theUrl)
            if(obj){
                param = encodeURIComponent(JSON.stringify(obj))
            } else {
                param = encodeURIComponent(JSON.stringify(this.iframeParam))
            }
            console.log(theUrl +  "?param=" + param)
            return theUrl +  "?param=" + param;
        },
        requestDriverNotes(param){
            this.iframeSrc = this.JSONToURI(param)
        },
        proccessEmit(event,name){
            if(name == "downloadnote"){
                if(0){
                    return alert("当前表格不存在");
                }
                this.openDownLoadModal()
            }
        },
        openDownLoadModal(){
            $('#downloadModal').modal('show');
            console.log("打开下载模块")
        },
        confirmDownload(){
            let fileName = $('#xlsxName').val()
            if(fileName.trim() === ""){
                return alert("请输入文件名");
            } else if(/[\\\/:\*\?<>|]/.test(fileName)){
                return alert("文件名不能包含字符：\"\\/:*?<>|\"");
            } else{
                $('#downloadModal').modal('hide');
                let filePath = this.URIToJSON();
                filePath['fileName'] = fileName;
                filePath['formatType'] = "XLSX"
                window.open(this.JSONToURI(filePath))
            }
        },
        setModalConfig(){
            var _nameTime = this.URIToJSON(this.iframeSrc);
            var __starName = new Date(parseInt(_nameTime['startDate'])).Format("yyyyMMdd");
            var __endName = new Date(parseInt(_nameTime['endDate'])).Format("yyyyMMdd");
            this.$refs.liteFilterRef.params = this.URIToJSON(this.iframeSrc);
            this.iframeFileName = "客户订单" + __starName + "-" + __endName
            $('#downloadModal').on('shown.bs.modal', function () {
                $('#xlsxName').focus().select()
            })
        }
        
    },
    filters: {
        
    },
    watch: {
        iframeSrc:function(newVal,oldVal){

            this.setModalConfig()
        }
    },
    mounted(){
        const self = this;
        this.$nextTick(()=>{
            // self.getIframeDocument($('#clientAchievement')[0]);
            self.$refs.liteFilterRef.$refs.startEndRef.changeDateInputs("foooooo","startDate","endDate","MONTH")
            // self.$refs.liteFilterRef.$refs.currentRange = "MONTH"
            console.log($('#clientAchievement')[0])
            
       });
    }
}
  
</script>

<style scoped>
#downloadModal{
    margin: 0 auto;
    margin-top: 200px;
    width: 500px;
    height: 200px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 0 #000;
}
#downloadModal .modal-dialog{
    padding-top:30px;
    width: 500px;
    height: 120px;
    margin: 0;
}
.modal-dialog .dialog_title{
    margin: 10px 0;
}
.lite_search_wrap{
    margin-left: 1.7%;
}
</style>

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
                :rangeConfigP="rangeConfig"
                @paramSubmit="requestDriverNotes"
                @rightBtnEmit="proccessEmit"
                ></lite-filter-search>
        </div>
        
        <template v-if="iframeSrc">
            <iframe 
                :id="iframeId" 
                width="100%" 
                :height="iframeHeight" 
                frameborder="0" 
                seamless="seamless" 
                scrolling="x" 
                allowtransparency="true"
                style="background-color:#f4f4f4"
                :src="iframeSrc"></iframe>
        </template>
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
        report_title:{
            type:String,
            default:"表格"
        },
        reportType:{
            type:String,
            default:"EMPLOYEE_OUTPUT_VALUE_REPORT"
        },
        iframeId:{
            type:String,
            default:"employeeAchievement"
        },
        rangeConfig:{
            type:Array,
        }
    },
    components:{
       vueTable,
       liteFilterSearch
    },
     data () {
        return {
            iframeHeight:(document.body.clientHeight - 200)+ "px",
            iframeSrc:"",
            iframeParam:{},
            iframeFileName:"",
            filterBtns:[
              
            ],
            filterInput:[
               
            ],
            linkBtn:[
               
            ],
            rightBtn:[
              
            ]
        }
    },
    created(){
        const self = this;
        var strd = util.getRange("MONTH").start
        var endd = util.getRange("MONTH").end
        if(global.tenantId){
            var gyk = 'http://192.168.8.122:8801/v1'
            // config.globalIframeSrc = gyk
            this.iframeSrc = config.globalIframeSrc +  "/report/export?param=%7B%22formatType%22%3A%22HTML%22%2C%22fileName%22%3A%22123%22%2C%22startDate%22%3A%22" + endd + "%22%2C%22endDate%22%3A%22" + strd + "%22%2C%22reportType%22%3A%22" + this.reportType + "%22%2C%22tenantId%22%3A%22" + global.tenantId +"%22%2C%22orgId%22%3A%22" + global.ourOrgId + "%22%7D";

        }else{
            setTimeout(function() {
                var gyk = 'http://192.168.8.122:8801/v1'
                // config.globalIframeSrc = gyk
                self.iframeSrc = config.globalIframeSrc + "/report/export?param=%7B%22formatType%22%3A%22HTML%22%2C%22fileName%22%3A%22123%22%2C%22startDate%22%3A%22" + strd +  "%22%2C%22endDate%22%3A%22" + endd + "%22%2C%22reportType%22%3A%22" + self.reportType + "%22%2C%22tenantId%22%3A%22" + global.tenantId +"%22%2C%22orgId%22%3A%22" + global.ourOrgId + "%22%7D";

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
            var ele = $('#' + this.iframeId).css('height');
            // console.log("ELE",ele);
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
            let param
            let url = config.globalIframeSrc + "/report/export";
            if(obj){
                param = encodeURIComponent(JSON.stringify(obj))
            } else {
                param = encodeURIComponent(JSON.stringify(this.iframeParam))
            }
            console.log(url +  "?param=" + param)
            return url +  "?param=" + param;
        },
        requestDriverNotes(param){
            this.iframeSrc = this.JSONToURI(param)
        },
        proccessEmit(event,name){
            if(name == "downloadnote"){
                this.openDownLoadModal()
            }
        },
        openDownLoadModal(){
            $('#downloadModal').modal()
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
            console.log("setted")
            var _nameTime = this.URIToJSON(this.iframeSrc);
            var __starName = new Date(parseInt(_nameTime['startDate'])).Format("yyyyMMdd");
            var __endName = new Date(parseInt(_nameTime['endDate'])).Format("yyyyMMdd");
            this.$refs.liteFilterRef.params = this.URIToJSON(this.iframeSrc);
            this.iframeFileName = this.report_title + __starName + "-" + __endName
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
        console.log("报表种类",this.reportType)
        this.$nextTick(()=>{
            self.$refs.liteFilterRef.$refs.startEndRef.changeDateInputs("foooooo","startDate","endDate","MONTH")
            self.setIframeCSS()
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

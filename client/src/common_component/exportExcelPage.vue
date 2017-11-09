<template>

<!-- Modal -->
    <div class="modal fade" id="exportExcelPage" tabindex="-1" role="dialog" aria-labelledby="cancel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title text-center baoshu" id="myModalLabel">Excel导出配置<small style="color:red">(数据超过1000条将分批导出)</small></h4>
                </div>
                <div class="modal-body">
                    <div v-for="(data,index) in excelDate.displayField" :key="index" class="setWidth">
                        <checkbox 
                            :text="data.tr" 
                            style="margin-right:0"
                            direction="left"
                            label-left="2px"
                            :value="data.tr"
                            :name="data.field + 'excel'" 
                            @updata="integrationDate"/>
                    </div>
<!--                     <div 
                        v-for="(data,index) in excelDate.displayNumberOff" 
                        v-if="excelDate.displayNumberOff.length !==0" 
                        class="setWidth">
                        <checkbox 
                            :text="data.tr" 
                            style="margin-right:0"
                            direction="left"
                            label-left="2px"
                            :value="data.tr"
                            :name="data.field" 
                            @updata="integrationDate"/>
                    </div> -->
                </div >
                <div class="modal-footer">
                    <div class="pull-left">
                         <checkbox 
                            text="全选" 
                            style="margin-right:0"
                            direction="left"
                            label-left="2px"
                            name="excel_all" 
                            @updata="integrationDate"/>
                    </div>
                    <div class="btns pull-right">
                        
                        <button type="button" class="btn"  @click="exportExcel" >导出数据</button>
                        <button type="button" class="btn"  data-dismiss="modal">关闭窗口</button>
                    </div>
                </div>
            </div>
        </div>
        <table id="exportExcelTable" style='display:none'></table>
        <a id="dlink"></a>
    </div>
</template>

<script>
import excel from '../../static/js/excel.js'
import  checkbox from "./checkbox.vue";


    export default {
        props:{
            excelDate:{
                type:Object
            }
        },
        components:{
            checkbox
        },
        data () {
            return {
                dataForm:{},
                data:[]
            }
        },
        methods:{
            integrationDate(name,value){
                console.log(name,value)
                if(name == 'excel_all'){
                    $('#exportExcelPage').find('[type="checkbox"]').each(function(index, el) {
                        el.checked = value 
                    });
                }else{
                    if(!value)$('#exportExcelPage').find('[name="excel_all"]')[0].checked=false;
                }
            },
            exportExcel(){
                let exportExcelArr = [];
                const self = this;
                $('#exportExcelPage .modal-body').find('[type="checkbox"]').each(function(index, el) {

                    if(el.checked){
                        self.excelDate.displayField.some((item)=>{

                            if(item.tr == el.value)exportExcelArr.push(item);    
                        });
                    }
                });
                this.dataForm.pageSize = 1000;
                this.dataForm.pageIndex = 1;
                console.log(this.dataForm);

                this.data = [];

                if(this.excelDate.url){
                    this.send(function(data){
                        self.forEachData(data,exportExcelArr)
                    });

                }else{
                    this.excelDate.fn(exportExcelArr,self.excelDate.data,self.excel)
                }
            },

            send(cb){
                $('#main_loading').show();
                const self = this;
                 send({
                    url:this.excelDate.url,
                    type:this.excelDate.method,
                    param:this.dataForm
                },function(err,res){
                    console.log(err,res,self.dataForm.pageIndex,res.pageCount)
                    if(err)return console.log(err);
                    if(res.status == 200 || res.status == 404){

                        if(res.pageCount > 1 ){
                            if(self.dataForm.pageIndex < res.pageCount){
                                ++self.dataForm.pageIndex;
                                self.send(cb);
                            }else{
                                $('#main_loading').hide();
                            }
                        }else{
                            $('#main_loading').hide();
                        }
                        cb( res.content ? res.content : [] );

                    }

                });
            },

            forEachData(data,exportExcelArr){
                const self = this;
                let obj = {
                    setOutExpense:{},
                    returnExpense:{}
                };
                let isNumber = false;
                let exportExcelTable = $('#exportExcelTable')[0],
                    TH = '',
                    TR = '',
                    TD = '';


                exportExcelTable.innerHTML = '';

                exportExcelArr.forEach(function(el,index){
                    TH += `<th>${el.tr}</th>`;
                });

                exportExcelTable.innerHTML += `<tr>${TH}</tr>`;

                data.forEach(function(data_item,index){
                    TD = '';

                    exportExcelArr.forEach(function(exportExcel_item,exportExcel_index){

                        if(exportExcel_item.filter == 'setOutExpense' || exportExcel_item.filter == 'returnExpense' ){

                            if(!isNumber)isNumber = true;

                            if( data_item[exportExcel_item.filter]){

                                data_item[exportExcel_item.filter].forEach((item,index)=>{

                                    if( obj[exportExcel_item.filter][item.codeName] ){

                                        let  amountCash = item.amountCash ? item.amountCash :0;
                                        let  amountSign = item.amountSign ? item.amountSign :0;

                                        obj[exportExcel_item.filter][item.codeName].aCash += amountCash;
                                        obj[exportExcel_item.filter][item.codeName].aCash += amountSign;

                                    }else{
                                        obj[exportExcel_item.filter][item.codeName] = {
                                            aCash: item.amountCash ? item.amountCash :0,
                                            aSign: item.amountSign ? item.amountSign :0
                                        }
                                    }
                                });
                            }

                        }
                       

                        TD += `<td>${exportExcel_item.text ?exportExcel_item.text :  exportExcel_item.filter ? self.$parent.transformation(exportExcel_item,data_item): typeof data_item[exportExcel_item.field] == 'boolean' ?
                        data_item[exportExcel_item.field] ? '是':'否' : data_item[exportExcel_item.field] ? data_item[exportExcel_item.field] : ''}</td>`;
                    });
                    TR += `<tr>${TD}</tr>`;
                });

                exportExcelTable.innerHTML += TR;


                if(isNumber){

                    let setOutExpenseHTML = '';
                    let returnExpenseHTML = '';
                    let setOutExpenseCash = 0;
                    let setOutExpenseSign = 0;
                    let returnExpenseCash = 0;
                    let returnExpenseSign = 0; 

                    for(let i in obj){
                        if(i  == 'setOutExpense'){
                            for(let j in obj[i]){
                                for(let z in obj[i][j]){
                                    setOutExpenseHTML += `${ z === 'aCash' ? j + '(现金合计：)' + obj[i][j][z] : j + '(签单合计：)' + obj[i][j][z]  }<br/>`;
                                    z === 'aCash' ? setOutExpenseCash += obj[i][j][z] : setOutExpenseSign += obj[i][j][z];
                                }

                            }
                        }else if(i == 'returnExpense'){
                            for(let j in obj[i]){
                                for(let z in obj[i][j]){
                                    returnExpenseHTML += `${ z === 'aCash' ? j + '(现金合计：)' + obj[i][j][z] : j + '(签单合计：)' + obj[i][j][z]  }<br/>`;
                                    z === 'aCash' ? returnExpenseCash += obj[i][j][z] : returnExpenseSign += obj[i][j][z];
                                }
                            }
                        }
                    }

                    let forTd = '';

                    for(let i =0 ;i< exportExcelArr.length-2;i++){
                        forTd += '<td></td>';
                    }

                    forTd += `<td>${setOutExpenseHTML + '所有费用(现金合计：)' + setOutExpenseCash   + '<br/>' + '所有费用（签单合计：）' +  setOutExpenseSign}</td>`  + `<td>${returnExpenseHTML + '所有费用(现金合计：)' + returnExpenseCash   + '<br/>' + '所有费用（签单合计：）' + returnExpenseSign}</td>`;

                     exportExcelTable.innerHTML += forTd;
                }
                

                self.excel(this.excelDate.filename);
            },
            excel(filename){

                excel('exportExcelTable', 'name' ,filename+ new Date().toLocaleString() + '.xls');
            },
            setParam(param){
                this.dataForm = JSON.parse(JSON.stringify(param['condition_server']));
                console.log(param)
            }
        }
    }
 

</script>
<style scoped>
    .setWidth{
        width: 123px;
        display: inline-block;
    }
    .modal-body{
        padding: 30px;
        padding-right: 10px;
    }
    .modal.in .modal-dialog{
        width: 536px;
    }
   .modal-header h4{
        color: #FF6B0E;
   }
   #exportExcelPage .modal-header, #exportExcelPage .modal-footer{
        border-width: 1px;
        padding:24px 30px; 
   }
   .btns button:nth-child(2){
        margin-left: 16px;
   }
</style>
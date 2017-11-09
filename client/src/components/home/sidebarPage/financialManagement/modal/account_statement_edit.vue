
  <template>
  	<div id="account_statement_edit">
  		
              <breadcrumb
                  :text="informtion.reconciliationCode"
                  :arr="[{path:'/LoginFinish/financialManagement/account_statement',text:'对账单'},{path:'',text: informtion.reconciliationCode}]"/>
  			<div class="clearfix dingwei">
  				<div class='pull-right' style='margin-right:20px'>
  					<button class='btn radius-btn'  data-toggle="modal"  data-target="#table" href="javascript:;"  style='background:#fff' @click="accountStatementExcelView">下载对账单</button>
  				</div>
  			</div>
              <div class='main' style="overflow: hidden">
                  <article style="cursor:pointer;" @click='showDetails($event)'>
                      对账单信息<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                  </article>
                      
                  <div class='details'>
                     <div class='row'>
                       <div class='col-sm-12'>
                         <span v-if='informtion.notReceivedTotalAmt > 0' style='color:red;'>
                            {{'欠款：' + informtion.notReceivedTotalAmt + '元'}}
                         </span>
                         <span v-else style="color:blue">
                            结清
                         </span>
                       </div>
                     </div>
                      <div class='row'>
                          <div class='col-sm-3'>
                              <label>账单编号：</label><span v-text="informtion.reconciliationCode"></span>
                          </div>
                          <div class='col-sm-3'>
                              <label>对账类型：</label><span v-text="customerType"></span>
                          </div>
                          <div class='col-sm-3'>
                              <label v-text="customerType + '名称：'"></label><span v-text="customerName"></span>
                          </div>
                          <div class='col-sm-3'>
                              <label>创建时间：</label><span v-text="data(informtion.created)"></span>
                          </div>
                      </div>

                      <div class='row'>
                          <div class='col-sm-3'>
                              <label>创&nbsp;建&nbsp; 人：</label>
                              <template v-for="it in informtion.userInfo" v-if="it.userId == informtion.createdBy">
                                  <span v-text="it.empName"></span>
                              </template>
                          </div>
                          <div class='col-sm-3'>
                              <label>总救援费用（现金）：</label><span v-text="informtion.totalCashAmt ? informtion.totalCashAmt : 0"></span>
                          </div>
                          <div class='col-sm-3'>
                              <label>总救援费用（签单）：</label><span v-text="informtion.totalAmt ? informtion.totalAmt : 0"></span>
                          </div>
                          <div class='col-sm-3'>
                              <label>减免金额：</label><span class="valAnimateBind" v-text="informtion.writeOffAmt"></span>
                          </div>
                      </div>

                      <div class="row">
                          <div class='col-sm-3'>
                              <label>对账单总额：</label><span class="valAnimateBind" v-text="informtion.receivableTotalAmt"></span>

                          </div>
                          <div class="col-xs-3"  v-if='customerType == "客户"'>
                              <label>信&nbsp;息&nbsp; 费：</label><span v-text="informtion.commissionTotalAmt"></span>
                          </div>
                          <div class="col-xs-3"  >
                              <label>已收金额：</label><span v-text="informtion.receivedTotalAmt"></span>
                          </div>
                      </div>

                  </div>

                  <template>
                     <article style="cursor:pointer;" @click='showDetails($event)'>

                          减免记录<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                      </article>
                      <div class='details'>
                          <button class="pull-right btn  radius-btn" v-if="!isConfirmed" data-toggle="modal" @click="open('#addReduction')" data-target="#addReduction">添加减免</button>
                          <div class="row">
                              <div class="col-xs-12">
                                  <h3 v-if="!reduceRecord.length" class='text-center'>暂无减免记录</h3>
                                  <table class="table nor_date_table table-bordered" style='width:100%;' v-else>
                                      <thead> 
                                          <tr>
                                              <th>创建人</th>
                                              <th>减免金额</th>
                                              <th>减免原因</th>
                                              <th>创建时间</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="i in reduceRecord">
                                              <td v-text="i.userInfo.empName"></td>
                                              <td v-text="i.reliefAmount"></td>
                                              <td v-text="i.reason"></td>
                                              <td v-text="data(i.created)"></td>

                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>

                  </template>


                  
                  <article style="cursor:pointer;" @click='showDetails($event)'>
                      开票列表<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                  </article>
                  <div class='details'>
                      <router-link tag="button" class="pull-right btn  radius-btn" :to="{ name: 'account_statement_invoice_register', params: { isCreate: true,id:partnerId + '|' + finReconId + '|' + informtion.reconciliationCode }}">开票登记</router-link>
                      <div class="row">
                          <div class="col-xs-12">
                              <h3 v-if="!registerList.length" class='text-center'>暂无开票信息</h3>
                              <table class="table nor_date_table table-bordered" style='width:100%;' v-else>
                                  <thead> 
                                      <tr>
                                          <th>发票编号</th>
                                          <th>发票类型</th>
                                          <th>发票金额</th>
                                          <th>开票日期</th>
                                          <th>开票人</th>
                                          <th>寄送人</th>
                                          <th>寄送日期</th>
                                          <th class="text-center">操作</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="(i,index) in registerList">
                                          <td v-text="i.invoiceBookNo"></td>
                                          <td v-text="i.invoiceItemName"></td>
                                          <td v-text="i.invoicingAmt"></td>
                                          <td v-text="data(i.invoicingDate,true)"></td>
                                          <td v-text="i.userInfo && i.userInfo ?  i.userInfo[0].empName:''"></td>
                                          <td v-text="i.mailReceiveName"></td>
                                          <td v-text="data(i.mailDate)"></td>
                                          <td ><button v-if="!i.abandoned" class="btn" style="border-radius: 25px;" @click="toVoid(i,index)">作废</button><span v-else>(已作废)</span><button v-if="!i.abandoned && 0" class="btn"  style="border-radius: 25px;">冲红</button></td>

                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                      
                  </div>
                  <div>
                      <div class="row"  v-if="registerList.length"> 
                          <div class="col-xs-12" >
                              <div class='clearfix' style='border:1px solid #eee;padding:5px;'>
                                  <div class="col-xs-2">
                                      <div>
                                          <span style='color:#999;'>开票总额</span>
                                          <span style='color:#999;' v-text="informtion.invoicedTotalAmt ? informtion.invoicedTotalAmt : '0' + '元'"></span>
                                      </div>                    
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- 案件列表 -->
                  <article style="cursor:pointer;" @click='showDetails($event)'>
                      案件列表<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                  </article>
                  <div class='details'>

                      <button class="pull-right btn" data-toggle="modal" @click="open('#addCase');clearCheckbox()" data-target="#caseList">添加案件</button>

                      <div class="row">
                      	<div class="col-xs-12">
                              <h3 v-if="!caseList.length" class="text-center">暂无案件记录</h3>
                      		<table class="table table-bordered"  style='width:100%;' v-else>
                      		    <thead> 
                      		      <tr>
                                    <th>业务类型</th>
                                    <th>订单编号</th>
                      		        <th>签单</th>
                      		        <th>信息费</th>
                      		        <th>案件号</th>
                                    <th>完成时间</th>
                      		        <th v-if='!isConfirmed'>操作</th>
                      		      </tr>
                      		    </thead>
                      		    <tbody>
                      		        <tr v-for="(i,index) in caseList">
                                                <td v-text="i.towOrderInfo ? matchJobType(i.towOrderInfo.jobType): ''"></td>
                                                <td v-text="i.towOrderInfo ? i.towOrderInfo.orderCode: ''"></td>
                            		      <td v-text="i.towOrderInfo ? i.towOrderInfo.charge:0"></td>
                            		      <td >
                                                      <span v-if='!isConfirmed'>

                                                          <input type="text" style="width: 30px;margin-left:0;padding-right:0;border:none;" :name="'caseIndex' + index" :value="i.commissionTotalAmt" disabled="disabled" @blur="saveCommission($event,index)" @>
                                                          <img class="edit_span" @click="editCommission($event,index)" width="18px" :src="editIcon" />

                                                      </span>
                                                      <span v-else v-text='i.commissionTotalAmt'></span>
                                                  </td>

                          		              <td v-text="i.towOrderInfo ? i.towOrderInfo.customerCaseNo: ''"></td>
                                                <td v-text="i.towOrderInfo ?data(i.towOrderInfo.completeTime):''"></td>
                                                <td v-if='!isConfirmed'><button  class="btn"  style="border-radius: 25px;" @click="removeCase(index)">移除案件</button></td>
                      		        </tr>
                      		    </tbody>
                      		</table>
                      	</div>
                      </div> 
                  </div>
                      
                  <article style="cursor:pointer;" @click='showDetails($event)'>
                      收款记录<span class='img up' style='display: inline-block;position: relative; left:10px;top:-2px'></span>
                  </article>
                  <div class='details'>
                      <button class="pull-right btn"  data-toggle="modal" @click="open('#account_statement_receipt_add');openModal('#account_statement_receipt_add')">添加收款记录</button>
                      <div class="row">
                      	<div class="col-xs-12">
                              <h3 v-if="!receivablesList.length" class="text-center">暂无收款记录</h3>
                      		<table class="table nor_date_table table-bordered" style='width:100%;' v-else>

                      		    <thead> 
                      		        <tr>
                      		            <th>收款单号</th>
                      		            <th>收款日期</th>
                      		            <th>收款方式</th>
                      		            <th>收款金额</th>
                      		            <!-- <th>发票号码</th> -->
                      		            <th>操作员工</th>
                      		            <th>备注</th>
                                                <th v-if='isConfirmed'>操作</th>
                      		        </tr>
                      		    </thead>
                      		    <tbody>
                      		        <tr v-for="i in receivablesList">
                      		            <td v-text="i.receivesCode"></td>
                      		            <td v-text="data(i.receiveDate,true)"></td>
                      		            <td v-text="matchPayMethod(i.payMethod)"></td>
                      		            <td v-text="i.receiveAmt"></td>
                      		            <!-- <td v-text="i.invoiceNo"></td> -->
                      		            <td v-text="i.userInfo && i.userInfo.length ? i.userInfo[0].empName : ''"></td>
                      		            <td v-text="i.remark"></td>
                                                <td v-if='isConfirmed'>
                                                      <button  v-if='!i.confirmedBy' class="btn"  style="border-radius: 25px;" @click="checkIncome(i.receivesId, i.remark)">审核</button>
                                                      <span v-else>已审核</span>
                                                </td>
                      		        </tr>
                      		    </tbody>
                      		</table>
                      	</div>
                      </div>
                  </div>

<!--                   <article class='account_up' @click='showDetails'>对账单修改日志<i ></i></article>
                  <div class='details'>
                       <div class="row">
                       	<div class="col-xs-12">
                       		<inputText 
                      			    name='textarea' 
                      			    inputWidth='100%'
                      			    :disabled='true'
                      			    value='将字段FF的内容，从“DDD”改为“EEEE”, [刘备－20170213-17:00:00]'
                      			    />
                           	</div>
                       </div> 
                  </div> -->
              </div>
              <div class="btns" id="btns">
                  <!-- <button class="btn" @click="modify" v-if="isCustomer == 1 ||isCustomer == 3">修改</button> -->
                  <button class="btn" @click="check('CHECK')" v-if="isCustomer == 1  && !isConfirmed ||isCustomer == 3  && !isConfirmed  ">审核</button>
                  <button class="btn" @click="check('SEND')" v-if="isCustomer == 1 && !sentBy || isCustomer == 3 && !sentBy ">发送给上游</button>
                  <button class="btn" @click="check('ACCEPT')" v-if="isCustomer == 2 && !acceptBy">接受</button>
                  <button class="btn" onclick='javascript:history.go(-1)' >返回</button>
              </div>
              <!-- <account-statement-table :caseList="caseList" :informtion="informtion"/> -->
              <export-excel-page :excelDate="excelDate"/>
              <case-list 
                  ref="caseRef"
                  :caseList="caseList" 
                  :matchJobType="matchJobType"
                  :data="data"
                  @list="replacEcaseList"
                  @generate="postCase"/>

              <account-statement-receipt-add :finReconId="finReconId" :customerName="customerName" :partnerId='partnerId' @updata="receiptUpdata"/>
              <add-reduction ref="addReductionModal" @reductionadded="refreshRecuceRecord" :finReconId="finReconId" :partnerId="partnerId"/>
  	</div>
  </template>

  <script>


  import formLabelInput from '../.././../../../common_component/form-label-input.vue'
  import breadcrumb from "../.././../../../common_component/breadcrumb.vue";
  import btnSelect from '../../../../../common_component/btn_select.vue'
  import datetimepicker from '../../../../../common_component/datetimepicker.vue'
  import inputText from '../../../../../common_component/inputText.vue'
  import accountStatementTable from '../../../../../common_component/table.vue'
  import exportExcelPage from '../../../../../common_component/exportExcelPage.vue'
  import caseList from '../modal/caseList.vue'
  import accountStatementReceiptAdd from '../modal/account_statement_receipt_add.vue'
  import addReduction from '../modal/addReduction.vue'
  import editIconPath from '../../../../../assets/edit.png'


      var receivableTotalAmt = 0
      export default{
          components:{
              btnSelect,
              datetimepicker,
              formLabelInput,
              breadcrumb,
              inputText,
              accountStatementTable,
              exportExcelPage,
              caseList,
              accountStatementReceiptAdd,
              addReduction
          },
          data(){
              return {
                  editIcon: editIconPath,
                  informtion: {
                      reconciliationCode:''
                  },
                  res: {},
                  isCreate: true,
                  finReconId:'',//对账单ID
                  partnerId:'',
                  registerList:[],
                  caseListRange:false,
                  caseList:[],
                  caseListAll:[],
                  receivablesList:[],
                  customerId:'' ,
                  disabled:'disabled',
                  mount:0,
                  isModify:false,
                  isDisabled:false,
                  isConfirmed:'',
                  sentBy:'',
                  acceptBy:'',
                  isCustomer:'',
                  customerType:'',
                  customerName:'',
                  orderParams:{},//案件参数
                  reduceRecord:[],
                  excelDate:{
                      data:[],
                      fn:function(exportExcelArr,data,cb){
                          console.log(data)
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
                                  let str = '';
                                  if(exportExcel_item.field3){
                                      str = data_item[exportExcel_item.field1][exportExcel_item.field2] ? data_item[exportExcel_item.field1][exportExcel_item.field2][exportExcel_item.field3]: '';
                                  }else if(exportExcel_item.field2){
                                      str = data_item[exportExcel_item.field1] ? data_item[exportExcel_item.field1][exportExcel_item.field2] : '';
                                  }else if(exportExcel_item.field1){
                                      str = data_item[exportExcel_item.field1];
                                  }else {
                                      str = '';
                                  }
                                  if(exportExcel_item.filter == 'date'){
                                      str = str ? util.getLocalTime(str) : '';
                                  }else if(exportExcel_item.filter == 'arr'){
                                      str = str && str.length ? str[0][exportExcel_item.arrField] : '';
                                  }else if(exportExcel_item.filter == 'jobType'){
                                      str = str ? util.matchRescueType(str).cn : '';
                                  }else if(exportExcel_item.filter == 'orderStatus'){
                                      str = str ? util.matchOrderStatus(str) : '';
                                  }else if(exportExcel_item.filter == 'towJobFeedBacks'){
                                      let string = '';
                                      if(str){
                                          str.forEach(function(item){
                                              if(item.driveRoute === exportExcel_item.filter2){
                                                  let cash = item['confirmedAmountCash'] != null ? '现金' : '';
                                                  let sign = item['confirmedAmountSign'] != null ? '签单' : '';

                                                  if(cash) string += `${item['feeChinese']}(${cash}${item['confirmedAmountCash']})<br style='mso-data-placement:same-cell;'/>` ;
                                                  if(sign) string += `${item['feeChinese']}(${sign}${item['confirmedAmountSign']})<br style='mso-data-placement:same-cell;'/>` ;
                                              }  
                                          });
                                      }
                                      str = string;
                                      console.log(str)
                                  }
                                  if(exportExcel_item.fn){
                                      str = exportExcel_item.fn(data_item);
                                  }
                                  TD += `<td>${ str }</td>`;
                              });
                              TR += `<tr>${TD}</tr>`;
                          });

                          exportExcelTable.innerHTML += TR;
                          cb('对账单' + $('#account_statement_edit .router-link-exact-active').text());
                      },
                      displayField:[
                          {
                              tr:'订单编号',
                              field1:'towOrderInfo',
                              field2:'orderCode',
                          },
                          {
                              tr:'救援时间',
                              field1:'towOrderInfo',
                              field2:'orderScheduleTime',
                              filter:'date'
                          },
                          {
                              tr:'救援地点',
                              field1:'towOrderInfo',
                              field2:'incidentAddress',
                          },
                          {
                              tr:'目的地点',
                              field1:'towOrderInfo',
                              field2:'destAddress',
                          },
                          {
                              tr:'业务类型',
                              field1:'towOrderInfo',
                              field2:'jobType',
                              filter:'jobType'
                          },
                          {
                              tr:'车牌',
                              field1:'towOrderInfo',
                              field2:'vehicleOwner',
                              filter:'arr',
                              arrField:'vehiclePlateNo'
                          },
                          {
                              tr:'车型',
                              field1:'towOrderInfo',
                              field2:'vehicleOwner',
                              filter:'arr',
                              arrField:'vehicleName'
                          },
                          {
                              tr:'其他费用(去程)',
                              field1:'towOrderInfo',
                              field2:'towJobFeedBacks',
                              filter:'towJobFeedBacks',
                              filter2:'AB',

                          },
                          {
                              tr:'其他费用(返程)',
                              field1:'towOrderInfo',
                              field2:'towJobFeedBacks',
                              filter:'towJobFeedBacks',
                              filter2:'CD',

                          },
                          {
                              tr:'签单总金额',
                              field1:'towOrderInfo',
                              field2:'charge',
                          },
                          {
                              tr:'案件号',
                              field1:'towOrderInfo',
                              field2:'customerCaseNo',
                          },
                          {
                              tr:'车主姓名',
                              field1:'towOrderInfo',
                              field2:'vehicleOwner',
                              filter:'arr',
                              arrField:'carOwnerName'
                          },
                          {
                              tr:'车主电话',
                              field1:'towOrderInfo',
                              field2:'vehicleOwner',
                              filter:'arr',
                              arrField:'carOwnerPhone'
                          },
                          {
                              tr:'施救结果',
                              field1:'towOrderInfo',
                              field2:'orderStatus',
                              filter:'orderStatus'
                          },
                          {
                              tr:'求救时间',
                              field1:'towOrderInfo',
                              field2:'created',
                              filter:'date'
                          },
                          {
                              tr:'派车时间',
                              field1:'towOrderInfo',
                              field2:'towJobInfo',
                              field3:'dispatchTime',
                              filter:'date'
                          },
                        
                          {
                              tr:'完成时间',
                              field1:'towOrderInfo',
                              field2:'completeTime',
                              filter:'date'
                          },
                          {
                              tr:'到达公里数',
                              field1:'towOrderInfo',
                              field2:'towJobResultInfo',
                              field3:'mileageToIncidentSpot',
                          },
                          {
                              tr:'拖车公里数',
                              field1:'towOrderInfo',
                              field2:'towJobResultInfo',
                              field3:'mileageTowing',
                          },
                          {
                              tr:'返回公里数',
                              field1:'towOrderInfo',
                              field2:'towJobResultInfo',
                              field3:'mileageBack',
                          },
                          {
                              tr:'总行驶里程',
                              fn:function(item){
                                  return item.towOrderInfo.towJobResultInfo ? item.towOrderInfo.towJobResultInfo.mileageToIncidentSpot+item.towOrderInfo.towJobResultInfo.mileageTowing+item.towOrderInfo.towJobResultInfo.mileageBack:'';
                              }
                          },
                          {
                              tr:'救援厂',
                              fn:function(item){
                                  return global.ourOrgName;
                              }
                          },
                          {
                              tr:'备注',
                              fn:function(item){
                                  console.log(item);
                                  return item.towOrderInfo.towJobResultInfo && item.towOrderInfo.towJobResultInfo.comment ? item.towOrderInfo.towJobResultInfo.comment :"";
                              }
                          }
                      ]
              },
              }
          },
          mounted(){
              const self = this;

              console.log("thisRoute")
              console.log(this.$route)

              this.isCreate = eval(this.$route.params.isCreate);
              this.isConfirmed = eval(this.$route.params.isConfirmed);       // 是否审核
              this.isCustomer = this.$route.params.isCustomer;
              this.finReconId = this.$route.params.id.split('|')[1];
              this.partnerId = this.$route.params.id.split('|')[0];



              if(self.isCreate){
                 this.refreshDate();
              }
              this.refreshRecuceRecord();

              // 开票登记列表
              send({
                  type:'post',
                  url:'finance:/invoice/register/list',
                  param:{
                      finReconId: self.finReconId,
                      pageSize:100,
                      pageIndex:1
                  }
              },function(err,res){
                  console.log({
                      finReconId: self.finReconId,
                      pageSize:100,
                      pageIndex:1
                  })
                  if(err)return console.log(err);
                  if(res.status == 200 || res.status == 404 ){
                      console.log(res);
                      self.registerList = res.content;
                      console.log("开票登记：",self.registerList);
                  }else{
                      console.log(res)
                  }
              });

              self.receiptUpdata();
             

          },
          methods:{
              open(){
                  this.requestCaseListAll();
              },
              openModal(id){
                if(!this.isConfirmed) return alert('请先审核对账单')
                $(id).modal('show');
              },
              // 对账单详情
              refreshDate(){
                  const self  = this;
                  send({
                      type:'get',
                      url:'finance:/recon/' + self.finReconId
                  },function(err,res){
                      console.log('/recon/' + self.finReconId)
                      if(err)return console.log(err);
                      if(res.status == 200){
                          console.log(res.content[0]);
                          console.log("res.content[0].finReconOrder",res.content[0].finReconOrder)
                          self.informtion = res.content[0];

                          self.isConfirmed = self.informtion.confirmedBy;

                          receivableTotalAmt = self.informtion.receivableTotalAmt;
                          self.caseList = res.content[0].finReconOrder==null?[]:res.content[0].finReconOrder;
                          self.excelDate.data = self.caseList;
                          self.createEditArray();
                          self.sentBy = res.content[0].sentBy;
                          self.acceptBy = res.content[0].acceptBy;
                          self.isDisabled = true;
                          if(self.isCustomer == 1){
                              self.customerType = '客户';
                              self.customerName = self.informtion.partnerInfo && self.informtion.partnerInfo.length? self.informtion.partnerInfo[0].name: '';
                              self.requestCaseListAll(self,self.informtion.partnerInfo[0].partnerId);
                          }else if(self.isCustomer == 2){
                              self.customerType = '服务商';

                              self.customerName =  self.informtion.orgInfo && self.informtion.orgInfo.length ? self.informtion.orgInfo[0].name: '';
                          }else if(self.isCustomer == 3){
                              self.customerType = '委派商';
                              self.customerName =  self.informtion.orgInfo && self.informtion.orgInfo.length ? self.informtion.orgInfo[0].name: '';

                              self.requestCaseListAll(self,self.informtion.orgInfo[0].orgId);
                          }
                          
                          console.log("对账单详情",res)
                      }else{
                          console.log("对账单请求完毕",res);
                      }
                  })
              },
              replacEcaseList(ar){
                  console.log('获取到的数据',ar)
                  this.caseListAll = ar;
              },
              createEditArray(){
                  
                  // for(let i = 0; i<this.caseList.length; i++){
                  //     this.caseList[i].editable = true;
                  // }
      
              },

              //清除选框
              clearCheckbox(){
                  
                  this.$refs.caseRef.clearCase();
              },
              refreshRecuceRecord(amount,re){
                  console.log("刷新")
                  if(typeof amount === "undefined"){
                      amount = 0;
                  }

                  const self = this;
                  //请求减免记录
                  send({
                      type:'get',
                      url:'finance:/recon/'+ this.finReconId +'/relief/list',
                      param:{}
                  },function(err,res){
                      if(err)console.log(err);
                      if(res.status==200){
                          console.log("减免记录",res);
                          self.reduceRecord = res.content;
                          if(re){
                              self.informtion.receivableTotalAmt -= amount;
                              self.informtion.writeOffAmt += amount;
                              self.informtion.notReceivedTotalAmt  -= amount;
                              self.valueAnimation();
                              
                          }
                      } else {
                          console.log("减免记录",res);
                      }
                  });
              },

              valueAnimation(){
                  var $ele = $('.valAnimateBind');
                  $ele.hide().fadeIn(1000);
              },
              //开票登记作废
              toVoid(item,index){
                  const self = this;
                  console.log(item)
                  confirm("你确定要将发票" + item.invoiceBookNo + "作废？" ,function(bool){
                      if(bool){
                          send({
                              type:'put',
                              url:'finance:/invoice/register/scrap/' + item.invoiceRegisterId,
                              param:{

                              }
                          },function(err,res){
                              if(err)return alert('服务器出错，请联系管理员');
                              if(res.status == 200){
                                  console.log(res);
                                  self.registerList[index].abandoned = true;
                                  self.refreshDate();
                                  
                              }else{
                                  console.error(res);
                                  alert(res.msg);
                              }
                          });                      
                      }
                  });
              },
              //post添加案件
              postCase(params){
                  const self = this;
                  console.log("案件请求参数：" , params);
                  send({
                      type:'post',
                      url:'finance:/recon/' + this.finReconId + '/order',
                      param:params
                  },function(err,res){
                      if(err)return console.log(err);
                      if(res.status == 200){
                          console.log("添加案件成功");
                          alert(res.msg,'success');
                          console.log(params)
                          // self.caseList.concat()
                          self.refreshDate();
                          console.log(res);
                          //再次触发请求
                      } else{
                          console.log("添加案件不成功");
                          alert(res.msg)
                          console.log(res)
                      }
                  })
              },
              //请求所有案件
              requestCaseListAll(self,info){
                  console.log("请求所有按键",info)
                  let params = {
                      pageSize : 10000,
                      pageIndex :1,
                     
                  }
                  if(this.customerType=='客户'){
                      params['customerId'] = this.informtion.partnerInfo[0].partnerId;
                    
                  } else if (this.customerType=='委派商'){
                      params['delegateOrgId'] = this.informtion.orgInfo[0].orgId;
                     
                  }

                  console.log("请求案件pd参数：",params)
                  this.$refs.caseRef.requestCaseListChild(params);
                  
              },

              // 收款列表更新
              receiptUpdata(){
                  const self = this;
                   send({
                      type:'post',
                      url:'finance:/receivables/list',
                      param:{
                          pageSize:100,
                          pageIndex:1,
                          finReconciliationId:self.finReconId
                      }
                  },function(err,res){
                      if(err)return console.log(err);
                      if(res.status == 200 || res.status == 404 ){
                          self.receivablesList = res.content ? res.content : [];
                              console.log("收款记录响应",res)
                      }else{
                          console.log("收款记录响应",res);
                          alert(res.msg);
                      }
                  })
              },
              integrationDate(name, item){
                  this.res[name]= item;
                  if(name == 'writeOffAmt'){
                      this.informtion.receivableTotalAmt = parseInt(receivableTotalAmt) - parseInt(this.informtion.discountAmt) - parseInt(item);

                  };
                  if(name == 'writeOffAmt' || name == 'peerReconciliationCode'){
                      this.informtion[name] = item;
                  }
              },
              // 审核，发送给上游、接受等操作
              check(status){
                  console.log({finReconId:this.finReconId,
                          dealType:status,
                          sysPartnerId:this.informtion.sysPartnerId,
                          confirmedBy:this.informtion.confirmedBy,})
                  send({
                      type:'put',
                      url:'finance:/recon/' + this.finReconId + '/deal',
                      param:{
                          finReconId:this.finReconId,
                          dealType:status,
                          sysPartnerId:this.informtion.sysPartnerId,
                          confirmedBy:this.informtion.confirmedBy,
                      }
                  },function(err,res){
                      if(err)return alert('服务器出错，请联系管理员');
                      console.log(res);
                      if(res.status == 200 ){
                          setTimeout('location.reload()', 1000);
                          timeAlert(res.msg);
                      }else{
                          alert(res.msg);
                      }
                     
                  });
              },
              showDetails(){
                  $(event.currentTarget).find('span').toggleClass('down');
                  $(event.currentTarget).next('.details').slideToggle('fast');
              },
              matchJobType(status){
                  return status ? util.matchRescueType(status).cn : '';
              },
              data(content,bool){
                  return util.getLocalTime(content,bool);
              },
              stauts(statu){
                  return util.matchOrderStatus(statu);
              },
              matchPayMethod(status){
                  return util.matchPayMethod(status);
              },
              calculate(ev,index){
                  const self = this;
                  var ev = ev || event;
                  self.caseList[index].discountAmt = ev.target.value;
                  self.informtion.discountAmt = 0;

                  self.caseList.forEach(function(it,index){
                      if(it.discountAmt){
                          self.informtion.discountAmt += parseInt(it.discountAmt);
                      }
                  });

              },
              //修改对账单
              modify(){

                  const self = this;
                  if(this.isModify){

                      send({
                          type:'put',
                          url:'finance:/recon/' + this.finReconId ,
                          param:this.informtion
                      },function(err,res){
                          if(err)return console.log(err);
                          if(res.status == 200){
                              alert(res.msg, 'success');
                              self.isDisabled = true;
                              console.log(res)
                          }else{
                              console.log(res);
                              alert(res.msg);
                          }
                      });
                  }else{
                      self.isDisabled = false;
                      $(window).scrollTop(0);
                  };
                  this.isModify = !this.isModify;
              },
              accountStatementExcelView(){
                  $('#exportExcelPage').modal('show')
              },
              //移除案件
              removeCase(index){
                  const self = this;
                  let requestUrl = 'finance:/recon/' + this.finReconId + '/order/' + this.caseList[index].finReconciliationOrderId
                  console.log("thisUrl:\n" + requestUrl);

                  confirm("确定移除该案件吗？",function(bool){
                      if(bool){
                          send({
                              type:'delete',
                              url:requestUrl,
                          },function(err,res){
                              if(err)return console.log("错误",err);
                              if(res.status == 200){
                                  self.caseList.splice(index,1);
                                  self.refreshDate();
                              } else {
                                  alert(res.msg)
                              }
                             
                              console.log(res);
                          })
                      }
                  },false);

                  
              },
              //提交编辑案件（签单费)
              editCase(index,params){
                  console.log("提交");
                  console.log(index + '\t' + params);
                  const self = this;
                  let thisUrl = 'finance:/recon/' + this.finReconId + '/order/' + this.caseList[index].finReconciliationOrderId;
                  console.log("请求修改案件url",thisUrl)
                  send({
                      type:'put',
                      url:thisUrl,
                      param:{
                              towOrderId:this.caseList[index].towOrderId,
                              commissionTotalAmt:params
                          }
                      },function(err,res){
                          if(err) return console.log(err);
                          if(res.status == 200){
                              console.log("修改成功");
                              self.refreshDate();
                              $('[name=caseIndex' + index + ']').val(params);

                          } else {
                              alert(res.msg);
                          }

                          console.log(res);
                          
                      }
                  )
              },
              //开启编辑案件
              editCommission(event,index,quit){
                  let $beEdit = $('[name=caseIndex' + index + ']');
                  let $isDisabled = $beEdit.attr('disabled');


                  if($isDisabled === 'disabled'){
                      $beEdit.removeAttr('disabled');
                      event.currentTarget.innerHTML = '保存';
                      return;
                  }
                  $beEdit.attr('disabled','disabled');
                  $beEdit.val(this.caseList[index].commissionTotalAmt);
                  event.currentTarget.innerHTML = '编辑';
              },
              saveCommission(event,index,quit){
                  let $beEdit = $('[name=caseIndex' + index + ']');
                  $beEdit.attr('disabled','disabled');
                  this.editCase(index,$beEdit.val());
                  console.log('s')
              },
              // 审核收款单
              checkIncome(id, remark){
                    const _this = this;
                    send({
                        url: 'finance:/receivables/check/' + id,
                        type: 'post',
                        param: {
                            remark: remark
                        }

                    }, function(err, res){
                        alert(res.msg, res.status == 200 ? 'success' : 'error');
                        _this.refreshDate();
                        _this.receiptUpdata();
                    })
              }
          },
          watch:{
              'informtion.discountAmt':{
                  handler(val,oldVal){
                      this.informtion.receivableTotalAmt = receivableTotalAmt - val
                  },
                  deep:true
              }

          }
      }
  </script>

  <style scoped>
  #account_statement_edit{
      margin-top: 22px;
      margin-left: 38px;
      position: relative;
  }
  #account_statement_edit label{
      min-width: 60px;
  }
  #account_statement_edit .details{
  	padding:20px;
  	background: #fff;
  }
  #account_statement_edit .row{
  	margin: 10px 0;
  }
  #account_statement_edit  article{
  	cursor: pointer;
  	margin:20px 0 20px 0;
  }
  #account_statement_edit  article:after{
  	left:104px;
      width: auto;
  }
  table{
      background: #fff
  }
  #account_statement_edit  table{
      width:100%;
  }
  #account_statement_edit  table th{
      border-top:1px solid #eee;
      border-bottom: 1px solid #eee;
      background: #f9f9f9;
      cursor: pointer;
      padding:5px 10px;
      height:24px;
  }
  #account_statement_edit  table th:first-child{
      border-left:1px solid #eee;
  }
  #account_statement_edit  table th:last-child{
      border-right:1px solid #eee;
  }
  #account_statement_edit  table thead tr{
      height:24px;
      /*modifiled 17.6.10*/
      color: #999999;
  }
  #account_statement_edit  table th,
  #account_statement_edit  table td{
      height: 24px;
      width:109px;
  }
  #account_statement_edit  table tbody tr{
      font-size:12px;
  }

  #account_statement_edit  table tbody tr:hover{
      background: #dfe6ec !important;
      font-size:12px;
  }
  #account_statement_edit  table tbody tr:nth-child(2n){
      background: #F6F6F6;
  }


  #account_statement_edit  table tbody tr td .setWidth{
      width: 150px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #account_statement_edit tbody tr td:first-child{
      padding-left:7px;
      border-left:1px solid #eee;
  }
  #account_statement_edit  table tbody tr td:last-child{
      border-right:1px solid #eee;
  }
  #account_statement_edit  table tbody tr td input[type='text']:disabled{
      display:inline-block;
      padding:0px 15px 0px 0px;
      height:24px;
      background-color:transparent;
      width:90px;
  }
  #account_statement_edit  table tbody tr td input[type='text']{
      background-color: #DFF5FD;
  }
  #account_statement_edit .dingwei{
      position: absolute;
      right: 0;
      top: 0;
  }
  #account_statement_edit #btns{
     margin-bottom: 200px;
      margin-top: 60px;
  }
  #account_statement_edit #btns button{
      margin: 0 50px;
  }
  #account_statement_edit .setStyle{
      width: 60px;
      margin-right: 0px;
      background: #DFF5FD;
      border-width: 0;
      color: #333333;
      text-indent: 8px;
      padding: 5px 0;
      height: 24px;
      font-size: 12px;
  }
  #account_statement_edit .setStyle[disabled]{
      background: #f6f6f6
  }

  #account_statement_edit .edit_span,#account_statement_edit .edit_span input{
      cursor: pointer;
  }


  .details > .btn{
      margin-bottom: 15px;
      margin-right: 15px
  }
  .details .btn{
      padding: 3px 8px;
      background: #fff;
      border: 1px solid rgb(23, 134, 247);
      font-size: 12px;
  }
  .details td .btn{
      margin: 2px 0;
      padding: 1px 8px;

  }
  td .btn:nth-child(1){
      margin-right: 5px;
  }
  </style>

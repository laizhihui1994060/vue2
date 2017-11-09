<template>
    <div id='invitedUs' class="modal fade">
        <div class="modal-dialog" >
            <div class="modal-content" v-if='tableShow'>
                <div class="modal-header">
                    <span>邀请我的</span>
                    <button class='close' data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove close"></span>
                    </button>
                </div>
                <div class="modal-body" >
				<vue-table
				    :filter-btns="filterBtns"
				    :filter-input="filterInput"
				    item-url="client:/partnerinvitation/list/invited"
				    type='post'
				    :params='params'
				    :isTime='false'
				    :historySearch='false'
				    :table-iteration-field="tableIterationField"
				    :linkBtn="linkBtn"
				    :addBtns="addBtns" 
				    :isExportExcel='false'
				    :rightBtn="rightBtn" />
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
	import vueTable from "../../../../../common_component/vue-table.vue"
	export default{
		components:{
		    vueTable
		},
	    	data () {
	         return {
	         	tableShow: false,

	             params: {
	                 "pageSize": 5,
	                 "pageIndex": 1,
	             },
	             filterBtns:[
	                 {
	                     title: '状态',
	                     hasAll: true,
	                     arr: [ { name: '未处理', code: 'UNTREATED' }, { name: '取消', code: 'CANCELED' }, { name: '接受', code: 'ACCEPTED' }, { name: '拒绝', code: 'REJECTED' } ],
	                     filter:"name",
	                     filterName:'code',
	                     name:"status"
	                 }
	             ],
	             filterInput:[
	                 {
	                     name:"code",
	                     label:'邀请编码'
	                 }
	             ],
	         
	             tableIterationField:[
	                 {
	                     tr:'公司名称',
	                     field:'orgInfo.name',
	                     filter: 'obj'
	                 },
	                 {
	                     tr:'联系人',
	                     field:'orgInfo.empName',
	                     filter: 'obj'
	                 },
	                 {
	                     tr:'联系电话',
	                     field:'orgInfo.chargePersonPhone',
	                     filter: 'obj',
	                 },
	                 {
	                     tr:'状态',
	                     field:'status',
	                     filter: 'supplierInvitedStatus',
	                 }
	             ],
	             linkBtn:[
	                 {
	                     text:'接受',
	                     model:false,
	                     link_if: [ [ 'status', 'UNTREATED' ]  ],
	                     fn: function(self, key, value, item_index, item) {

	                         confirm('是否接受该邀请？', function(){
	                              var id = item['sysInvitationId'];
	                              var param = {
	                              	sysInvitationId:id, 
	                              	status:"ACCEPTED"
	                              };
	                              send({
	                                  url: "client:/partnerinvitation/operateinvitation",
	                                  param: param,
	                                  type: 'post'
	                             }, function(err,response){
	                             		console.log(response)
	                                  if(response.status == 200){
	                                     self.watchDataForm();
	                                     self.$parent.$parent.addBtns[1].number--;  // 红点
	                                     alert("接受成功", "success");
	                                  }else{
	                                  	alert('接受失败')
	                                  }
	                             });
	                          }, true);
	                     }
	                 },{
	                     text:'拒绝',
	                     model:false,
	                     link_if: [ [ 'status', 'UNTREATED' ]  ],
	                     fn: function(self, key, value, item_index, item) {
	                         confirm('是否拒绝该邀请？', function(){
	                              var id = item['sysInvitationId'];
	                              var param = {
	                              	sysInvitationId:id, 
	                              	status:"REJECTED"
	                              };
	                              send({
	                                  url: "client:/partnerinvitation/operateinvitation",
	                                  param: param,
	                                  type: 'post'
	                             }, function(err,response){
	                             		console.log(response)
	                                  if(response.status == 200){
	                                     self.watchDataForm();
	                                     self.$parent.$parent.addBtns[1].number--;  // 红点
	                                     alert("拒绝成功", "success");
	                                  }else{
	                                  	alert('拒绝失败')
	                                  }
	                             });
	                          }, true);
	                     }
	                 }
	             ]
	         }
	     },
	     mounted(){
	     		const _this = this;
	     		$("#invitedUs").on("shown.bs.modal",function(){
	     			_this.tableShow = true;
	     		});

	     }
	}
</script>

<style scoped>
	#invitedUs .modal-dialog{
		width: 700px;
	}
	#invitedUs .right_content{
		min-height: auto;
	}
	.close{
		opacity:0.5;
	}
	.close:hover{
		opacity:0.6;
	}
</style>
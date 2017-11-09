<template>
    <div class='registration' v-if='show'>
        <vue-table
             
            :filter-btns="filterBtns"
            :filter-input="filterInput"
            :item-url="url"
            type='post'
            :params='params'
            :table-iteration-field="tableIterationField"
            :linkBtn="linkBtn"
            :addBtns="addBtns"
            :isTime='false' 
            :rightBtn="rightBtn"/>
    </div>
   
</template>
<script>
 

import vueTable from "../../../../../common_component/vue-table.vue";


 
    export default {
        
        created(){
            const _this = this;
            if(global.ourOrgId){
                _this.show = true;
                _this.url = 'client:/parkinglot/list?orgId=' + global.ourOrgId;
            }else{
                var time = setInterval(function(){
                    if(global.ourOrgId){
                        clearInterval(time);
                        _this.show = true;
                        _this.url = 'client:/parkinglot/list?orgId=' + global.ourOrgId;
                    }
                }, 500);
            }
        },
        data () {
           return {
                show: false,
                params: {
                    pageIndex:1,
                    pageSize:10
                },
                url: 'client:/parkinglot/list?orgId=' + global.ourOrgId,
                filterBtns:[
                    {
                        title:'状态',
                        name:'isActive',
                        filter:"name",
                        filterName: 'code',
                        hasAll: true,
                        arr: [ { name: '启用中', code: true }, { name: '停用', code: false } ]
                    },
                    // {
                    //     title:'驻车地名',
                    //     name:'source', 
                    //     filter:"client_type",
                    //     url:"/helper/parkinglot"  
                    //     method: 'post'
                    // },            
                ],
                filterInput:[
                    {
                        url: "client:/search",
                        name:"param",
                        label:'驻车地名称',
                        flag: "PARKING_LOT"
                    }
                ],
            
                tableIterationField:[
                    {
                        tr:'驻车地名',
                        field:'name',
                        link: {
                            text:"查看",
                            link_name:'registration_add',   //路由名字
                            link_key:"chosen",
                            link_Field:'parkingLotId',
                            isCreate: false,
                            model:false 
                        }
                    },
                    
                    {
                        tr:'具体地址',
                        field:'address',
                        filter: 'tooltip'
                    },
                   
                    {
                        tr:'经度',
                        field:'lng',
                        filter: 'gps'
                    },
                    {
                        tr:'纬度',
                        field:'lat',
                        filter: 'gps'
                    },
                    {
                        tr:'驻车数量',
                        field:'parkingNum'
                    },
                    {
                        tr:'状态',
                        field:'isActive',
                        filter: 'status'
                    },
                ],
                linkBtn:[
                    {
                        text:'启用',
                        model:false,
                        link_if: [["isActive", false]],
                        link_key:"chosen",
                        link_Field:'parkingLotId',
                        fn: function(vm,key,value,index){
                            
                            const url = 'client:/parkinglot/' + value,
                                  data = {
                                        url: url,
                                        type: 'put',
                                        param: {
                                            isActive: true
                                        }
                                  }
                            send(data, function(err, res){
                                console.log(vm.items[index]);
                                if(res.status == 200){
                                    vm.watchDataForm();
                                }
                            });
                        }
                    },
                    { 
                        text:'停用',
                        model:false,
                        link_if: [["isActive", true]],
                        link_key:"chosen",
                        link_Field:'parkingLotId',
                        fn: function(vm,key,value,index){
                            
                            const url = 'client:/parkinglot/' + value,
                                  data = {
                                        url: url,
                                        type: 'put',
                                        param: {
                                            isActive: false
                                        }
                                  }
                            send(data, function(err, res){
                                console.log(err, res);
                                if(res.status == 200){
                                    vm.watchDataForm();
                                }
                            })
                        }
                    },
                    // {
                    //     text:'删除',
                    //     model:false,
                    //     link_key:"chosen",
                    //     link_Field:'parkingLotId',
                    //     fn: function(vm,key,value,index){
                    //         send({
                    //             url: 'client:/parkinglot/' + value,
                    //             type: 'delete'
                    //         }, function(err, res){
                    //             console.log(code, response);
                    //             if(code == 200){
                    //                 vm.items.splice(index, 1);
                    //             }
                    //         });
                    //     }
                    // }
                ],
                addBtns:[
                     {
                        text:"+添加驻车地",
                        link_name:'registration_add',   //路由名字
                        link_key:"chosen",
                        link_Field:'{}',
                        isCreate: true,
                        model:false
                    },
                    
                ]
            }
        },
        components:{
            vueTable,
        }
    }
</script>

<style>
    .registration table td button{
        width: 120px;
    }
</style>
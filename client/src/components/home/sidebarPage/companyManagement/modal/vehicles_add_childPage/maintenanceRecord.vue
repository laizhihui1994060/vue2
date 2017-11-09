<template>
    <div class="details" id="maintenanceRecord">
        <div class="details-body">
            <div style="height:10px;position: relative;" class="text-center"  v-if="!insurance_purchase_info.length">暂无维修记录</div>
            <div style="height:250px;" v-else>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>维修日期</th>
                                <th>维修用时</th>
                                <th>故障原因</th>
                                <th>维修费用</th>
                                <th>维修状态</th>
                                <th>维修单位</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item,index) in insurance_purchase_info" :key="index">
                                <td v-text="item.registerTime"></td>
                                <td v-text="item.startTime + ' / ' + item.endTime "></td>
                                <td v-text="item.comments"></td>
                                <td v-text="item.amount"></td>
                                <td v-text="item.status"></td>
                                <td v-text="item.maintVendor"></td>
                                
                            </tr> 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

   export default{
        props:['towTruckId'],
        components:{
        },
        data(){
            return {
                insurance_purchase_info:[],
            }
        },
        created(){
            if(this.towTruckId){
                const self = this;

                send({
                    type:'post',
                    url:'client:/maintain/list',
                    param:{
                        'towTruckId':this.towTruckId
                    }
                },function(err,res){
                    if(err)return console.log(err);
                    if(res.status == 200 || res.status == 404 ){
                        alert('获取维修记录成功', 'success');
                        console.log(res);
                        self.insurance_purchase_info = res.content ? res.content : [];
                    }else{
                        alert('获取维修记录失败');
                        console.log(res)
                    };
                });

            }
        },
    }
</script>


<style scoped>

</style>
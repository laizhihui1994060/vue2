<template>
    <div  class="child_page">
        <breadcrumb
            :arr="[{path:'/LoginFinish/systemSettings/rescuedCar',text:'被救车型管理'},{path:'',text:'车型适配规范'}]"/>

        <article>车型适配规范信息</article>
        <div class='details'>
            <div class="details-body">
                
                <div>
                    <btn-select  
                        width="auto" 
                        label="车型名称"
                        padding="0"
                        url="/item" 
                        filter="SVC_NAME" 
                        name="Vehicle"
                        title='车型名称'
                        label-right="12px" />
                </div>
                <div class='adaptation'>
                    <span>适配规范</span>
                    <table>
                        <thead>
                            <tr>
                                <th>类型名称</th>
                                <th>适配车型</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>豪华轿车</td>
                                <td>
                                    地库拖车、全落地平板、拖车吊车困境救援、封闭拖车－5吨、封闭拖车－3吨、平板拖车－5吨、平板拖车－3吨、高速路拖车
                                </td>
                            </tr>
                            <tr>
                                <td>豪华轿车</td>
                                <td>
                                    地库拖车、全落地平板、拖车吊车困境救援、封闭拖车－5吨、封闭拖车－3吨、平板拖车－5吨、平板拖车－3吨、高速路拖车
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="btns details-footer">
                <button type="button" class="btn radius-btn">添加</button>
                <router-link tag='button' :to = "{ path: '/LoginFinish/systemSettings/rescuedCar' }" class="btn radius-btn" active-class=' '>返回</router-link>
            </div>
        </div>
        

  </div>
</template>
<script>
import btnSelect from '../../../../../common_component/btn_select.vue'
import breadcrumb from '../../../../../common_component/breadcrumb.vue'

    export default{
        data () {
            return {
                active:"essential_information"
            }
        },
        
        methods:{
            toggleClass(sclass){
                this.active = sclass
            }
        },
        components:{
            btnSelect,
            breadcrumb
        }
    }
</script>

<style scoped>
    .child_page article:after{
        left: 150px
    }
    table{
        width:100%;
        border-collapse:separate;
        border-spacing:0px 10px;
    }
    table tbody tr td,
    table th{
        border-top:1px solid #eee;
        border-bottom: 1px solid #eee;
        padding:0 15px;
        min-width:100px;
    }
    table tbody tr{
        background-color:#f6f6f6;
    }
    table tbody tr td:first-child,
    table th:first-child{
        border-left:1px solid #eee;
    }
    table tbody tr td:last-child,
    table th:last-child{
        border-right:1px solid #eee;
    }

    .adaptation{
        margin-top:20px;
    }
    .adaptation > span{
        color:#999;
    }
    .adaptation > span:after{
        display:block;
        height:1px;
        content:'';
        width:615px;
        background-color:#f6f6f6;
        position:relative;
        left:60px;
        top:-5px;
    }

</style>
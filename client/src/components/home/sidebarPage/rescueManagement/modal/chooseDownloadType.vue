<template>
    <div id='chooseDownloadType' class="modal fade">
            <div class="modal-dialog"> 
                <div class="modal-content">
                    <div class="modal-header" style="text-align: center">
                        <span  style="font-size:16px">下载照片</span>
                        <button class='close' data-dismiss="modal">
                            <span class="glyphicon glyphicon-remove close"></span>
                        </button>
                    </div>
                    <div class="modal-body" >
                           <div style="text-align:center">
                               <radio
                                   text='按订单编号分类'
                                   :checked='true'
                                   name='type'
                                    @updata="integrationDate"
                                   value='orderCode'
                                    />
                                <radio 
                                   text='案件号'
                                   name='type'
                                    @updata="integrationDate"
                                   value='customerCaseNo'
                                    />
                                <radio 
                                   text='车牌号'
                                   name='type'
                                    @updata="integrationDate"
                                   value='vehiclePlateNo'
                                    />
                           </div>

                    </div>
                    <div class="modal-footer">
                        <div class="btns">
                            <button type="button" class="btn" inputWidth='150px' @click='download' >下载</button>
                            <button  data-dismiss="modal" type="button" class="btn" inputWidth='150px' >取消</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>
    import radio from '../../../../../common_component/radio.vue' 
    export default {
        components:{
            radio
        },
        data () {
            return {
                res:{},
            }
        },
        methods:{
            integrationDate(name,item){
                this.res[name]= item;
                console.log(this.res);
            },
            download(){
                const arr = JSON.parse( $('#chooseDownloadType').attr('arr') ),
                          _this = this;


                let data = {
                    arr: arr,
                    showUrl: encodeURIComponent(config.img_path),
                    type: _this.res.type,    // 细分类型  [orderCode, customerCaseNo, vehiclePlateNo ]
                    pageName: '图片打包'   // 打包zip的名字
                }; 
                
                window.open( config.nodePath + '/download/downloadImages/' + JSON.stringify(data) );
            }
        }
    }
</script>
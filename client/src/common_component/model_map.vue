<template>

<!-- Modal -->
    <div class="modal fade" id="model_map" tabindex="-1" role="dialog" aria-labelledby="orderShare" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close pull-right" data-dismiss="modal">
                        <span aria-hidden="true" class='glyphicon glyphicon-remove close'></span>
                        <span class="sr-only">Close</span>
                    </button>
                    <location-map 
                        height="600"
                        width="1000"
                        input-width="434"
                        :markers="markers"
                        :dom="model_map_id"
                        :isclose="false"
                        :double-click="doubleClick"
                        :map-btn-address='text' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import  locationMap from "./locationMap.vue";
 
    export default {
        props: {
            text: {
                type: String
            },
            doubleClick:{
                type:Boolean,
                default: true
            },
            model_map_id:{
                type: String,
                default: 'modelMap'
            },
        },
        components:{
           locationMap
        },
    }
 

</script>
<style scoped>
    .modal-content,.modal-dialog{
        height: 600px;
        width: 1000px;
    }
    .close{
        opacity: 0.6;
    }
    .close:hover{
        opacity: 1;
    }
    .modal-body{
        padding: 0;
         height: 600px;
        width: 1000px;
    }
    button.close{
        position: absolute;
        z-index: 888888;
        right: 5px;
        opacity: .6
    }
   
</style>
<template>
    <div>
        <Login-finish-nav></Login-finish-nav>
        <!-- <sidebar></sidebar> -->
        <router-view   @delectMsg="delectMsg"></router-view>
        <!-- <vehicle-info-remind /> -->
        <elt-message ref='eltMessage'></elt-message>
        <previewPicture></previewPicture>
    </div>
</template>

<script>
import LoginFinishNav from "./loginFinishNav.vue"
import eltMessage from "./elt-message.vue"
import previewPicture from '../../common_component/preview_picture.vue'
import sidebar from './sidebar.vue'
 
// import vehicleInfoRemind from './vehicleInfoRemind.vue'
  export default {
    components:{
        LoginFinishNav,
        eltMessage,
        previewPicture,
        // vehicleInfoRemind
        // sidebar
    },
    data () {
      return {}
    },
    cerate(){
       
    },
    methods:{
        delectMsg(type){
            this.$refs.eltMessage.delectMsg(type);
        }
    }
  }
</script>

<style scoped>

</style>

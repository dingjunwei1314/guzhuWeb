<template>
  <div>
    
  </div>
</template>
<script>
import AlertDetail from '../Common/AlertDetail.vue'
export default {
  name: 'hello',
  components:{
    AlertDetail
  },
  data () {
    return {
      
    }
  },
  mounted:function(){
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/ceshi');
    setTimeout(function(){
      that.$store.dispatch('loadingAction',false);
    },1000)
  },
  method:{
    
  }
}
</script>
<style scoped>

</style>

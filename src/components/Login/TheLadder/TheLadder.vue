<template>
  <div>
    <!-- <h1>云梯</h1>   -->
  </div>
</template>

<script>

export default {
  name: 'hello',
  components:{
   
  },
  data () {
    return {
      images:['../static/banner1.png','../static/banner2.png','../static/banner3.png']
    }
  },
  mounted:function(){
    document.getElementById('main_content').scrollTop=0;
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/wallet');
    setTimeout(function(){
      that.$store.dispatch('loadingAction',false);
    },1000)
  },
  methods:{
    
  },
  computed:{
    refresh(){
      return this.$store.getters.GetRefresh
    }  
  },
  watch:{
    refresh:function(val){
      if(val){
        var that=this
        setTimeout(function(){
          that.$store.dispatch('refreshAction',false);
          that.$store.dispatch('loadingAction',false);
        },1000)
      }
      
    }
  },
}
</script>
<style scoped>

</style>

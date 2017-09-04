<template>
  <div>
    <!-- <h1>收藏</h1>   -->
  </div>
</template>

<script>

export default {
  name: 'hello',
  components:{
   
  },
  data () {
    return {
     
    }
  },
  mounted:function(){
    var that=this
    this.$store.dispatch('defaultIndexAction','/index/MyCollection');
    setTimeout(function(){
      that.$store.dispatch('loadingAction',false);
    },1000)
    document.getElementById('main_content').scrollTop=0;
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

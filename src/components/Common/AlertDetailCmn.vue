<template>
   <transition
    name="custom-classes-transition" 
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"> 
  <div class="successAlert"  v-show="isshow" :style="{width:AlertWidth+'px',height:AlertHeight+'px',marginLeft:'-'+AlertWidth/2+'px',marginTop:'-'+AlertHeight/2+'px'}">
    <p class="tit">
      {{title}}
      <img @click="close" src="./img/close.png">
    </p>
    
    <slot name="alert_con"></slot>
     
  </div>  
  </transition> 
 
</template>
<script>

export default {
    name:'AlertDetailCmn',
    props:{
      isshow:{
        required:true,
        type:Boolean,
        default:false
      },
      title:{
        required:true,
        type:String,
        default:'标题'
      },
      AlertWidth:{
        required:false,
        type:String,
        default:'546'
      },
      AlertHeight:{
        required:false,
        type:String,
        default:'390'
      }
    },
    data() {
      return{
        
      }
    },
    computed:{
      
    },
    methods: {
      close(){
        this.$emit('close')
      },
      sure(){
        this.$emit('sure')
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .successAlert{position: fixed;z-index: 9999;left: 50%;top: 50%;box-shadow:0 0 4px 2px #ccc;background: white;border-radius: 3px;border-top: 5px solid #fe9039}
  .tit{height: 47px;line-height: 47px;font-size: 20px;color: #333;font-weight: bold;padding: 0px 20px;border-bottom: 1px solid #eee;position: relative;}
  .tit img{position: absolute;right: 20px;top: 17px;cursor: pointer;}
  .content{height: 71%;padding: 20px;overflow-x: hidden;overflow-y: auto;}
  .content p{color: #666;flex: 1;align-items: center;display: flex;padding-left: 15px;}
</style>

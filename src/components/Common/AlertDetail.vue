<template>
   <transition
    name="custom-classes-transition" 
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"> 
  <div class="successAlert"  v-show="isshow" :style="{width:AlertWidth+'px',height:AlertHeight+'px',marginLeft:'-'+AlertWidth/2+'px',marginTop:'-'+AlertHeight/2+'px'}">
    <p class="tit">
      <img @click="close" src="./img/close.png">
    </p>
        
    <div class="content bea_scroll" :style="{height:ConHeight+'px'}">
      <slot name="alert_con"></slot>
    </div>
   
    <div style="text-align:center">
      <p class="enter_btn" @click="sure">{{btntext}}</p>
    </div>    
  </div>  
  </transition> 
 
</template>
<script>

export default {
    name:'AlertDetail',
    props:{
      isshow:{
        required:true,
        type:Boolean,
        default:false
      },
      btntext:{
        required:true,
        type:String,
        default:'按钮'
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
      },
      ConHeight:{
        required:false,
        type:String,
        default:'220'
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
  .successAlert{position: fixed;z-index: 999;left: 50%;top: 50%;box-shadow: 0px 3px 3px #eee;background: white;border-radius: 3px;border-top: 5px solid #fe9039}
  .tit{height: 47px;line-height: 47px;font-size: 20px;color: #333;font-weight: bold;padding: 0px 20px;position: relative;}
  .tit img{position: absolute;right: 20px;top: 17px;cursor: pointer;}
  .content{padding: 20px;overflow-x: hidden;overflow-y: auto;}

  
  .enter_btn{display: inline-block;width: 150px;height: 35px;line-height: 35px;border:1px solid #ff7a59;background: linear-gradient(to right, #ff9a4c , #ff7a59);text-align: center;margin-left: 20px;color: white;font-size: 14px;cursor: pointer;border-radius: 2px;}
</style>

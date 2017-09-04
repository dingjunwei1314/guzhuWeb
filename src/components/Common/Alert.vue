<template>
   <transition
    enter-active-class="animated bounceInDown"
    leave-active-class="animated bounceOutUp"> 
  <div class="successAlert"  v-show="isshow">
    <p class="tit">
      {{title}}
      <img @click="close" src="./img/close.png">
    </p>
    <div class="content">
      <img  v-if="isright" src="./img/success_icon.png">
      <img  v-else src="./img/error_icon.png">
      <p>{{message}}</p>
    </div>
    <div style="text-align:center">
      <p class="btn" @click="sure">{{btntext}}</p>
    </div>
    
  </div>  
  </transition> 
 
</template>
<script>

export default {
    name:'SuccessAlert',
    props:{
      isshow:{
        required:true,
        type:Boolean,
        default:false
      },
      isright:{
        required:true,
        type:Boolean,
        default:true
      },
      title:{
        required:true,
        type:String,
        default:'标题'
      },
      message:{
        required:true,
        type:String,
        default:'内容'
      },
      btntext:{
        required:true,
        type:String,
        default:'按钮'
      },
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
  .successAlert{position: fixed;z-index: 9999;width: 546px;height: 390px;left: 50%;top: 50%;margin-left: -273px;margin-top: -195px;box-shadow: 0px 3px 3px #eee;background: white;border-radius: 3px;border-top: 5px solid #fe9039}
  .tit{height: 47px;line-height: 47px;font-size: 20px;color: #333;font-weight: bold;padding: 0px 20px;border-bottom: 1px solid #eee;position: relative;}
  .tit img{position: absolute;right: 20px;top: 17px;cursor: pointer;}
  .content{width: 340px;margin: 80px auto 0px;display: flex;}
  .content p{font-size: 14px;color: #666;flex: 1;align-items: center;display: flex;padding-left: 15px;}
  .btn{height: 35px;line-height: 35px;padding: 0px 20px;background: #fe9039;color:white;display: inline-block;border-radius: 3px;font-size: 12px;margin: 120px auto 0px;cursor: pointer;}
</style>

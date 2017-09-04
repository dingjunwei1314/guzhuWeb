import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

const Login=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Login/Login'))
  })
}

const Register=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Register/Register'))
  })
}
const HelpCenter=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/HelpCenter/HelpCenter'))
  })
}
const Forgetpassword=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Forgetpassword/Forgetpassword'))
  })
}

const Index=function(resolve){
	require.ensure([],function(){
		resolve(require('../components/Index/Index'))
	})
}

const Home=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Home/Home'))
  })
}

const Business=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Business/Business'))
  })
}

const Work=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Work/Work'))
  })
}

const Wallet=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Wallet/Wallet'))
  })
}

const TheLadder=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/TheLadder/TheLadder'))
  })
}

const MyCollection=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/MyCollection/MyCollection'))
  })
} 

const BootPage=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/BootPage/BootPage'))
  })
}

const Ceshi=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Ceshi/Ceshi'))
  })
}
const checkAccount=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/checkAccount/checkAccount'))
  })
}

const UndertakeProjectDetail=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UndertakeProjectDetail/UndertakeProjectDetail'))
  })
}

const Details=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Details/Details'))
  })
}

const UserCenter=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UserCenter/UserCenter'))
  })
}

const UpGrade=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UpGrade/UpGrade'))
  })
}

const WorkBench=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/WorkBench/WorkBench'))
  })
}

const Message=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/message/message'))
  })
}

const Monitor=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Monitor/Monitor'))
  })
}


Vue.use(Router)

const router=new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/login' },
    {
      path:'/WorkBench',
      component:WorkBench
    },
    {
      path:'/Monitor',
      component:Monitor
    },
    {
      path:'/login',
      component:Login
    },
      {
      path:'/register',
      component:Register
    },
      {
      path:'/forgetpassword',
      component:Forgetpassword
    },
    {
      path:'/bootpage',
      component:BootPage
    },
    {
      path: '/index',redirect: '/index/home',
      component: Index,
      children:[
        {
          path:'/index/home',
          component:Home
        },
  
        {
          path:'/index/business',
          component:Business
        },
        {
          path:'/index/helpcenter',
          component:HelpCenter
        },
        {
          path:'/index/Work',
          component:Work
        },
        {
          path:'/index/checkAccount',
          component:checkAccount
        },
        {
          path:'/index/checkAccount/:id',
          component:checkAccount
        },
        {
          path:'/index/Wallet',
          component:Wallet
        },
        {
          path:'/index/Message',
          component:Message
        },
        {
          path:'/index/TheLadder',
          component:TheLadder
        },
        {
          path:'/index/MyCollection',
          component:MyCollection
        },
        {
          path:'/index/ceshi',
          component:Ceshi

        },
        {
          path:'/index/UndertakeProjectDetail',
          component:UndertakeProjectDetail
        },
        {
          path:'/index/Details',
          component:Details
        },
        {
          path:'/index/UserCenter',
          component:UserCenter
        },
        {
          path:'/index/UpGrade',
          component:UpGrade
        }
        
      ]
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   store.dispatch('loadingAction',true);
//   next()
// })

export default router
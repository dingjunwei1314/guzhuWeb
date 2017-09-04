import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

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

const Work=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Work/Work'))
    })
}

const projectList=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/projectList/projectList'))
    })
}

const projectCenter=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/projectCenter/projectCenter'))
    })
}



const Statistics=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Statistics/Statistics'))
    })
}

const QualityTesting=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/QualityTesting/QualityTesting'))
    })
}

const HasCalled=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/HasCalled/HasCalled'))
    })
}

const NoCall=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/NoCall/NoCall'))
    })
}

const Settlement=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Settlement/Settlement'))
    })
}


const BriefIntroduction=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/BriefIntroduction/BriefIntroduction'))
    })
}


const Wallet=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/Wallet/Wallet'))
    })
}

const PublishProject=function(resolve){
    require.ensure([],function(){
        resolve(require('../components/PublishProject/PublishProject'))
    })
}
export default new Router({
  routes: [
    { path: '/', redirect: '/index/home' },
    {
      path: '/index',
      component: Index,
      children:[
        {
            path:'/index/home',
            component:Home
        },
        {
            path:'/index/projectlist',
            component:projectList
        },
        {
            path:'/index/publishproject',
            component:PublishProject
        },
        {
            path:'/index/projectCenter',
            component:projectCenter,
            children:[ 
                {
                    path:'/index/projectCenter/statistics',
                    component:Statistics
                },
                {
                    path:'/index/projectCenter/qualityTesting',
                    component:QualityTesting
                },
                {
                    path:'/index/projectCenter/hasCalled',
                    component:HasCalled
                },
                {
                    path:'/index/projectCenter/noCall',
                    component:NoCall
                },
                {
                    path:'/index/projectCenter/settlement',
                    component:Settlement
                },
                {
                    path:'/index/projectCenter/briefIntroduction',
                    component:BriefIntroduction
                }

            ]
        },
        {
            path:'/index/wallet',
            component:Wallet
        }
      ]

      
    }
  ]
})

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 这里定义初始值
let state = {
    loading:false,
    refresh:false,
    defaultIndex:'',
    isshowfacerecognition:false,
};

const mutations = {
    changeLoading:function(state,n){
        state.loading=n
    },
    changeRefresh:function(state,n){
        state.refresh=n
    },
    changedefaultIndex:function(state,n){
        state.defaultIndex=n
    },
    changeIsShowFaceRecognition:function(state,n){
        state.isshowfacerecognition=n
    }
};

//事件触发后的逻辑操作
const actions = {
    loadingAction:function({commit},n){
        commit('changeLoading',n)
    },
    refreshAction:function({commit},n){
        commit('changeRefresh',n)
    },
    defaultIndexAction:function({commit},n){
        commit('changedefaultIndex',n)
    },
    isshowfacerecognitionAction:function({commit},n){
        commit('changeIsShowFaceRecognition',n)
    },
};


const getters = {
    GetLoading:function(state){
        return state.loading
    },
    GetRefresh:function(state){
        return state.refresh
    },
    GetDefaultIndex:function(){
        return state.defaultIndex
    },
    isshowfacerecognition:function(){
        return state.isshowfacerecognition
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

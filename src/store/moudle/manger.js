import {reqMangerListPaging,reqMangerList} from '../../util/request'


const state ={
    list:[],
    page:1,
    size:2,
    total:0
}

const mutations={
    changeList(state,arr){
        state.list=arr
    },
    changeCount(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    }
}
const actions={
    requestMangerList(context){
        reqMangerListPaging({size:context.state.size,page:context.state.page}).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    requestuserCount(context){
        reqMangerList().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    changeCurrentPages(context,page){
        context.commit('changePage',page)
        context.dispatch('requestMangerList')
    }
    
}
const getters={
    list(state){
        return state.list
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}